class Pacman extends Entity {
    static COLOR = [1., 0.866, 0.];
    static SCALE = 0.25;

    constructor(context, position, additionalData) {
        super(context, position, additionalData);

        this._direction = Direction.SOUTH;
        this._mouthOpen = false;
    }

    initShapes(shapeSources) {
        let shapes = [];

        shapes.push(new WaveFront(this._context, this._position, {
            color: Pacman.COLOR,
            source: shapeSources['top'],
            scale: Pacman.SCALE
        }));

        shapes.push(new WaveFront(this._context, this._position, {
            color: Pacman.COLOR,
            source: shapeSources['bottom'],
            scale: Pacman.SCALE
        }));

        this.rotateToViewer(shapes[0], shapes[1]);

        return shapes;
    }

    initBoundingBox() {
        return {
          minX: this._position[0] - Pacman.SCALE,
          maxX: this._position[0] + Pacman.SCALE,
          minZ: this._position[2] - Pacman.SCALE,
          maxZ: this._position[2] + Pacman.SCALE
        };
    }

    move(direction) {
        this.moveInternal(direction);
        this.rotate(direction);

        this.animateMouth();
    }

    moveInternal(direction) {
        let {translate} = TransformationUtils;

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

    rotateToViewer(pacmanTop, pacmanBottom) {
        let {rotate} = TransformationUtils;

        let xRotation = 80;

        rotate(pacmanTop._rotationMatrix, xRotation, 0, 0);
        rotate(pacmanBottom._rotationMatrix, xRotation, 0, 0);
    }

    rotate(direction) {
        let zRotation = direction - this._direction;

        let wasMouthOpen = this._mouthOpen;

        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = false;
        }

        this.updateDirection(zRotation, direction);

        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = true;
        }
    }

    updateDirection(zRotation, faceDirection) {
        let {rotate} = TransformationUtils;

        this._direction = faceDirection;

        this._shapes.forEach((shape, i) => {
            rotate(shape._rotationMatrix, 0, 0, zRotation);
        });
    }

    animateMouth() {
        this._mouthOpen ? this.closeMouth() : this.openMouth();
        this._mouthOpen = !this._mouthOpen;
    }

    /**
     * reverse operation of closing the mouth
     */
    openMouth() {
        let {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._shapes[0]._rotationMatrix, -xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._shapes[1]._rotationMatrix, xRotation, 0, 0);
    }

    /**
     * Closing the mouth of pacman means rotating the top half of pacman about the x axis by 45 degrees,
     * and the bottom half of pacman by -45 degrees.
     */
    closeMouth() {
        let {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._shapes[0]._rotationMatrix, xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._shapes[1]._rotationMatrix, -xRotation, 0, 0);
    }
}
