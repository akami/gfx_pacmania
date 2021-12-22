/**
 * This class represents the dots for Pacman to eat. They are mere spheres that are loaded as obj files. Food is
 * static and does not implement the move function.
 */
class Food extends Entity {
    static COLOR = [0.972, 1, 0.203];
    static SCALE = 0.05;

    initShapes(shapeSources) {
        return [new WaveFront(this._context, this._position, {
            color: Food.COLOR,
            source: shapeSources['sphere'],
            scale: Food.SCALE
        })];
    }

    initBoundingBox() {
        return {
            minX: this._position[0] - Food.SCALE,
            maxX: this._position[0] + Food.SCALE,
            minZ: this._position[2] - Food.SCALE,
            maxZ: this._position[2] + Food.SCALE
        }
    }
}
