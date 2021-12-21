let PHONG_FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    
    uniform vec3 ambientLight, diffuseLight, specularLight;
    uniform float shininess;
    
    varying vec3 normalVector;
    varying vec3 pointToLightVector;
    varying vec3 pointToCameraVector;
    
    varying vec4 fragmentColor;
    
    void main() {
        vec3 ambient = ambientLight * fragmentColor.rgb;
        vec3 diffuse = diffuseLight * fragmentColor.rgb * max(dot(normalVector, pointToLightVector), 0.0);
        
        vec3 reflectionVector = normalize(2.0 * dot(normalVector, pointToLightVector) * normalVector - pointToLightVector);
        
        vec3 specular = specularLight * max(pow(dot(pointToCameraVector, reflectionVector), shininess), 0.0);
        
        if(dot(normalVector, pointToLightVector) < 0.0) {
            specular = vec3(0.0, 0.0, 0.0);
        }
        
        gl_FragColor = vec4(ambient + diffuse + specular, fragmentColor.a);
    }
`;
