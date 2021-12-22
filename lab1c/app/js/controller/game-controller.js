/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

/**
 * This class is responsible for handling game logic. The game controller works in ticks, meaning that one action is
 * done in a certain time frame.
 */
class GameController {
    static TICK_WAIT = 25;
    static MOVEMENTS_PER_TILE = 10;

    constructor(renderController, entities) {
        this._renderController = renderController;
        this._entities = entities;

        this._collisionDetection = new CollisionDetectionUtil();
        this._newDirection = undefined;

        this._freezeGame = false;
        this._freezeCounter = 0;
    }

    tick() {
        if (!this._freezeGame) {
            this.moveControllableEntities();

            this._entities.ghosts.forEach((ghost, i) => this.moveGhost(ghost));

            this._renderController.render(this._entities.camera, this._entities.light, this.collectShapes());
        } else {
            this._freezeCounter++;
        }

        if (this._freezeCounter === 75) {
            window.location.reload();
        }

        setTimeout(() => this.tick(), GameController.TICK_WAIT);
    }

    /**
     * Sets up direction buffer to make movements and gaming experience more fluid when the direction of Pacman is changed
     * by the user.
     */
    changeDirection(direction) {
        this._newDirection = direction;
    }

    /**
     * Moves all entities that are controlled by a direction change triggered by the user and handles logic upon collision detection.
     */
    moveControllableEntities() {
        let pacman = this._entities.pacman;
        let walls = this._entities.walls;
        let food = this._entities.food;
        let camera = this._entities.camera;

        let currentDirection = pacman._direction;

        // once entity moved one full tile
        if (pacman._movementState === GameController.MOVEMENTS_PER_TILE) {
            // ensure that pacman is on a rounded position
            pacman._position = [Math.round(pacman._position[0]), pacman._position[1], Math.round(pacman._position[2])];
            pacman.initBoundingBox();

            // animate mouth
            pacman.animateMouth();

            // reset movement state
            pacman._movementState = 0;
        }

        // pacman open/closes mouth twice per tile
        if (pacman._movementState === GameController.MOVEMENTS_PER_TILE / 2) {
            pacman.animateMouth();
        }

        // -- handle change of direction input --> if new direction was undefined, there was no user input
        if (this._newDirection !== undefined) {
            // check if change of direction would lead to a collision
            let changeOfDirectionWallCollision = this._collisionDetection.detectCollision(pacman, walls, this._newDirection, Pacman.HALF_SIZE);

            // no collision was detected
            if (changeOfDirectionWallCollision === undefined) {
                // only move if pacman has moved a full tile
                if (pacman._movementState === 0) {
                    // update direction
                    currentDirection = this._newDirection;
                }
            } // else ignore direction change
        }

        // stop moving when collision with wall is detected
        let wallCollision = this._collisionDetection.detectCollision(pacman, walls, currentDirection, Pacman.HALF_SIZE);
        // no collision was detected
        if (wallCollision === undefined) {
            // move entities
            pacman.move(currentDirection);
            camera.move(currentDirection);

            pacman._movementState++;

        } else {
            // if Pacman stops, set the movement state to the beginning
            pacman._movementState = 0;
        }

        // handle food collision
        let collidedFood = this._collisionDetection.detectCollision(pacman, food, currentDirection, Pacman.MOVEMENT_SPEED);
        // a collision was detected and the food entity is removed
        if (collidedFood !== undefined) {
            this._entities.food = food.filter(f => f !== collidedFood);
            if (this._entities.food.length === 0) {
                window.location.reload();
            }
        }
    }

    moveGhost(ghost) {
        let walls = this._entities.walls;
        let pacman = this._entities.pacman;

        // once entity moved one full tile
        if (ghost._movementState === GameController.MOVEMENTS_PER_TILE || ghost._movementState === 0) {
            // ensure that ghost is on a rounded position
            ghost._position = [Math.round(ghost._position[0]), ghost._position[1], Math.round(ghost._position[2])];
            ghost.initBoundingBox();

            // reset movement state
            ghost._movementState = 0;
        }

        let currentDirection = ghost._direction;

        // stop moving when collision with wall is detected
        let wallCollision = this._collisionDetection.detectCollision(ghost, walls, currentDirection, Ghost.SCALE);

        // no collision was detected
        if (wallCollision === undefined) {
            // move entities
            ghost.move(currentDirection);

            ghost._movementState++;
        } else {
            // if ghost stops, set the movement state to the beginning
            ghost._movementState = 0;

            // change direction by 90 degrees until ghost can move again
            let collision = true;

            while (collision) {
                let directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

                currentDirection = directions[Math.floor(Math.random() * directions.length)];

                wallCollision = this._collisionDetection.detectCollision(ghost, walls, currentDirection, Ghost.SCALE);

                if (wallCollision === undefined) {
                    collision = false;

                    ghost.move(currentDirection);
                    ghost._direction = currentDirection;
                }
            }
        }

        // handle pacman collision
        let pacmanCollision = this._collisionDetection.detectCollision(pacman, [ghost], undefined, Ghost.SCALE);
        if (pacmanCollision !== undefined) {
            this._freezeGame = true;
        }
    }

    /**
     * Collects all shapes for the render controller to render
     * @returns {FlatArray<*[], 1>[]}
     */
    collectShapes() {
        let shapes = [];

        shapes.push(this._entities.pacman._shapes);
        shapes.push(this._entities.ground._shapes);

        this._entities.ghosts.forEach((ghost, i) => shapes.push(ghost._shapes));
        this._entities.walls.forEach((wall, i) => shapes.push(wall._shapes));
        this._entities.food.forEach((food, i) => shapes.push(food._shapes));

        return shapes.flat(1);
    }
}
