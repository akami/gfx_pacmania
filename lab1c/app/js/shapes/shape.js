/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

/**
 * This class represents the top super class in the inheritance tree of shape objects. It is the basis for all moving-entities
 * that are drawn on the scene. The functions in this class that return empty types are designed to be "overwritten" in
 * the subclasses.
 * The additionalData parameter functions as a wild-card parameter and is an object type. This means that it has e.g. the
 * following form:
 * new Shape(context, position, {colors: colors})
 *
 * @see WaveFront
 * new Shape(context, position, {
 *     source: source,
 *     scale: scale
 * })
 */
class Shape {
    static SHININESS = 100;

    constructor(context, position, additionalData) {
        this._position = position;
        this._additionalData = additionalData;

        this._vertices = this.getVertices();
        this._vertexCount = this.getVertexCount();
        this._normals = this.getNormals();

        this._translationMatrix = mat4.create();
        this._rotationMatrix = mat4.create();
        this._scalingMatrix = mat4.create();
        this._normalMatrix = mat3.create();

        // translate shape to position
        mat4.translate(this._translationMatrix, this._translationMatrix, this._position);

        // generate normal from translated shape
        mat3.normalFromMat4(this._normalMatrix, this._translationMatrix);

        this._colors = this.getColors();
        this._buffers = this.getBuffers(context);
        this._shininess = this.getShininess();
    }

    getVertices() {
        return [];
    }

    /**
     * This function returns the total vertex count of the object. This information is used in the render method. The
     * vertex array has to be flattened due to the nature of how constructed-shapes in this project are put together.
     *
     * @see RenderController
     * @see Cube
     *
     * @returns {number}
     */
    getVertexCount() {
        return this._vertices.flat(1).length;
    }

    /**
     * Sets the normals for the shape manually
     * @returns {*[]}
     */
    getNormals() {
        return [];
    }

    /**
     * Sets one color for the whole shape
     * @returns {*[]}
     */
    getColors() {
        let {repeatColor} = ColorUtils;

        let colors = [];

        for (let i = 0; i < this._vertices.length; i++) {
            colors.push(repeatColor(this._additionalData.color, this._vertices[i].length));
        }

        return colors;
    }

    getShininess() {
        if (this._additionalData !== undefined && this._additionalData.shininess !== undefined) {
            return this._additionalData.shininess;
        } else {
            return Shape.SHININESS;
        }
    }

    /**
     * The initBuffers() function creates a buffer which stores the vertex positions of the shape we want to draw.
     * This is done by:
     *
     * <ol>
     *     <li> creating a buffer </li>
     *     <li> binding the buffer to the context </li>
     *     <li> converting the shape's JS array of vertex positions into an array of floats, which is then passed
     *          into the context's bufferData() method in order to establish the vertex positions </li>
     * </ol>
     *
     * The vertex array has to be flattened using depth 2 because of the nature on how constructed-shapes in this project are put
     * together.
     *
     * @see Cube
     *
     * @param context
     * @returns {{color: WebGLBuffer, position: WebGLBuffer}}
     */
    getBuffers(context) {
        let gl = context._gl;

        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices.flat(2)), gl.STATIC_DRAW);

        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colors.flat(3)), gl.STATIC_DRAW);

        let normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._normals.flat(2)), gl.STATIC_DRAW);

        return {
            position: vertexBuffer,
            color: colorBuffer,
            normals: normalBuffer
        };
    }
}


