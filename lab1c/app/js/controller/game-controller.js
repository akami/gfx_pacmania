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
    static TICK_WAIT = 125;

    constructor(renderController, entities) {
        this._renderController = renderController;
        this._entities = entities;

        this._collisionDetection = new CollisionDetectionUtil();
        this._newDirection = undefined;
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

        // check if the user set a new direction
        let keepDirection = true;
        let currentDirection = this._newDirection;

        // check if the new direction would result in a collision
        if (currentDirection !== undefined) {
            keepDirection = this._collisionDetection.detectCollision(pacman, walls, currentDirection) !== undefined;
        }

        // set current direction to old direction, if either the new direction is not defined, or the new direction causes a collision
        if (keepDirection) {
            currentDirection = pacman._direction;
        }

        // detect wall collision and food collision
        let collidedWall = this._collisionDetection.detectCollision(pacman, walls, currentDirection);
        let collidedFood = this._collisionDetection.detectCollision(pacman, food, currentDirection);
        if (collidedWall === undefined) {
            pacman.move(currentDirection);
            camera.move(currentDirection);
        }

        // a collision was detected and the food entity is removed
        if(collidedFood !== undefined) {
            this._entities.food = food.filter(f => f !== collidedFood);
            if(this._entities.food.length === 0 ){
                window.location.reload();
            }
        }

        // reset the new direction "buffer" to empty for the next tick
        this._newDirection = undefined;
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
