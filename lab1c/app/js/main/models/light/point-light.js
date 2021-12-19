class PointLight {
    constructor() {
        this._lightPosition = POINT_LIGHT_POSITION;
        this._lightMatrix = mat4.create();

        this._ambient = vec3.create();
        vec3.multiply(this._ambient, AMBIENT_LIGHT_COMPONENT, MATERIAL_AMBIENT)

        this._diffuse = vec3.create();
        vec3.multiply(this._diffuse, DIFFUSE_LIGHT_COMPONENT, MATERIAL_DIFFUSE);

        this._specular = vec3.create();
        vec3.multiply(this._specular, SPECULAR_LIGHT_COMPONENT, SPECULAR_MATERIAL);
    }
}
