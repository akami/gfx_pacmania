const CAMERA_POSITION = [ 2., 15., 15.];
const CAMERA_FOCUS = PACMAN_POSITION;
const CAMERA_UP = [0, 1, 0];

class Camera extends Entity{
    constructor(context, position) {
        super(context);
        this._position = position

        this.initViewSpace();
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
            this._context._viewMatrix,
            CAMERA_POSITION,
            CAMERA_FOCUS,
            CAMERA_UP
        );
    }

    move(direction) {
        const {move} = TransformationUtils;

        let xMovement = 0;
        let yMovement = 0;
        let zMovement = 0;

        switch (direction) {
            case Direction.EAST :
                // move in direction of positive x axis (right)
                xMovement += MOVEMENT_SPEED;
                break;
            case Direction.WEST :
                // move in direction of negative x axis (left)
                xMovement -= MOVEMENT_SPEED;
                break;
            case Direction.NORTH :
                // move in direction of negative z axis (forward)
                zMovement -= MOVEMENT_SPEED;
                break;
            case Direction.SOUTH :
                // move in direction of positive z axis (backward)
                zMovement += MOVEMENT_SPEED;
                break;
            default :
                break;
        }

        move(this._context._viewMatrix, -xMovement, -yMovement, -zMovement);
    }
}
