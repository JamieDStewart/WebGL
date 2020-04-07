#version 300 es

in vec4 position;
in vec4 colour;
in vec2 texCoord;

out vec4 vColour;
out vec2 vUV;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() 
{
    vColour = colour;
    vUV = texCoord;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
}