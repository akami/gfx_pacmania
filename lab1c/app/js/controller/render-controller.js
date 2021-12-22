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
 *     <li> get positions (and colors) of cshapes from buffer and pass them to the GLSL shader attributes </li>
 *     <li> draw the shapes </li>
 *     <li> draw the shapes' shadow </li>
 * </ol>
 */
class RenderController {
    constructor(context) {
        this._context = context;
    }

    render(camera, light, shapes) {
        let context = this._context;
        let gl = context._gl;

        // clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // tell webgl which program we want to use
        gl.useProgram(context._shaderProgram._program);

        // set the uniforms
        this.setModelViewProjectionMatricesUniforms();
        this.setLightUniforms(light, camera);

        // render constructed-shapes
        shapes.forEach((shape) => {
            this.renderShape(shape);

            if (shape.throwsShadow()) {
                this.renderShadow(shape, light);
            }
        });
    }

    setModelViewProjectionMatricesUniforms() {
        let context = this._context;
        let gl = context._gl;

        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.worldMatrixLocation, false, context._worldMatrix);
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.viewMatrixLocation, false, context._viewMatrix);
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.projectionMatrixLocation, false, context._projectionMatrix);
    }

    setLightUniforms(light, camera) {
        let context = this._context;
        let gl = context._gl;

        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.pointLightMatrixLocation, false, light._lightMatrix);

        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.cameraPositionLocation, camera._position);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.pointLightPositionLocation, light._position);

        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.ambientLightLocation, light._ambient);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.diffuseLightLocation, light._diffuse);
        gl.uniform3fv(context._shaderProgram._programInfo.uniformLocations.specularLightLocation, light._specular);
    }

    renderShape(shape) {
        let context = this._context;
        let gl = context._gl;

        //x, y, z --- r, g, b
        let numComponents = 3;

        // pull out the position from the position buffer into vertexPosition attribute
        this.setAttribute(numComponents, shape._buffers.position, context._shaderProgram._programInfo.attribLocations.vertexPositionLocation);

        // pull out the colors from the color buffer into the vertexColor attribute
        this.setAttribute(numComponents, shape._buffers.color, context._shaderProgram._programInfo.attribLocations.vertexColorLocation);

        // pull out the normals from the normal buffer into the vertexNormal attribute
        this.setAttribute(numComponents, shape._buffers.normals, context._shaderProgram._programInfo.attribLocations.vertexNormalLocation);

        // pull out the texture coordinates from the texture buffer into the textureCoordinate attribute
        this.setAttribute(2, shape._buffers.texture, context._shaderProgram._programInfo.attribLocations.textureCoordinateLocation);

        // apply all transformations to the model matrix
        let modelMatrix = mat4.create();

        mat4.multiply(modelMatrix, shape._rotationMatrix, shape._scalingMatrix);
        mat4.multiply(modelMatrix, shape._translationMatrix, modelMatrix);

        // set matrix uniforms
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.modelMatrixLocation, false, modelMatrix);

        mat3.normalFromMat4(shape._normalMatrix, modelMatrix);
        gl.uniformMatrix3fv(context._shaderProgram._programInfo.uniformLocations.normalMatrixLocation, false, shape._normalMatrix);

        gl.uniform1f(context._shaderProgram._programInfo.uniformLocations.shininessLocation, shape._shininess);

        // set shadow scalar
        gl.uniform1f(context._shaderProgram._programInfo.uniformLocations.shadowScalarLocation, 1.0);

        // draw shape
        gl.drawArrays(gl.TRIANGLES, 0, shape._vertexCount);
    }

    /**
     * This render call is responsible for drawing the shadow of a shape. To achieve this, in this method additional steps
     * as opposed to the classical shape rendering method are added:
     * A shadow projection matrix is created which is then applied to the model matrix. The shadow scalar is hereby set to 0.0 in order to
     * draw the shadows in black, cancelling out the initial color of the shapes' vertices.
     *
     * @param shape
     * @param light
     */
    renderShadow(shape, light) {
        let context = this._context;
        let gl = context._gl;

        // x, y, z --- r, g, b
        let numComponents = 3;

        // pull out the position from the position buffer into vertexPosition attribute
        this.setAttribute(numComponents, shape._buffers.position, context._shaderProgram._programInfo.attribLocations.vertexPositionLocation);

        // pull out the colors from the color buffer into the vertexColor attribute
        this.setAttribute(numComponents, shape._buffers.color, context._shaderProgram._programInfo.attribLocations.vertexColorLocation);

        // pull out the normals from the normal buffer into the vertexNormal attribute
        this.setAttribute(numComponents, shape._buffers.normals, context._shaderProgram._programInfo.attribLocations.vertexNormalLocation);

        // pull out the texture coordinates from the texture buffer into the textureCoordinate attribute
        this.setAttribute(2, shape._buffers.texture, context._shaderProgram._programInfo.attribLocations.textureCoordinateLocation);

        // apply all transformations to the model matrix
        let modelMatrix = mat4.create();

        mat4.multiply(modelMatrix, shape._rotationMatrix, shape._scalingMatrix);
        mat4.multiply(modelMatrix, shape._translationMatrix, modelMatrix);

        // apply shadow
        let shadowMatrix = mat4.fromValues(
            1, 0, 0, 0,
            -light._position[0] / light._position[1], 0, -light._position[2] / light._position[1], 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );

        mat4.multiply(modelMatrix, shadowMatrix, modelMatrix);

        // set matrix uniforms
        gl.uniformMatrix4fv(context._shaderProgram._programInfo.uniformLocations.modelMatrixLocation, false, modelMatrix);

        // set shadow scalar
        gl.uniform1f(context._shaderProgram._programInfo.uniformLocations.shadowScalarLocation, 0.0);

        // draw shape
        gl.drawArrays(gl.TRIANGLES, 0, shape._vertexCount);
    }

    setAttribute(numComponents, buffer, location) {
        if (location === -1) return;

        let gl = this._context._gl;

        let type = gl.FLOAT;   // data in buffer is 32bit floats
        let normalize = false;
        let stride = 0;        // how many bytes to get from one set of values to the next --> 0: use type and numComponents above
        let offset = 0;        // how many bytes inside the buffer to start from

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
