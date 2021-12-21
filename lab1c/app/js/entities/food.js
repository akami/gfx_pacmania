class Food extends Entity {
    static COLOR = [0.972, 1, 0.203];
    static SCALE = 0.1;

    initShapes(shapeSources) {
        return [new WaveFront(this._context, this._position, {
            color: Food.COLOR,
            source: shapeSources['sphere'],
            scale: Food.SCALE
        })];
    }

    initBoundingBox() {
        return {
            minX: this._position[0] - 0.1,
            maxX: this._position[0] + 0.1,
            minZ: this._position[2] - 0.1,
            maxZ: this._position[2] + 0.1
        }
    }
}
