// context constants
let ASPECT_RATIO;
const BACKGROUND_COLOR = [0.043, 0.074, 0.168, 1.0];

// camera constants
const CAMERA_POSITION = [0., 40., 40.];
const CAMERA_FOCUS = [0., 0., 0.];
const CAMERA_UP = [0, 1, 0];

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

// translation constants
const MOVEMENT_SPEED = 0.5;
