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
    constructor(canvas) {
        // set up canvas
        this._gl = canvas.getContext('webgl');
        this.initCanvas();

        // set up shader program
        this._shaderProgram = new PhongShaderProgram(this._gl);

        // set up matrices
        this._worldMatrix = mat4.create();
        this._viewMatrix = mat4.create();
        this._projectionMatrix = mat4.create();

        // set up light source
        this._pointLightSource = new PointLight();

        // set up coordinate systems
        this.initViewSpace();
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
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        ASPECT_RATIO = gl.canvas.width / gl.canvas.height;

        // clear color and depth
        gl.clearColor(BACKGROUND_COLOR[0], BACKGROUND_COLOR[1], BACKGROUND_COLOR[2], BACKGROUND_COLOR[3]);
        gl.clearDepth(1.0);

        // enable depth testing
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        // clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    /**
     * The setUpViewSpace() function is responsible for setting up the "View Space", this essentially corresponds to the
     * view coordinate system. Using the view matrix, the world (a.k.a the objects in it) is translated to be in front
     * of the camera, to be looked at "from the perspective of the user". To achieve this, we use following constants
     * that are defined in the context-constants.js file:
     *
     * <ul>
     *     <li> CAMERA_POSITION: The location of the camera in the world </li>
     *     <li> CAMERA_FOCUS: Where the camera "points" to </li>
     *     <li> CAMERA_UP: which direction is up (usually positive y) </li>
     * </ul>
     *
     * @see CAMERA_POSITION
     * @see CAMERA_FOCUS
     * @see CAMERA_UP
     */
    initViewSpace() {
        mat4.lookAt(
            this._viewMatrix,
            CAMERA_POSITION,
            CAMERA_FOCUS,
            CAMERA_UP
        );
    }

    /**
     * This function is responsible for setting up the clip space. The clip space can be seen as the canvas. Our created
     * 3D world is projected onto the 2D screen using the projection matrix. In this case, a perspective projection is
     * used. We use following constants that are defined in the context-constants.js file:
     *
     * @see FIELD_OF_VIEW
     * @see ASPECT_RATIO
     * @see FRUSTRUM_NEAR
     * @see FRUSTRUM_FAR
     */
    initClipSpace() {
        mat4.perspective(
            this._projectionMatrix,
            FIELD_OF_VIEW,
            ASPECT_RATIO,
            FRUSTRUM_NEAR,
            FRUSTRUM_FAR
        );
    };
}
