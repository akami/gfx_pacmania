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

        this._movementState = 0; // Pacman starts in the middle of the tile
    }

    tick() {

        this.moveControllableEntities();
        this._renderController.render(this._entities.camera, this._entities.light, this.collectShapes());

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
        if(this._movementState === GameController.MOVEMENTS_PER_TILE) {
            // ensure that pacman is on a rounded position
            pacman._position = [Math.round(pacman._position[0]), pacman._position[1], Math.round(pacman._position[2])];
            pacman.initBoundingBox();

            // animate mouth
            pacman.animateMouth();

            // reset movement state
            this._movementState = 0;
        }

        // pacman open/closes mouth twice per tile
        if (this._movementState === GameController.MOVEMENTS_PER_TILE / 2) {
            pacman.animateMouth();
        }

        // -- handle change of direction input --> if new direction was undefined, there was no user input
        if (this._newDirection !== undefined) {
            // check if change of direction would lead to a collision
            let changeOfDirectionWallCollision = this._collisionDetection.detectCollision(pacman, walls, this._newDirection, Pacman.HALF_SIZE);

            // no collision was detected
            if(changeOfDirectionWallCollision === undefined) {
                // only move if pacman has moved a full tile
                if(this._movementState === 0) {
                    // update direction
                    currentDirection = this._newDirection;

                }
            } // else ignore direction change
        }

        // stop moving when collision with wall is detected
        let wallCollision = this._collisionDetection.detectCollision(pacman, walls, currentDirection, Pacman.HALF_SIZE);
        let collidedFood = this._collisionDetection.detectCollision(pacman, food, currentDirection, Pacman.MOVEMENT_SPEED);
        // no collision was detected
        if(wallCollision === undefined) {
            // move entities
            pacman.move(currentDirection);
            camera.move(currentDirection);

            this._movementState++;

        } else {
            // if Pacman stops, set the movement state to the beginning
            this._movementState = 0;
        }

        // a collision was detected and the food entity is removed
        if(collidedFood !== undefined) {
            this._entities.food = food.filter(f => f !== collidedFood);
            if(this._entities.food.length === 0 ){
                window.location.reload();
            }
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

        for (let i = 0; i < this._entities.walls.length; i++) {
            shapes.push(this._entities.walls[i]._shapes);
        }

        for (let i = 0; i < this._entities.food.length; i++) {
            shapes.push(this._entities.food[i]._shapes);
        }

        return shapes.flat(1);
    }
}
