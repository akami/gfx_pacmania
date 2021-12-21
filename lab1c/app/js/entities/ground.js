class Ground extends Entity {
    constructor(context, position) {
        super(context, position, {});
    }

    initShapes(shapeSources) {
        return [new Plane(this._context, [0, 0, 0], {color: [0, 0, 0]})];
    }
}
