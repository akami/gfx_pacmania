const PACMAN_COLOR = [1., 0.866, 0.];
const PACMAN_POSITION = [2., 1., 0.];

class Pacman extends Entity {
    constructor(context, pacmanTopSource, pacmanBottomSource) {
        super(context);

        this._pacmanTopSource = pacmanTopSource;
        this._pacmanBottomSource = pacmanBottomSource;

        this._pacmanController = new PacmanController(this);

        this._faceDirection = Direction.SOUTH;
        this._mouthOpen = false;

        this.createPacman();
    }

    createPacman() {
        let pacmanTop = new WavefrontModel(this._context, PACMAN_POSITION, {
            color: PACMAN_COLOR,
            source: this._pacmanTopSource,
            scale: 1
        });

        let pacmanBottom = new WavefrontModel(this._context, PACMAN_POSITION, {
            color: PACMAN_COLOR,
            source: this._pacmanBottomSource,
            scale: 1
        })

        // rotation in obj file is off --> fix to rotate pacman to viewer
        this.rotatePacmanToFaceViewer(pacmanTop, pacmanBottom);

        // store in constructed-shapes array
        this._shapes.push(pacmanTop);
        this._shapes.push(pacmanBottom);
    }

    rotatePacmanToFaceViewer(pacmanTop, pacmanBottom) {
        const {rotate} = TransformationUtils;

        let xRotation = 80;

        rotate(pacmanTop._rotationMatrix, xRotation, 0, 0);
        rotate(pacmanBottom._rotationMatrix, xRotation, 0, 0);
    }

    move(direction) {
        this._pacmanController.move(direction);

        this._pacmanController.animateMouth(this._mouthOpen);
        this._mouthOpen = !this._mouthOpen;
    }
}
