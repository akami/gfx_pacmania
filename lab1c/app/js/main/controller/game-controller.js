class GameController {
    static TICK_WAIT = 175;

    constructor(renderController, entities) {
        this._renderController = renderController;
        this._entities = entities;

        this._collisionDetection = new CollisionDetectionUtil();
        this._newDirection = undefined;
    }

    tick() {
        this.moveControllableEntities();

        this._renderController.render();

        setTimeout(() => this.tick(), GameController.TICK_WAIT);
    }

    changeDirection(direction) {
        this._newDirection = direction;
    }

    moveControllableEntities() {
        let pacman = this._entities.pacman;
        let labyrinth = this._entities.labyrinth;
        let camera = this._entities.camera;

        // check if the user set a new direction
        if (this._newDirection !== undefined) {

            // check if the new direction would result in a collision
            let collisionDetected = this._collisionDetection.detectCollision(pacman, labyrinth, this._newDirection);

            if (!collisionDetected) {
                pacman.move(this._newDirection);
                camera.move(this._newDirection);
            }
            else {
                /*
                 * The new direction the user has set results in a collision, so pacman ignores the user input and moves
                 * further in its previous direction. This is to ensure that user input that would result in a collision
                 * does not stop pacman from moving in one tick and hence ensures a fluent game experience.
                 */
                let collisionDetected = this._collisionDetection.detectCollision(pacman, labyrinth, pacman._direction);

                if (!collisionDetected) {
                    pacman.move(pacman._direction);
                    camera.move(pacman._direction);
                }
            }
            /*
             * The user did not set a new direction and pacman is moving further until it hits a wall. Pacman stops upon
             * hitting the obstacle and waits for user input to set a new direction.
             */
        } else {
            let collisionDetected = this._collisionDetection.detectCollision(pacman, labyrinth, pacman._direction);

            if (!collisionDetected) {
                pacman.move(pacman._direction);
                camera.move(pacman._direction);
            }
        }

        // reset the new direction "buffer" to empty for the next tick
        this._newDirection = undefined;
    }
}
