/**
 * An entity is a collection of constructed-shapes that form one entity (e.g. labyrinth, pacman, ghost)
 */
class Entity {
    constructor(context, position, additionalData) {
        this._context = context;

        this._position = position;

        this._shapes = this.initShapes(additionalData.shapeSources);
        this._boundingBox = this.initBoundingBox();
    }

    initShapes(shapeSources) {
        // implementation in subclasses
        return [];
    }

    initBoundingBox() {
        // implementation in subclasses
        return {};
    }

    move(direction) {
        // implementation in subclasses
    }
}
