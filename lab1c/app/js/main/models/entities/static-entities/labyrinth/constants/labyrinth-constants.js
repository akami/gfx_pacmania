const PLANE_NORMAL = [0.0,  1.0,  0.0];
const PLANE_UNIT = 20.;

const WALL_DISTANCE = PLANE_UNIT / 10. * 2; // 2 units to next wall

const HORIZONTAL_INNER_WALLS = [
    {
        startingPoint: [-WALL_DISTANCE * 2, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, WALL_DISTANCE * 3],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [WALL_DISTANCE, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 2

    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, WALL_DISTANCE],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, 0],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, -WALL_DISTANCE],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [-WALL_DISTANCE * 5, 0, -WALL_DISTANCE],
        length: WALL_DISTANCE * 5
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [0,0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [WALL_DISTANCE * 3, 0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, -WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 4
    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, -WALL_DISTANCE * 3],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [-WALL_DISTANCE * 2, 0, -WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [WALL_DISTANCE, 0, -WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 2
    }
];

const VERTICAL_INNER_WALLS = [
    {
        startingPoint: [-WALL_DISTANCE * 2, 0, WALL_DISTANCE * 5],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [-WALL_DISTANCE * 4, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 4
    },
    {
        startingPoint: [WALL_DISTANCE * 3, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [WALL_DISTANCE * 4, 0, WALL_DISTANCE * 4],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [-WALL_DISTANCE, 0, WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [0, 0, WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [WALL_DISTANCE, 0, WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 4
    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, WALL_DISTANCE * 2],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [-WALL_DISTANCE * 2, 0, WALL_DISTANCE * 2],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [WALL_DISTANCE * 2, 0, -WALL_DISTANCE],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [WALL_DISTANCE * 4, 0, -WALL_DISTANCE],
        length: WALL_DISTANCE * 3
    },
    {
        startingPoint: [-WALL_DISTANCE * 4, 0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [-WALL_DISTANCE * 3, 0, -WALL_DISTANCE * 3],
        length: WALL_DISTANCE * 2
    },
    {
        startingPoint: [0, 0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [WALL_DISTANCE * 3, 0, -WALL_DISTANCE * 2],
        length: WALL_DISTANCE
    },
    {
        startingPoint: [-WALL_DISTANCE * 2, 0, -WALL_DISTANCE * 4],
        length: WALL_DISTANCE
    }
];
