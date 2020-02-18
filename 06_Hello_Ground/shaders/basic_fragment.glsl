#version 300 es
//set floating point precision
precision mediump float;
//shader inputs
in vec4 vColour;
in vec2 vUV;
//shader output
out vec4 fragColour;
//texture uniform
uniform sampler2D diffuse;

void main() 
{
    fragColour = vColour * texture(diffuse, vUV);
}