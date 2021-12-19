class Labyrinth {
    constructor(context, planeColor, wallColor, horizontalInnerWalls, verticalInnerWalls) {
        this._context = context;
        this._planeColor = planeColor;
        this._wallColor = wallColor;

        /*
         * The inner walls field takes a pre-defined set of horizontal and vertical walls. The sets have the starting
         * point (left or bottom corner) and length of the wall defined.
         */
        this._innerWalls = {
            horizontalInnerWalls: horizontalInnerWalls,
            verticalInnerWalls: verticalInnerWalls
        }

        this._shapes = [];

        this.setUpPlane();
        this.setUpOuterWalls();
        this.setUpInnerWalls();
    }

    setUpPlane() {
        // create plane
        let plane = new Plane(this._context, [0, 0, 0], {color: this._planeColor});

        // store in constructed-shapes array
        this._shapes.push(plane);
    }

    setUpOuterWalls() {
        // create walls
        let frontWall = new Wall(this._context, [-PLANE_UNIT, 0, PLANE_UNIT], {color: this._wallColor}); // start at: a
        let rightWall = new Wall(this._context, [PLANE_UNIT, 0, PLANE_UNIT], {color: this._wallColor}); // start at: b
        let backWall = new Wall(this._context, [-PLANE_UNIT, 0, -PLANE_UNIT], {color: this._wallColor}); // start at: d
        let leftWall = new Wall(this._context, [-PLANE_UNIT, 0, PLANE_UNIT], {color: this._wallColor}); // start at a

        // transform walls
        this.setUpHorizontalWall(frontWall, PLANE_UNIT * 2);
        this.setUpHorizontalWall(backWall, PLANE_UNIT * 2);

        this.setUpVerticalWall(rightWall, PLANE_UNIT * 2);
        this.setUpVerticalWall(leftWall, PLANE_UNIT * 2);

        // store in constructed-shapes array
        this._shapes.push(frontWall);
        this._shapes.push(rightWall);
        this._shapes.push(backWall);
        this._shapes.push(leftWall);
    }

    setUpInnerWalls() {
        // loop through pre-defined starting points and length of inner horizontal walls
        this._innerWalls.horizontalInnerWalls.forEach((wall, i) => {
            // create new wall at starting position
            let newWall = new Wall(this._context, wall.startingPoint, {color: this._wallColor});

            // scale to desired length
            this.setUpHorizontalWall(newWall, wall.length);

            // store in constructed-shapes array
            this._shapes.push(newWall);
        });

        // do the same for vertical walls
        this._innerWalls.verticalInnerWalls.forEach((wall, i) => {
            let newWall = new Wall(this._context, wall.startingPoint, {color: this._wallColor});
            this.setUpVerticalWall(newWall, wall.length);
            this._shapes.push(newWall);
        });
    }

    /**
     * To set up a horizontal wall, it is assumed that the wall is initially placed at the left corner.
     * The wall is then scaled in x direction until it has reached the right corner
     */
    setUpHorizontalWall(wall, xScale) {
        const {scale} = TransformationUtils;

        scale(wall._scalingMatrix, xScale, 1, 1);
    }

    /**
     * To set up a vertical wall, the wall is assumed to be initially placed at the bottom corner.
     * The wall is then rotated 90 degrees with respect to the y-axis and then scaled to reach to top corner of the plane.
     */
    setUpVerticalWall(wall, xScale) {
        const {scale, rotate} = TransformationUtils;

        let yRotation = 90;

        scale(wall._scalingMatrix, xScale, 1, 1);
        rotate(wall._rotationMatrix, 0, yRotation, 0);
    }
}
