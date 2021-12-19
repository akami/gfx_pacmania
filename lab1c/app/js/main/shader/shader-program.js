// TODO documentation
class ShaderProgram {
    constructor(gl) {
        this._gl = gl;

        this._vertexShaderSource = this.setVertexShaderSource();
        this._fragmentShaderSource = this.setFragmentShaderSource();

        this._program = this.initShaders(this._vertexShaderSource, this._fragmentShaderSource);

        gl.useProgram(this._program);

        this._programInfo = this.setProgramInfo();
    }

    setVertexShaderSource() {
        // implementation in child classes
    }

    setFragmentShaderSource() {
        // implementation in child classes
    }

    /**
     * The setProgramInfo() function sets up the programInfo variable that contains the following information:
     * <ul>
     *     <li> program: the program we use </li>
     *     <li> attribLocations: the locations of the attributes in the shaders </li>
     *     <li> uniformLocations: the locations of the uniforms in the shaders </li>
     * </ul>
     */
    setProgramInfo() {
        return {};
    }

    /**
     * The initShaders() function initializes the two previously defined shaders and links them to the WebGL context. This
     * is done by:
     *
     * <ol>
     *     <li> loading and compiling the shaders ({@link loadShader} function) </li>
     *     <li> creating a shader-sources program </li>
     *     <li> attaching the shaders to the program </li>
     *     <li> linking them together </li>
     * </ol>
     *
     * @param vertexShaderSource: vertex shader-sources GLSL source code
     * @param fragmentShaderSource: fragment shader-sources GLSL source code
     * @returns {null|WebGLProgram}: compiling or linking failed ? null : shaderProgram
     *
     * @see VERTEX_SHADER_SOURCE
     * @see FRAGMENT_SHADER_SOURCE
     */
    initShaders(vertexShaderSource, fragmentShaderSource) {
        let gl = this._gl;

        const vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        const shaderProgram = gl.createProgram();

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Initializing shader-sources program failed: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    /**
     * The loadShader() function creates and compiles a given shader-sources by:
     *
     * <ol>
     *     <li> creating a new shader-sources </li>
     *     <li> sending the shader-sources's source code to the shader-sources </li>
     *     <li> compiling the shader-sources </li>
     * </ol>
     *
     * @param type: shader-sources type (vertex-, fragment-)
     * @param source: GLSL source code
     * @returns {WebGLShader|null} compilation successful ? loaded and compiled shader-sources : delete shader-sources and return null
     */
    loadShader(type, source) {
        let gl = this._gl;

        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('Compilation of shader-sources failed: ' + gl.getShaderInfoLog(shader));

            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}
