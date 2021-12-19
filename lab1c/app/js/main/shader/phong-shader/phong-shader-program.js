// TODO documentation
class PhongShaderProgram extends ShaderProgram {
    setVertexShaderSource() {
        return PHONG_VERTEX_SHADER_SOURCE;
    }

    setFragmentShaderSource() {
        return PHONG_FRAGMENT_SHADER_SOURCE;
    }

    setProgramInfo() {
        let gl = this._gl;

        return {
            attribLocations: {
                vertexPositionLocation: gl.getAttribLocation(this._program, 'vertexPosition'),
                vertexColorLocation: gl.getAttribLocation(this._program, 'vertexColor'),
                vertexNormalLocation: gl.getAttribLocation(this._program, 'vertexNormal'),
            },
            uniformLocations: {
                projectionMatrixLocation: gl.getUniformLocation(this._program, 'projectionMatrix'),
                viewMatrixLocation: gl.getUniformLocation(this._program, 'viewMatrix'),
                worldMatrixLocation: gl.getUniformLocation(this._program, 'worldMatrix'),

                modelMatrixLocation: gl.getUniformLocation(this._program, 'modelMatrix'),
                normalMatrixLocation: gl.getUniformLocation(this._program, 'normalMatrix'),

                pointLightMatrixLocation: gl.getUniformLocation(this._program, 'lightMatrix'),
                pointLightPositionLocation: gl.getUniformLocation(this._program, 'pointLightPosition'),

                cameraPositionLocation: gl.getUniformLocation(this._program, 'cameraPosition'),

                ambientLightLocation: gl.getUniformLocation(this._program, 'ambientLight'),
                diffuseLightLocation: gl.getUniformLocation(this._program, 'diffuseLight'),
                specularLightLocation: gl.getUniformLocation(this._program, "specularLight"),

                shininessLocation: gl.getUniformLocation(this._program, 'shininess')
            }
        }
    }
}
