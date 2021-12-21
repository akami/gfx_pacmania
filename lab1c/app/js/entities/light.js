class Light extends Entity {
    static AMBIENT_COMPONENT = [0.1, 0.1, 0.1];
    static AMBIENT_MATERIAL = [1.0, 1.0, 1.0];

    static DIFFUSE_COMPONENT = [1.0, 1.0, 1.0];
    static DIFFUSE_MATERIAL = [1.0, 1.0, 1.0];

    static SPECULAR_COMPONENT = [1.0, 1.0, 1.0];
    static SPECULAR_MATERIAL = [1.0, 1.0, 1.0];

    constructor(position) {
        super(undefined, position, {});

        this._lightMatrix = mat4.create();

        this._ambient = vec3.create();
        vec3.multiply(this._ambient, Light.AMBIENT_COMPONENT, Light.AMBIENT_MATERIAL)

        this._diffuse = vec3.create();
        vec3.multiply(this._diffuse, Light.DIFFUSE_COMPONENT, Light.DIFFUSE_MATERIAL);

        this._specular = vec3.create();
        vec3.multiply(this._specular, Light.SPECULAR_COMPONENT, Light.SPECULAR_MATERIAL);
    }
}
