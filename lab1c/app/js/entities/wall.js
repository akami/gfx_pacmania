class Wall extends Entity {
    static COLOR = [1, 1, 1];

    constructor(context, position, additionalData) {
        super(context, position, additionalData);

        this._width = additionalData.width;
        this._length = additionalData.length;

        this.scale();

        // TODO this is kinda hacky, since initBoundingBox is already called in the super constructor
        this._boundingBox = this.initBoundingBox();
    }

    initShapes(shapeSources) {
        return [new Cube(this._context, this._position, {color: Wall.COLOR})];
    }

    initBoundingBox() {
        return {
            minX: this._position[0] - this._width / 2,
            maxX: this._position[0] + this._width / 2,
            minZ: this._position[2] - this._length / 2,
            maxZ: this._position[2] + this._length / 2
        }
    }

    scale() {
        TransformationUtils.scale(this._shapes[0]._scalingMatrix, this._width, MOVEMENT_SPEED / 2, this._length);
    }
}
