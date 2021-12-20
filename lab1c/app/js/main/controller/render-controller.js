/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

/**
 * The render controller is responsible for actually drawing the scene onto the canvas. This involves the following
 * steps:
 *
 * <ol>
 *     <li> clearing the canvas {@link initCanvas} </li>
 *     <li> tell WebGL which program we are using </li>
 *     <li> set the shader uniforms </li>
 *     <li> get positions (and colors) of constructed-shapes from buffer and pass them to the GLSL shader attributes </li>
 *     <li> draw the constructed-shapes </li>
 * </ol>
 */
class RenderController {
    constructor(context, shapes) {
        this._context = context;
        this._shapes = shapes;
    }

    render() {
        let context = this._context;
        let gl = context._gl;

        // clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // tell webgl which program we want to use
        gl.useProgram(context._shaderProgram._program);

        // set the uniforms
        this.setModelViewProjectionMatricesUniforms();
        this.setLightUniforms();

        // render constructed-shapes
        this._shapes.forEach((shape) => {
            this.renderShape(shape);
        });
    }

    setModelViewProjectionMatricesUniforms() {
        let context = this._context;
        let gl = context._gl;

        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.worldMatrixLocation, false, context._worldMatrix);
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.viewMatrixLocation, false, context._viewMatrix);
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.projectionMatrixLocation, false, context._projectionMatrix);
    }

    setLightUniforms() {
        let context = this._context;
        let gl = context._gl;

        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.pointLightMatrixLocation, false, context._pointLightSource._lightMatrix);

        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.cameraPositionLocation, CAMERA_POSITION);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.pointLightPositionLocation, context._pointLightSource._lightPosition);

        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.ambientLightLocation, context._pointLightSource._ambient);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.diffuseLightLocation, context._pointLightSource._diffuse);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.specularLightLocation, context._pointLightSource._specular);
    }

    renderShape(shape) {
        let context = this._context;
        let gl = context._gl;

        const numComponents = 3; //x, y, z --- r, g, b

        // pull out the position from the position buffer into vertexPosition attribute
        this.setAttribute(numComponents, shape._buffers.position, context._shaderProgram._programInfo.attribLocations.vertexPositionLocation);

        // pull out the colors from the color buffer into the vertexColor attribute
        this.setAttribute(numComponents, shape._buffers.color, context._shaderProgram._programInfo.attribLocations.vertexColorLocation);

        // pull out the normals from the normal buffer into the vertexNormal attribute
        this.setAttribute(numComponents, shape._buffers.normals, context._shaderProgram._programInfo.attribLocations.vertexNormalLocation);

        // apply all transformations to the model matrix
        let modelMatrix = mat4.create();

        mat4.multiply(modelMatrix, shape._rotationMatrix, shape._scalingMatrix);
        mat4.multiply(modelMatrix, shape._translationMatrix, modelMatrix);

        // set matrix uniforms
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.modelMatrixLocation, false, modelMatrix);

        mat3.normalFromMat4(shape._normalMatrix, modelMatrix);
        gl.uniformMatrix3fv(context._shaderProgram._programInfo.uniformLocations.normalMatrixLocation, false, shape._normalMatrix);

        gl.uniform1f(context._shaderProgram._programInfo.uniformLocations.shininessLocation, shape._shininess);

        // draw shape
        gl.drawArrays(gl.TRIANGLES, 0, shape._vertexCount);

    }

    setAttribute(numComponents, buffer, location) {
        if (location === -1) return;

        let gl = this._context._gl;

        const type = gl.FLOAT;   // data in buffer is 32bit floats
        const normalize = false;
        const stride = 0;        // how many bytes to get from one set of values to the next --> 0: use type and numComponents above
        const offset = 0;        // how many bytes inside the buffer to start from

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );

        gl.enableVertexAttribArray(location);
    }
}
