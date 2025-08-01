# Pacmania
This solo project was developed as part of the Foundations of Computer Graphics course at the University of Vienna. It is a WebGL‑based implementation of a Pacman‑like game with a focus on computer graphics techniques (lighting, shadows, shearing projections) combined with game logic (movement, collision detection, enemy AI).

## What I did
- Game foundations

  - Implemented a 3D labyrinth built from hard‑coded cubes

  - Modeled and animated Pacman in Blender (split model for mouth animation)

  - Added two enemy ghosts with simple AI movement

- Graphical aspects

  - Implemented a shear view using orthogonal projection + shearing matrix

  - Added shadows using projection matrices and fragment shader modifications

  - Fixed and extended Phong shading (normalization, reflection vectors, lighting in world space)

- Gameplay aspects

  - Continuous Pacman movement with fractional steps per tick

  - Collision detection for solid walls and food dots

  - Centered camera as a movable entity

  - Food system: collectible dots placed in the maze (scene reloads when cleared)

  - Ghost collision: game resets when Pacman is caught

## Key outcome
- Combined computer graphics techniques (lighting, shadows, projections, animation) with basic game mechanics

- Produced a working Pacman‑like game in WebGL with animated characters and interactive gameplay

- Showcased understanding of shader programming, transformations, and collision detection

## Technologies used
- JavaScript (core logic, controllers, entities)

- WebGL (rendering)

- GLSL shaders (Phong lighting, shadow rendering)

- glMatrix (matrix and vector math)

- Blender (modeling Pacman and ghost assets)

- Python webserver (for testing and asset loading)

## Domain & Keywords
This project lies at the intersection of Computer Graphics and Game Development, specifically:

- WebGL Rendering – real‑time graphics in the browser

- Shader Programming – implementing Phong shading, shadows, and projections

- Transformations & Projections – shear matrices, orthogonal projections, model/view transformations

- Collision Detection – bounding box intersection tests

- Game Loop & Entities – continuous movement, AI enemies, interactive camera

## Tested environments
- Fedora 33 (Firefox, WebStorm IDE)

- macOS Monterey (Safari)

- Windows 10 (Firefox)
