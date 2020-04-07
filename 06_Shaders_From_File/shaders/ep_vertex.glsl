#version 300 es

//Input Attributes
in vec4 position;
in vec4 nearPlanePos;
in vec4 farPlanePos;

//shader outputs
out vec4 vertexPosition;
out vec4 nearPosition;
out vec4 farPosition;

//camera matrix uniform
uniform mat4 cameraMatrix;

void main() 
{
    vertexPosition = position;
    nearPosition = cameraMatrix * nearPlanePos;
    farPosition = cameraMatrix * farPlanePos;
    gl_Position = position;
}
