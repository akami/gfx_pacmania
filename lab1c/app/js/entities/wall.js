class Wall extends Entity {
    static COLOR = [0.149, 0.274, 0.325];

    constructor(context, position, additionalData) {
        super(context, position, additionalData);

        this._width = additionalData.width;
        this._length = additionalData.length;

        this.scale();
        this._boundingBox = this.initBoundingBox();
    }

    initShapes(shapeSources) {
        return [new Cube(this._context, this._position, {color: Wall.COLOR})];
    }

    initBoundingBox() {
        return {
            minX: this._position[0] - (this._width / 2),
            maxX: this._position[0] + (this._width / 2),
            minZ: this._position[2] - (this._length / 2),
            maxZ: this._position[2] + (this._length / 2)
        }
    }

    scale() {
        TransformationUtils.scale(this._shapes[0]._scalingMatrix, this._width, TILE_SIZE / 2, this._length);
    }
}
