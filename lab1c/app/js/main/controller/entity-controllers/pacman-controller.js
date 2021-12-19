class PacmanController {
    constructor(pacman) {
        this._pacman = pacman;
    }

    move(direction) {
        this.movePacman(direction);
        this.rotateFace(direction);
    }

    animateMouth(isMouthOpen) {
        isMouthOpen ? this.closeMouth() : this.openMouth();
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

        let wasMouthOpen = this._pacman._mouthOpen;

        if(wasMouthOpen) {
            this.animateMouth(this._pacman._mouthOpen)
            this._pacman._mouthOpen = false;
        }

        this.updatePacmanFaceDirection(zRotation, direction);

        if(wasMouthOpen) {
            this.animateMouth(this._pacman._mouthOpen)
            this._pacman._mouthOpen = true;
        }
    }

    updatePacmanFaceDirection(zRotation, faceDirection) {
        const {rotate} = TransformationUtils;

        this._pacman._faceDirection = faceDirection;

        this._pacman._shapes.forEach((shape, i) => {
            rotate(shape._rotationMatrix, 0, 0, zRotation);
        });
    }

    /**
     * Closing the mouth of pacman means rotating the top half of pacman about the x axis by 45 degrees,
     * and the bottom half of pacman by -45 degrees.
     */
    closeMouth() {
        const {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._pacman._shapes[0]._rotationMatrix, xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._pacman._shapes[1]._rotationMatrix, -xRotation, 0, 0);
    }

    /**
     * reverse operation of closing the mouth
     */
    openMouth() {
        const {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._pacman._shapes[0]._rotationMatrix, -xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._pacman._shapes[1]._rotationMatrix, xRotation, 0, 0);
    }
}
