class Ground extends Entity {
    static GROUND_COLOR = [0.270, 0.482, 0.615];

    constructor(context, position) {
        super(context, position, {});
    }

    initShapes(shapeSources) {
        return [new Plane(this._context, this._position, {color: Ground.GROUND_COLOR})];
    }
}
