/**
 * An entity is a collection of constructed-shapes that form one entity (e.g. labyrinth, pacman, ghost)
 */
class Entity {
    constructor(context) {
        this._context = context;
        this._shapes = [];
    }

    move(direction) {
        // implementation in subclasses
    }
}
