class GameController {
    constructor(entities) {
        this._entities = entities;

        this._collisionDetection = new CollisionDetectionUtil();
    }

    moveControllableEntities(direction) {
        let pacman = this._entities.pacman;
        let labyrinth = this._entities.labyrinth;
        let camera = this._entities.camera;

        let collisionDetected = this._collisionDetection.detectCollision(pacman, labyrinth, direction);

        if(!collisionDetected) {
            pacman.move(direction);
            camera.move(direction);
        }
    }
}
