class LabyrinthUtil {
    static WALLS = [
        {
            position: [-8, 0.25,7],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-7, 0.25,7],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-5, 0.25,8],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-5, 0.25,7],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-4, 0.25,8],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-4, 0.25,7],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-2, 0.25,7],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-1, 0.25,7],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-1, 0.25,5],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [0, 0.25,5],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [1, 0.25,8],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [3, 0.25,8],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [7, 0.25,8],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [2, 0.25,7],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [5, 0.25,6],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [7, 0.25,6],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [5, 0.25,4],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [3, 0.25,4],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [7, 0.25,4],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [8, 0.25,4],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [7, 0.25,3],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [8, 0.25,3],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [1, 0.25,2],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [2, 0.25,1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [6, 0.25,1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [6, 0.25,-1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [9, 0.25,-1],
            width: TILE_SIZE,
            length: 5
        },
        {
            position: [-3, 0.25,4],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-5, 0.25,5],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-5, 0.25,3],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-7, 0.25,3],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-9, 0.25,2],
            width: TILE_SIZE,
            length: 5
        },
        {
            position: [-1, 0.25,2],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-2, 0.25,1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-5, 0.25,0],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-7, 0.25,-1],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-8, 0.25,-3],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-2, 0.25,-1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-1, 0.25,2],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-1, 0.25,-2],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [2, 0.25,-1],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [1, 0.25,-2],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [5, 0.25,-3],
            width: 5,
            length: TILE_SIZE
        },
        {
            position: [4, 0.25,-4],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [7, 0.25,-5],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [5, 0.25,-6],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-5, 0.25,-3],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [-5, 0.25,-4],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-2, 0.25,-4],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [0, 0.25,-5],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [0, 0.25,-7],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [-3 , 0.25,-6],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-7, 0.25,-6],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-7, 0.25,-8],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [-3, 0.25,-8],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [2, 0.25,-6],
            width: TILE_SIZE,
            length: 3
        },
        {
            position: [1, 0.25,-9],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [4, 0.25,-8],
            width: TILE_SIZE,
            length: TILE_SIZE
        },
        {
            position: [7, 0.25,-8],
            width: 3,
            length: TILE_SIZE
        },
        {
            position: [8, 0.25,-7],
            width: TILE_SIZE,
            length: TILE_SIZE
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
