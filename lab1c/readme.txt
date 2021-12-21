/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

 ____________________________________
 | ---------- STRUCTURE ----------- |
 ------------------------------------
 remarks on general structure of the project and where to find things:

    |- app
        |- css
        |- js
            |- context                  : initializes WebGL canvas and clip space --> shear-view
            |- controller
                |- game-controller      : game logic --> collision detection handling & continuous movement
                |- render-controller    : rendering logic --> fix for lab1a in render shapes method
                |- ui-controller        : user interaction --> user changes direction of pacman
            |- entities                 : game entities --> mere shapes (vertices, normals, ...) are part of entities of the game. Entities
                                            have additional properties like bounding boxes for collision detection or behaviours like move.
                                            Entities can be made up of multiple shapes (like e.g. Pacman)
            |- lib                      : glMatrix library
            |- shader                   : shader GLSL sources --> lab1b fix
            |- shapes                   : constructed shapes to render (Cube, Plane, ...) and WaveFront shape containing obj parser
            |- utils                    : util classes for business logic (collision detection, color generation, transformations, ...)
                                            or generating hard-coded placed objects (walls, food)
            |- main
    |- assets   : obj files
    |- index.html

 ____________________________________
 | ------------ CLAIM ------------- |
 ------------------------------------

 - foundations: labyrinth, animated Pacman
 - graphical aspects: shear-view
 - gaming aspects: continuous movement, centered camera, solid walls, dots to eat ("food")

 |---- foundations ----|

 1) labyrinth:
    - walls are hard-coded as cubes placed onto the scene at certain positions. They are then scaled to achieve length.
      @see app/js/utils/labyrinth-util.js
      @see app/js/shapes/plane.js
      @see app/js/entities/ground.js
      @see app/js/shapes/cube.js
      @see app/js/entities/wall.js

     I tried to fix the issues mentioned in lab1b regarding the lighting and shaders:
     - normalized every vector in the fragment shader before using it
     - removed adding the modelWorldPosition to the normals after transforming them
     - viewer, vertex and normal positions are in world space, since I liked the result better than having all of them in view space.
       Also, in view space, placing the camera at (0, 0, 0) gave me a kind of funny result. So I think I probably misunderstood something here.
     - calculating the reflectionVector has been moved to the fragment shader
       @see app/js/shader/phong-shader/shader-sources/

     - the light is positioned at the right bottom quarter of the scene at [5.0, 8.0, 5.0]
       @see app/js/main.js

     - I used a point light to achieve this particular lighting of the scene. I tried to place the light at infinity before,
       meaning that I would, in the vertex shader, instead of vec4(pointLightPosition, 1.0), set the position to
       vec4(pointLightPosition, 0.0), as was introduced in the Angel book. However, I found that in my case this did not
       make a huge difference. I don't know if I should have expected only a subtle difference or whether I did something wrong.
       However, in the end I decided to stick to the point light.
       @see app/js/shader/phong-shader/shader-sources/


2) animated Pacman
    - I modeled Pacman using Blender and cut him in half in order to achieve the animation. So, Pacman consists of a
      bottom part and a top part with eyes. With this approach, I achieved the eyes to be not static. When Pacman moves,
      its top and bottom half rotate by 45 degrees in their opposing directions which simulates the open and closing of the mouth.
      @see app/js/entities/pacman.js
      @see app/js/controller/game-controller.js

    - In order to achieve this and the turning of pacman into the direction of the movement I had to fix the issues mentioned
      in lab1a. I stored all transformations of a shape into its corresponding matrix (translationMatrix, scalingMatrix, ...)
      and then multiplied them in the render controller in the right order.
      @see app/js/shapes/shape.js
      @see app/js/controller/render-controller.js

    - Pacman opens or closes its mouth per tick. He also turns in one tick. This results in an animation that seems a little
      bit "jumpy". // TODO

 |---- graphical aspects ----|

 1) shear view:
    I achieved a shear view by using an orthogonal projection (mat4.ortho()) and then constructing a shearing
    matrix that shears with respect to the x-axis by 10 degrees and applying it to the projection matrix.
    @see app/js/context/context.js

  |---- gaming aspects ----|

  1) continuous movement:
     @see app/js/controller/game-controller.js

  2) centered camera:
    Made camera an entity that can be moved by game-controller.
    @see app/js/entities/camera.js
    @see app/js/controller/game-controller.js

  3) solid walls:
    Used object intersection test to determine a collision.
    @see app/js/utils/collision-detection-util.js
    @see app/js/controller/game-controller.js

  4) dots to eat:
    The dots to eat are loaded wavefront spheres that are hard-coded onto the empty tiles. Dots (Food) disappear when
    they are eaten. The page re-loads once all dots have been eaten.
    @see app/js/utils/food-util.js
    @see app/js/entities/food.js
    @see app/js/controller/game-controller.js
