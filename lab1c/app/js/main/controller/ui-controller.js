/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

/**
 * The UI-Controller is responsible for user interaction in the scene. It handles keyboard and mouse events, that
 * trigger transformations on different moving-entities in the scene, depending on the keys (or mouse) pressed.
 */
class UiController {
    static MOVEMENT_KEYS = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

    constructor(gameController) {
        /**
         * Entities that are controlled by user interaction
         * @private
         */
        this._gameController = gameController;
    }

    /**
     * This function is responsible for mapping keyboard events to their corresponding transformation.
     * @param event
     */
    onKeyDown = (event) => {
        const key = event.key;

        if (UiController.MOVEMENT_KEYS.includes(key)) {
            this.onMovementKeyDown(key);
        } else {
            event.defaultPrevented;
        }
    }

    onMovementKeyDown(key) {
        switch (key) {
            case "ArrowRight" :
                this._gameController.changeDirection(Direction.EAST);
                break;
            case "ArrowLeft" :
                this._gameController.changeDirection(Direction.WEST);
                break;
            case "ArrowUp" :
                this._gameController.changeDirection(Direction.NORTH);
                break;
            case "ArrowDown" :
                this._gameController.changeDirection(Direction.SOUTH);
                break;
            default :
                break;
        }
    }
}
