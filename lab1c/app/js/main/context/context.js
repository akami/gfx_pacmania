/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

// context constants
let ASPECT_RATIO;
const BACKGROUND_COLOR = [0.043, 0.074, 0.168, 1.0];

// perspective constants
const FIELD_OF_VIEW = glMatrix.toRadian(45);
const FRUSTRUM_NEAR = 0.1;
const FRUSTRUM_FAR = 100;

// light constants
const POINT_LIGHT_POSITION = [0.0, 25.0, 0.0];

const AMBIENT_LIGHT_COMPONENT = [0.5, 0.5, 0.5];
const MATERIAL_AMBIENT = [1.0, 1.0, 1.0];

const DIFFUSE_LIGHT_COMPONENT = [1.0, 1.0, 1.0];
const MATERIAL_DIFFUSE = [1.0, 1.0, 1.0];

const SPECULAR_LIGHT_COMPONENT = [1.0, 1.0, 1.0];
const SPECULAR_MATERIAL = [1.0, 1.0, 1.0];

// shininess
const SHININESS = 100;

/**
 * The Context class can be seen as a definition of the WebGL context. It also holds all the relevant information that
 * we need for using WebGL. It sets up the canvas, the shader-sources(s), the matrices, the coordinate systems as well as the light.
 */
class Context {
    constructor(canvas) {
        // set up canvas
        this._canvas = canvas;
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
        gl.clearColor(BACKGROUND_COLOR[0], BACKGROUND_COLOR[1], BACKGROUND_COLOR[2], BACKGROUND_COLOR[3]);
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
            FRUSTRUM_NEAR,
            FRUSTRUM_FAR
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
