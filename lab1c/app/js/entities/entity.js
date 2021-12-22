/**
 * An entity is a collection of constructed-shapes that form one entity (e.g. labyrinth, pacman, ghost). In addition to
 * consisting of (multiple) shapes, an entity also has a bounding box which is used for intersection tests in collision
 * detection. Furthermore, behavior, like movement, is defined here.
 */
class Entity {
    static MOVEMENT_SPEED = 0.1;

    constructor(context, position, additionalData) {
        this._context = context;

        this._position = position;

        this._shapes = this.initShapes(additionalData.shapeSources);
        this._boundingBox = this.initBoundingBox();

        this._movementSpeed = Entity.MOVEMENT_SPEED;
    }

    initShapes(shapeSources) {
        // implementation in subclasses
        return [];
    }

    initBoundingBox() {
        // implementation in subclasses
        return {};
    }

    setMovementSpeed(movementSpeed) {
        this._movementSpeed = movementSpeed;
    }

    move(direction) {
        switch(direction) {
            case Direction.NORTH:
                this._position[2] -= this._movementSpeed;
                break;
            case Direction.EAST:
                this._position[0] += this._movementSpeed;
                break;
            case Direction.SOUTH:
                this._position[2] += this._movementSpeed;
                break;
            case Direction.WEST:
                this._position[0] -= this._movementSpeed;
                break;
        }
    }
}
