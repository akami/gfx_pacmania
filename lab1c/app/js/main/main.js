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
    const pacmanTop = fetch("/assets/wavefronts/pacman-top-no-color.obj")
        .then(response => response.text());

    const pacmanBottom = fetch("/assets/wavefronts/pacman-bottom-no-color.obj")
        .then(response => response.text());

    // pass to main
    Promise.all([pacmanTop, pacmanBottom]).then((sources) => main(sources));
}

function main(sources) {
    // initialize WebGL context
    const context = new Context(document.getElementById("lab1c-canvas"));

    // set up moving-entities
    let pacman = new Pacman(context, sources[0], sources[1]);
    let labyrinth = new Labyrinth(context, [0.0, 0.0, 0.0] ,[1.0, 1.0, 1.0], HORIZONTAL_INNER_WALLS, VERTICAL_INNER_WALLS);
    let camera = new Camera(context, PACMAN_POSITION);

    // set up shape array to render;
    const shapes = [];

    // store all constructed-shapes of moving-entities in constructed-shapes array
    pacman._shapes.forEach((shape, i) => shapes.push(shape));
    labyrinth._shapes.forEach((shape, i) => shapes.push(shape));

    // set up renderController
    const renderController = new RenderController(context, shapes);

    // set up gameController that controls all entities in the game
    const gameController = new GameController({
        pacman: pacman,
        camera: camera,
        labyrinth: labyrinth
    });

    // set up ui controller
    const uiController = new UiController(gameController);

    // set up event listeners for user interaction
    document.addEventListener('keydown', (event) => {
        uiController.onKeyDown(event);
    }, false);

    // trigger first render
    renderController.render();
}
