/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * 01638800
 * WS2021
 * University of Vienna
 */

 - claim:

 -- foundations:

 I tried to fix the issues mentioned in lab1b regarding the lighting and shaders:
 --- normalized every vector in the fragment shader before using it
 --- removed adding the modelWorldPosition to the normals after transforming them
 --- viewer, vertex and normal positions are in world space, since I liked the result better than having all of them in view space.
     Also, in view space, placing the camera at (0, 0, 0) gave me a kind of funny result. So I think I probably misunderstood something here.
 --- calculating the reflectionVector has been moved to the fragment shader

 --- the light is positioned at the right bottom quarter of the scene at [5.0, 8.0, 5.0]
 --- I used a point light at to achieve this particular lighting of the scene. I tried to place the light at infinity before,
     meaning that I would, in the vertex shader, instead of vec4(pointLightPosition, 1.0), set the position to
     vec4(pointLightPosition, 0.0), as was introduced in the Angel book. However, I found that in my case this did not
     make a huge difference. I don't know if I should have expected only a subtle difference or whether I did something wrong.
     However, in the end I decided to stick to the point light.
