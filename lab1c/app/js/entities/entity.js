/**
 * An entity is a collection of constructed-shapes that form one entity (e.g. labyrinth, pacman, ghost). In addition to
 * consisting of (multiple) shapes, an entity also has a bounding box which is used for intersection tests in collision
 * detection. Furthermore, behavior, like movement, is defined here.
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
