class LabyrinthUtil {
    static WALLS = [
        {
            position: [-8, 0, 7],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-7, 0, 7],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-5, 0, 8],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-5, 0, 7],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-4, 0, 8],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-4, 0, 7],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-2, 0, 7],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-1, 0, 7],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-1, 0, 5],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [0, 0, 5],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [1, 0, 8],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [3, 0, 8],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [7, 0, 8],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [2, 0, 7],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [5, 0, 6],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [7, 0, 6],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [5, 0, 4],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [3, 0, 4],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [7, 0, 4],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [8, 0, 4],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [7, 0, 3],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [8, 0, 3],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [1, 0, 2],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [2, 0, 1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [6, 0, 1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [6, 0, -1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [9, 0, -1],
            width: MOVEMENT_SPEED,
            length: 5
        },
        {
            position: [-3, 0, 4],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-5, 0, 5],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-5, 0, 3],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-7, 0, 3],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-9, 0, 2],
            width: MOVEMENT_SPEED,
            length: 5
        },
        {
            position: [-1, 0, 2],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-2, 0, 1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-5, 0, 0],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-7, 0, -1],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-8, 0, -3],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-2, 0, -1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-1, 0, 2],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-1, 0, -2],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [2, 0, -1],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [1, 0, -2],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [5, 0, -3],
            width: 5,
            length: MOVEMENT_SPEED
        },
        {
            position: [4, 0, -4],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [7, 0, -5],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [5, 0, -6],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-5, 0, -3],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [-5, 0, -4],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-2, 0, -4],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [0, 0, -5],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [0, 0, -7],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [-3 , 0, -6],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-7, 0, -6],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-7, 0, -8],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [-3, 0, -8],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [2, 0, -6],
            width: MOVEMENT_SPEED,
            length: 3
        },
        {
            position: [1, 0, -9],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [4, 0, -8],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        },
        {
            position: [7, 0, -8],
            width: 3,
            length: MOVEMENT_SPEED
        },
        {
            position: [8, 0, -7],
            width: MOVEMENT_SPEED,
            length: MOVEMENT_SPEED
        }
    ];

    static setUpWalls(context) {
        let walls = [];

        LabyrinthUtil.WALLS.forEach((wall, i) => {
            let newWall = new Wall(context, wall.position, {width: wall.width, length: wall.length});
            walls.push(newWall);
        });

        return walls;
    }
}
