//===========================================================
// WebGL-Utils
//      This script contains utility functions that are used
//      by OpenGL such as creating a GL context, loading
//      shaders from string buffers or from file
//===========================================================

/**
 * Initialises a WebGL context for the provided canvas.
 * @param {canvas} canvas the canvas this context is to be created for
 * @return {WebGL2RenderingContext} the rendering context that for this canvas
 */
function initWebGL(canvas){
    var _gl = null;
    try{
        _gl = canvas.getContext("webgl2");
    }
    catch(e){}
    //if a webgl context has not been created then display an alert message and return null;
    if(!_gl){
        alert("Unable to initialise a WebGL context, please use a browser that supports WebGL.");
        _gl = null;
    }
    return _gl;
}

/**
 * Create a shader from the contents of a string buffer 
 * @param {WebGL2RenderingConetex} a_gl the webGL rendering context
 * @param {string} a_type the type of shader to be created/compiled
 * @param {string} a_source the shader as a string buffer
 * 
 * @return {WebGLShader} a compiled glsl shader
 */
function createShader(a_gl, a_type, a_source){
    var shader = a_gl.createShader(a_type);
    if( !shader ){
        console.log('Unable to create shader');
        return null;
    }

    a_gl.shaderSource(shader, a_source);
    a_gl.compileShader(shader);

    var success = a_gl.getShaderParameter(shader, a_gl.COMPILE_STATUS);
    if( success !== true ){
        console.log('Unable to compile shader:' + a_gl.getShaderInfoLog(shader) );
        a_gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

/**
 * Create a shader from the contents of a scripts tag
 * @param {WebGL2RenderingContext} a_gl  the WebGL rendering context
 * @param {string} a_scriptTagID the script tag id
 * @param {string} a_optShaderType optional parameter, the type of shader to load
 *          If not passed in will use the shader type flag from the script tag.
 * 
 * @return {WebGLShader} the compiled shader
 */
function createShaderFromScriptTag(a_gl, a_scriptTagID, a_optShaderType ){
    //Get the script tag from the ID
    var shaderScript = document.getElementById(a_scriptTagID);
    if(!shaderScript){
        console.log('Unable to load shader from tag: ' + a_scriptTagID );
        return null;
    }

    //get the script tag's contents
    var shaderSource = shaderScript.text;
    //Test to see if a type has been passed in to use. If not use the type from the 
    //script tag.
    if(!a_optShaderType){
        if(shaderScript.type == "shader/glsl-vertex"){
            a_optShaderType = a_gl.VERTEX_SHADER;
        } else if( shaderScript.type == "shader/glsl-fragment"){
            a_optShaderType = a_gl.FRAGMENT_SHADER;
        }else{
            console.log('Shader type not set in: ' + a_scriptTagID);
        }
    }
    return createShader(a_gl, a_optShaderType, shaderSource);
}

/**
 * Creates a shader program from the two provided compiled shaders
 * @param {WebGL2RenderingContext} a_gl the WebGL rendering context
 * @param {WebGLShader} a_vertexShader the compiled vertex shader
 * @param {WebGLShader} a_fragmentShader the compiled fragment shader
 */
function createProgram( a_gl, a_vertexShader, a_fragmentShader ){
    //create the WebGl shader
    var program = a_gl.createProgram();
    if( !program ){
        console.log('Failed to create the shader program');
        return null;
    }

    a_gl.attachShader(program, a_vertexShader);
    a_gl.attachShader(program,a_fragmentShader);
    a_gl.linkProgram(program);
    //test for progarm link success
    var linkStatus = a_gl.getProgramParameter(program, a_gl.LINK_STATUS);
    if( !linkStatus){
        console.log('Failed to link shader program: ' + a_gl.getProgramInfoLog(program));
        a_gl.deleteProgram(program);
        return null;
    }
    return program;
}

/**
 * Load and create a program from script tags contained in the document
 * @param {WebGL2RenderingContext} a_gl 
 * @param {string} a_vertexTagID 
 * @param {string} a_fragmentTagID 
 * 
 * @return {Tuple} a tuple containing { Program:WebGLProgram, VertexShader:WebGLShader, FragmentShader:WebGLShader}
 */
function createProgramFromScriptTags( a_gl, a_vertexTagID, a_fragmentTagID){
    var vertexShader = createShaderFromScriptTag(a_gl, a_vertexTagID, a_gl.VERTEX_SHADER);
    var fragmentShader = createShaderFromScriptTag(a_gl, a_fragmentTagID, a_gl.FRAGMENT_SHADER);
    var program = createProgram(a_gl, vertexShader, fragmentShader);
    return {program:program, vertexShader:vertexShader, fragmentShader:fragmentShader};
}

/**
 * 
 * @param {string} a_filename the filepath that is to be loaded
 * @param {number} a_shaderType the WebGL shader type ID value
 * @param {function} a_callback the function that is to be called when the shader file is loaded
 */
function loadShaderFromFile( a_filename, a_shaderType, a_callback){
    var fileData = new XMLHttpRequest();
    fileData.onreadystatechange = function(){
        if( this.readyState === 4 ){
            if(this.status === 200 || this.status == 0 ){
                //file has been successfully loaded
                console.log('File Loaded: ' + a_filename);
                //send the text data to the shader loader
                a_callback(this.responseText, a_shaderType);
            }
        }
    }
    fileData.open("GET", a_filename, false);
    fileData.send();

}