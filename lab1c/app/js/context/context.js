/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

/**
 * The Context class can be seen as a definition of the WebGL context. It also holds all the relevant information that
 * we need for using WebGL. It sets up the canvas, the shader-sources(s), the matrices, the coordinate systems as well as the light.
 */
class Context {
    static BACKGROUND_COLOR = [0.043, 0.074, 0.168, 1.0];
    static FRUSTRUM_NEAR = 0.1;
    static FRUSTRUM_FAR = 100;

    constructor(canvas) {
        this._gl = canvas.getContext('webgl');
        this.initCanvas();

        // set up shader program
        this._shaderProgram = new PhongShaderProgram(this._gl);

        // set up matrices
        this._worldMatrix = mat4.create();
        this._viewMatrix = mat4.create();
        this._projectionMatrix = mat4.create();

        // set up coordinate systems
        this.initClipSpace();
    }

    /**
     * The initCanvas() function initializes the canvas the scene is rendered on.
     * This involves the following steps:
     *
     * <ol>
     *     <li> clearing the color (setting it to background color) </li>
     *     <li> clear everything in depth </li>
     *     <li> enabling depth testing </li>
     *     <li> setting how depth is handled (e.g. LEQUAL --> near things obscure far things) </li>
     *     <li> clear the canvas </li>
     * </ol>
     */
    initCanvas() {
        let gl = this._gl;

        // set dimensions of canvas/viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // clear color and depth
        gl.clearColor(Context.BACKGROUND_COLOR[0], Context.BACKGROUND_COLOR[1], Context.BACKGROUND_COLOR[2], Context.BACKGROUND_COLOR[3]);
        gl.clearDepth(1.0);

        // enable depth testing
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        // clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    initClipSpace() {
        mat4.ortho(
            this._projectionMatrix,
            -10.0, 20.0,
            -10.0, 10.0,
            Context.FRUSTRUM_NEAR,
            Context.FRUSTRUM_FAR
        );

        let angle = 10;
        let shear1 = glMatrix.toRadian(angle);

        let shearMatrix = [
            1, 0, 0, 0,
            shear1, 1, 0, 0,
            -shear1, 0, 1, 0,
            0, 0, 0, 1
        ];

        mat4.multiply(this._projectionMatrix, this._projectionMatrix, shearMatrix);
    }
}
