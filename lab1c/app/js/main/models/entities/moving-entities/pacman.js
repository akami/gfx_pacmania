const PACMAN_COLOR = [1., 0.866, 0.];
const PACMAN_POSITION = [2., 0.5, 0.5];
const PACMAN_SIZE = 0.45;

// translation constants
const MOVEMENT_SPEED = 1.0;

class Pacman extends Entity {
    constructor(context, pacmanTopSource, pacmanBottomSource) {
        super(context);

        this._pacmanTopSource = pacmanTopSource;
        this._pacmanBottomSource = pacmanBottomSource;

        this._faceDirection = Direction.SOUTH;
        this._mouthOpen = false;

        this.createPacman();
    }

    createPacman() {
        let pacmanTop = new WavefrontModel(this._context, PACMAN_POSITION, {
            color: PACMAN_COLOR,
            source: this._pacmanTopSource,
            scale: PACMAN_SIZE
        });

        let pacmanBottom = new WavefrontModel(this._context, PACMAN_POSITION, {
            color: PACMAN_COLOR,
            source: this._pacmanBottomSource,
            scale: PACMAN_SIZE
        })

        // rotation in obj file is off --> fix to rotate pacman to viewer
        this.rotatePacmanToFaceViewer(pacmanTop, pacmanBottom);

        // store in constructed-shapes array
        this._shapes.push(pacmanTop);
        this._shapes.push(pacmanBottom);
    }

    rotatePacmanToFaceViewer(pacmanTop, pacmanBottom) {
        const {rotate} = TransformationUtils;

        let xRotation = 80;

        rotate(pacmanTop._rotationMatrix, xRotation, 0, 0);
        rotate(pacmanBottom._rotationMatrix, xRotation, 0, 0);
    }

    initBoundingBox() {
        return {
          minX: PACMAN_POSITION[0] - PACMAN_SIZE,
          maxX: PACMAN_POSITION[0] + PACMAN_SIZE,
          minZ: PACMAN_POSITION[2] - PACMAN_SIZE,
          maxZ: PACMAN_POSITION[2] + PACMAN_SIZE
        };
    }

    move(direction) {
        this.movePacman(direction);
        this.rotateFace(direction);

        this.animateMouth(this._mouthOpen);
        this._mouthOpen = !this._mouthOpen;
    }

    animateMouth(isMouthOpen) {
        isMouthOpen ? this.closeMouth() : this.openMouth();
    }


    movePacman(direction) {
        const {translate} = TransformationUtils;

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

        this._shapes.forEach((shape, i) => {
            translate(shape._translationMatrix, xMovement, yMovement, zMovement);
        });

        this._boundingBox.minX += xMovement;
        this._boundingBox.maxX += xMovement;
        this._boundingBox.minZ += zMovement;
        this._boundingBox.maxZ += zMovement;
    }

    rotateFace(direction) {
        let zRotation = direction - this._faceDirection;

        let wasMouthOpen = this._mouthOpen;

        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = false;
        }

        this.updatePacmanFaceDirection(zRotation, direction);

        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = true;
        }
    }

    updatePacmanFaceDirection(zRotation, faceDirection) {
        const {rotate} = TransformationUtils;

        this._faceDirection = faceDirection;

        this._shapes.forEach((shape, i) => {
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
        rotate(this._shapes[0]._rotationMatrix, xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._shapes[1]._rotationMatrix, -xRotation, 0, 0);
    }

    /**
     * reverse operation of closing the mouth
     */
    openMouth() {
        const {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._shapes[0]._rotationMatrix, -xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._shapes[1]._rotationMatrix, xRotation, 0, 0);
    }
}
