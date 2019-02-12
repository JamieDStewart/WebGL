//===========================================================
// WebGL-Utils
//      This script contains utility functions that are used
//      by OpenGL such as creating a GL context, loading
//      shaders from string buffers or from file
//===========================================================

function initWebGL(canvas){
    var _gl = null;
    try{
        _gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e){}
    //if a webgl context has not been created then display an alert message and return null;
    if(!_gl){
        alert("Unable to initialise a WebGL context, please use a browser that supports WebGL.");
        _gl = null;
    }
    return _gl;
}