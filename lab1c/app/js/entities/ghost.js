class Ghost extends Entity {
    static SCALE = 0.25;
    static COLOR = [0.968, 0.145, 0.521];

    constructor(context, position, additionalData) {
        super(context, position, additionalData);

        this._direction = additionalData.startDirection;

        this._movementState = 0; // Ghost starts in the middle of the tile
    }

    initShapes(shapeSources) {
        let shapes = [];

        shapes.push(new WaveFront(this._context, this._position, {
            color: Ghost.COLOR,
            source: shapeSources['ghost'],
            scale: Ghost.SCALE
        }));

        TransformationUtils.rotate(shapes[0]._rotationMatrix, 0, 180, 0);

        return shapes;
    }

    initBoundingBox() {
        return {
            minX: this._position[0] - Ghost.SCALE - 0.1,
            maxX: this._position[0] + Ghost.SCALE + 0.1,
            minZ: this._position[2] - Ghost.SCALE - 0.1,
            maxZ: this._position[2] + Ghost.SCALE + 0.1
        }
    }

    move(direction) {
        super.move(direction);

        this.moveInternal(direction);
        if (this._movementState === 0) {
            this.rotate(direction);
        }

        this._boundingBox = this.initBoundingBox();
    }

    moveInternal(direction) {
        let {translate} = TransformationUtils;

        let xMovement = 0;
        let yMovement = 0;
        let zMovement = 0;

        switch (direction) {
            case Direction.EAST :
                // move in direction of positive x axis (right)
                xMovement += this._movementSpeed;
                break;
            case Direction.WEST :
                // move in direction of negative x axis (left)
                xMovement -= this._movementSpeed;
                break;
            case Direction.NORTH :
                // move in direction of negative z axis (forward)
                zMovement -= this._movementSpeed;
                break;
            case Direction.SOUTH :
                // move in direction of positive z axis (backward)
                zMovement += this._movementSpeed;
                break;
            default :
                break;
        }

        this._shapes.forEach((shape, i) => {
            translate(shape._translationMatrix, xMovement, yMovement, zMovement);
        });
    }

    rotate(direction) {
        let yRotation = direction - this._direction;

        this.updateDirection(yRotation, direction);
    }

    updateDirection(yRotation, faceDirection) {
        let {rotate} = TransformationUtils;

        this._direction = faceDirection;

        this._shapes.forEach((shape, i) => {
            rotate(shape._rotationMatrix, 0, yRotation, 0);
        });
    }
}
