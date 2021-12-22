/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

 ____________________________________________________
 | ---------- GENERAL REMARKS: STRUCTURE ----------- |
 ----------------------------------------------------
 remarks on general structure of the project and where to find things:

    |- app
        |- css
        |- js
            |- context                  : initializes WebGL canvas and clip space --> shear-view
            |- controller
                |- game-controller      : game logic --> collision detection handling & continuous movement
                |- render-controller    : rendering logic --> fix for lab1a in render shapes method, rendering shadows
                |- ui-controller        : user interaction --> user changes direction of pacman
            |- entities                 : game entities --> mere shapes (vertices, normals, ...) are part of entities of the game. Entities
                                            have additional properties like bounding boxes for collision detection or behaviours like move.
                                            Entities can be made up of multiple shapes (like e.g. Pacman)
            |- lib                      : glMatrix library
            |- shader                   : shader GLSL sources --> lab1b fix, shadows
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
 - graphical aspects: shear-view, shadow
 - gaming aspects: continuous movement, centered camera, solid walls, dots to eat ("food"), two enemy ghosts

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

     - the light is positioned at the right bottom quarter of the scene at [5.0, 10.0, 5.0]
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

    - I had troubles implementing a fluid animation, since I had to use fractional movements (since one game tile is 1x1)
      per game tick to achieve this. This results in Pacman's position to be slightly off sometimes due to the use of floats.
      I tried to mitigate this in the game controller, but one can still slightly notice.

 |---- graphical aspects ----|

 1) shear view:
    I achieved a shear view by using an orthogonal projection (mat4.ortho()) and then constructing a shearing
    matrix that shears it by 10 degrees and applying it to the projection matrix.
    @see app/js/context/context.js

 2) shadow:
    I used the approach as presented in the lectures and in the Angel book, namely the projection of the shadow onto
    a plane. To do this, I implemented a second render method after the rendering of a shape and defined the shadow
    projection matrix, as seen in the lectures for orthogonal projections, there. Additionally, I defined a shadow scalar
    uniform that is applied to the light components in the fragment shader. The scalar is 1 for rendering objects, and 0
    for rendering shadows, in order to make the shadows black. I noticed funny behaviour, as the shadow is drawn right
    onto the plane at y = 0. It seemed like WebGL could not decide which, the plane or the shadow, is above. To mitigate
    that behaviour, I set the plane in the main function to be slightly beneath 0.
    @see app/js/controller/render-controller.js
    @see app/js/shader/phong-shader/shader-sources/phong-fragment-shader-source.js
    @see app/js/main.js

  |---- gaming aspects ----|

  1) continuous movement:
     @see app/js/controller/game-controller.js

  2) centered camera:
    Made camera an entity that can be moved by the game-controller.
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

  5) two enemy ghosts:
    The enemy ghosts were modeled using blender. They choose a different direction once hitting a wall. Upon a collision
    with pacman, the game freezes and restarts. Due to the issues mentioned earlier by using fractional movements, the
    ghosts sometimes appear to be not in the center of a tile when changing directions. I think that this is due to the fact that the
    entity's bounding box is also moved when moving the entity, but, by using fractions, due to computational rounding errors
    the amount of movement can differ slightly. This can accumulate over the course of the game.

    Also, another issue I could not fix is that the rotation of the face in north or south direction is inverted.
    This is because of a modeling error I had to fix regarding pacman, such that pacman initially faces the viewer.
    Pacman had to be rotated before the first render by the z axis, which also influenced the actual degrees in the directions
    I used for the rotations. Because the rotations are altered, this ultimately also influenced the rotation of the ghosts,
    which initially faced another direction as opposed to pacman.
    To solve this, a re-model of Pacman would be necessary.



 __________________________________________________
 | ------------ TESTED ENVIRONMENTS ------------- |
 --------------------------------------------------

-- dev-computer: OS: Fedora 33 (Workstation Edition)
                Host: 20LJS02W00 ThinkPad X380 Yoga
                IDE: WebStorm
                Browser: Firefox

-- test-computer:
--- dev-computer
--- Macbook Pro, MacOS Monterey, Safari
--- PC, Windows10, Firefox

----> tested using a python server

-- browsers used for testing:
--- Mozilla Firefox for Fedora - 1.0 (93.0 (64-bit))
--- Mozilla Firefox on Windows - 93.0
--- Safari 15.1


 ________________________________________
 | ------------ RESOURCES ------------- |
 ----------------------------------------

-- I used several sources of information to learn about the mathematical concepts, WebGL and JavaScript, these include:
--- same resources as lab1a, lab1b
--- additionally, MDN docs regarding intersection tests: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
--- additionally, loading textures (is implemented partly in shaders and shapes, usemtl was not implemented and hence is not used):
        https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
        https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html
        https://stackoverflow.com/questions/25689183/webgl-use-both-texture-and-color-buffers


 _____________________________________
 | ------------ HOW TO ------------- |
 -------------------------------------

I am using fetch to load obj. files, so a webserver is needed.
