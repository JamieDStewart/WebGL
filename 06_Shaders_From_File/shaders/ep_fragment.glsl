#version 300 es
//Set floating point prescision
precision mediump float;
//vertex shader outputs - fragment inputs
in vec4 vertexPosition;
in vec4 nearPosition;
in vec4 farPosition;
//fragment output attribute
out vec4 fragColour;

void main() 
{
    float t = -nearPosition.y / (farPosition.y-nearPosition.y);
    vec3 R = nearPosition.xyz + t * (farPosition.xyz-nearPosition.xyz);
    float c = float( ( int(round(R.x * 5.0)) + int(round(R.z * 5.0)) ) % 2);
    
    fragColour = vec4(vec3(c/2.0 + 0.3), 1) * float(t > 0.0);
}