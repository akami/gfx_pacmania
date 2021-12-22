/**
 * This class represents the entity the player interacts with. Pacman consists of two half-sphere shapes that are animated
 * continuously during the game.
 */
class Pacman extends Entity {
    static COLOR = [1., 0.866, 0.];
    static HALF_SIZE = 0.25;

    constructor(context, position, additionalData) {
        super(context, position, additionalData);

        this._direction = Direction.SOUTH;
        this._mouthOpen = false;

        this._movementState = 0; // Pacman starts in the middle of the tile
    }

    initShapes(shapeSources) {
        let shapes = [];

        shapes.push(new WaveFront(this._context, this._position, {
            color: Pacman.COLOR,
            source: shapeSources['top'],
            scale: Pacman.HALF_SIZE
        }));

        shapes.push(new WaveFront(this._context, this._position, {
            color: Pacman.COLOR,
            source: shapeSources['bottom'],
            scale: Pacman.HALF_SIZE
        }));

        // fix for obj file orientation
        this.rotateToViewer(shapes[0], shapes[1]);

        return shapes;
    }

    initBoundingBox() {
        return {
          minX: this._position[0] - Pacman.HALF_SIZE,
          maxX: this._position[0] + Pacman.HALF_SIZE,
          minZ: this._position[2] - Pacman.HALF_SIZE,
          maxZ: this._position[2] + Pacman.HALF_SIZE
        };
    }

    /**
     * Moving Pacman involves the following steps:
     * <ol>
     *     <li> moving in a direction </li>
     *     <li> rotating in a direction </li>
     *     <li> open/close mouth </li>
     * </ol>
     * @param direction
     */
    move(direction) {
        super.move(direction);

        this.moveInternal(direction);
        this.rotate(direction);
        this._boundingBox = this.initBoundingBox();
    }

    moveInternal(direction) {
        let {translate} = TransformationUtils;

        let xMovement = 0;
        let yMovement = 0;
        let zMovement = 0;

        switch (direction) {
            case Direction.EAST :
                // move in direction of positive x axis (right)
                xMovement += this._movementSpeed;
                break;
            case Direction.WEST :
                // move in direction of negative x axis (left)
                xMovement -= this._movementSpeed;
                break;
            case Direction.NORTH :
                // move in direction of negative z axis (forward)
                zMovement -= this._movementSpeed;
                break;
            case Direction.SOUTH :
                // move in direction of positive z axis (backward)
                zMovement += this._movementSpeed;
                break;
            default :
                break;
        }

        this._shapes.forEach((shape, i) => {
            translate(shape._translationMatrix, xMovement, yMovement, zMovement);
        });
    }

    /**
     * In this special case, in the created obj file, Pacman was facing up. So in order to make him face the viewer on
     * game start, Pacman has to be rotated via the x-axis first.
     *
     * @param pacmanTop
     * @param pacmanBottom
     */
    rotateToViewer(pacmanTop, pacmanBottom) {
        let {rotate} = TransformationUtils;

        let xRotation = 80;

        rotate(pacmanTop._rotationMatrix, xRotation, 0, 0);
        rotate(pacmanBottom._rotationMatrix, xRotation, 0, 0);
    }

    /**
     * Once a rotation is triggered by the user, the degrees of which Pacman has to rotate depend on the current direction
     * Pacman is facing. In order to rotate correctly, Pacman's mouth has to be shut first.
     * @param direction
     */
    rotate(direction) {
        // rotate around z axis depending on previous direction
        let zRotation = direction - this._direction;

        let wasMouthOpen = this._mouthOpen;

        // close Pacman's mouth before rotation
        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = false;
        }

        this.updateDirection(zRotation, direction);

        // if mouth was open before, open it again after rotation to ensure a fluid animation
        if(wasMouthOpen) {
            this.animateMouth(this._mouthOpen)
            this._mouthOpen = true;
        }
    }

    /**
     * This method updates the current direction the Pacman is moving into and rotates the shapes accordingly, such that
     * Pacman always faces the direction it is headed.
     *
     * @param zRotation
     * @param faceDirection
     */
    updateDirection(zRotation, faceDirection) {
        let {rotate} = TransformationUtils;

        this._direction = faceDirection;

        this._shapes.forEach((shape, i) => {
            rotate(shape._rotationMatrix, 0, 0, zRotation);
        });
    }

    /**
     * Checks whether the current state of Pacman's mouth is open or closed and calls the corresponding opposite method
     * to trigger the animation.
     */
    animateMouth() {
        this._mouthOpen ? this.closeMouth() : this.openMouth();
        this._mouthOpen = !this._mouthOpen;
    }

    /**
     * reverse operation of closing the mouth
     */
    openMouth() {
        let {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._shapes[0]._rotationMatrix, -xRotation, 0, 0);

        // rotate bottom half of pacman
        rotate(this._shapes[1]._rotationMatrix, xRotation, 0, 0);
    }

    /**
     * Closing the mouth of pacman means rotating the top half of pacman about the x axis by 45 degrees,
     * and the bottom half of pacman by -45 degrees.
     */
    closeMouth() {
        let {rotate} = TransformationUtils;

        let xRotation = 45;

        // rotate top half of pacman
        rotate(this._shapes[0]._rotationMatrix, xRotation, 0, 0);

        // rotate bottom half of pacman
       rotate(this._shapes[1]._rotationMatrix, -xRotation, 0, 0);
    }
}
