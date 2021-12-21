/**
 * This class represents the ground plane the labyrinth is placed on. It is static and does not have any bounding boxes
 * and hence does not implement these functionalities.
 */
class Ground extends Entity {
    static GROUND_COLOR = [0.270, 0.482, 0.615];

    constructor(context, position) {
        super(context, position, {});
    }

    initShapes(shapeSources) {
        return [new Plane(this._context, this._position, {color: Ground.GROUND_COLOR})];
    }
}
