
# 01: Initialising WebGL

This is a simple demonstration of how to initialise a WebGL context. The script *webgl-utils.js* is where boilerplate code related to WebGL is kept.  
Funtionality like the acquisition of a WebGL context, loading of shaders and the creation of a shader program from the loaded shader files will be
handled within this utility script file.  
  
This demo simply creates an empty WebGL context to be used within the browser and draws a simple GL_POINT at the origin. The drawing of the point is carried out
in the vertex shader, all points will be drawn at 0,0,0. This example is one of the simplest shaders that you can create to draw a point at the origin in screen space.
