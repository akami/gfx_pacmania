/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */


/**
 * The start function fetches all assets needed for the program like .obj files first, before
 * passing the sources to the main function
 */
function start() {
    // fetch sources
    let pacmanTop = fetch("/assets/wavefronts/pacman-top-no-color.obj")
        .then(response => response.text());

    let pacmanBottom = fetch("/assets/wavefronts/pacman-bottom-no-color.obj")
        .then(response => response.text());

    let sphere = fetch("/assets/wavefronts/sphere.obj")
        .then(response => response.text());

    let ghost = fetch("/assets/wavefronts/female-ghost.obj")
        .then(response => response.text());

    // pass to main
    Promise.all([pacmanTop, pacmanBottom, sphere, ghost]).then((sources) => main(sources));
}

function main(sources) {
    // initialize WebGL context
    let context = new Context(document.getElementById("lab1c-canvas"));

    // setup entities
    let pacman = new Pacman(context, [0, 0.5, 0], {shapeSources: {top: sources[0], bottom: sources[1]}});
    let camera = new Camera(context, [0., 10., 10.], pacman._position);
    let ground = new Ground(context, [0, -0.0001, 0]);
    let ghost1 = new Ghost(context, [1.0, 0.5, 0.0], {
        shapeSources: {ghost: sources[3]},
        startDirection: Direction.EAST
    });
    let ghost2 = new Ghost(context, [-1.0, 0.5, 0.0], {
        shapeSources: {ghost: sources[3]},
        startDirection: Direction.WEST
    });

    // setup lights
    let light = new Light([5.0, 10.0, 5.0]);

    // setup walls
    let frontWall = new Wall(context, [0, 0.5, Plane.PLANE_UNIT], {width: Plane.PLANE_SIZE, length: TILE_SIZE});
    let backWall = new Wall(context, [0, 0.5, -Plane.PLANE_UNIT], {width: Plane.PLANE_SIZE, length: TILE_SIZE});
    let rightWall = new Wall(context, [Plane.PLANE_UNIT, 0.5, 0], {width: TILE_SIZE, length: Plane.PLANE_SIZE});
    let leftWall = new Wall(context, [-Plane.PLANE_UNIT, 0.5, 0], {width: TILE_SIZE, length: Plane.PLANE_SIZE});

    let walls = LabyrinthUtil.setUpWalls(context);

    walls.push(frontWall, backWall, rightWall, leftWall);

    // setup food
    let food = FoodUtil.setUpFood(context, sources[2]);

    // set up renderController
    let renderController = new RenderController(context);

    // set up gameController that controls all entities in the game
    let gameController = new GameController(renderController, {
        pacman: pacman,
        camera: camera,
        light: light,
        ground: ground,
        food: food,
        walls: walls,
        ghosts: [ghost1, ghost2]
    });

    // set up ui controller
    let uiController = new UiController(gameController);

    // set up event listeners for user interaction
    document.addEventListener('keydown', (event) => {
        uiController.onKeyDown(event);
    }, false);

    // trigger first tick
    gameController.tick();
}
