class PacmanController {
    constructor(pacman) {
        this._pacman = pacman;
    }

    move(direction) {
        this.movePacman(direction);
        this.rotateFace(direction);
    }

    movePacman(direction) {
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

        this._pacman._shapes.forEach((shape, i) => {
            move(shape._translationMatrix, xMovement, yMovement, zMovement);
        });
    }

    rotateFace(direction) {
        let zRotation = direction - this._pacman._faceDirection;

        this.updatePacmanFaceDirection(zRotation, direction);
    }

    updatePacmanFaceDirection(zRotation, faceDirection) {
        const {rotate} = TransformationUtils;

        this._pacman._faceDirection = faceDirection;

        this._pacman._shapes.forEach((shape, i) => {
            rotate(shape._rotationMatrix, 0, 0, zRotation);
        });
    }
}
