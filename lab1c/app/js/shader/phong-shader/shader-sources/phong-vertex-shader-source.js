let PHONG_VERTEX_SHADER_SOURCE = `
    precision mediump float;
    
    attribute vec3 vertexPosition;
    attribute vec3 vertexColor;
    attribute vec3 vertexNormal;
    
    attribute vec2 textureCoordinate;
    
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 worldMatrix;
    uniform mat4 modelMatrix;
    uniform mat3 normalMatrix;
    uniform mat4 lightMatrix;
    
    uniform vec3 cameraPosition;
    uniform vec3 pointLightPosition;
    
    varying vec3 normalVector;
    varying vec3 pointToLightVector;
    varying vec3 pointToCameraVector;
    
    varying vec4 fragmentColor;
    
    varying vec2 v_textureCoordinate;
    
    void main() {
        vec3 modelWorldPosition = (worldMatrix * modelMatrix * vec4(vertexPosition, 1.0)).xyz;
                
        gl_Position = projectionMatrix * viewMatrix * vec4(modelWorldPosition, 1.0);
        normalVector = normalize(normalMatrix * vertexNormal).xyz;
        
        vec3 lightWorldPosition = (worldMatrix * lightMatrix * vec4(pointLightPosition, 1.0)).xyz;
        vec3 cameraWorldPosition = (worldMatrix * vec4(cameraPosition, 1.0)).xyz;
        
        pointToLightVector = normalize(lightWorldPosition - modelWorldPosition).xyz;
        pointToCameraVector = normalize(cameraWorldPosition - modelWorldPosition);

        fragmentColor = vec4(vertexColor, 1.0);
        v_textureCoordinate = textureCoordinate;
    } 
`;
