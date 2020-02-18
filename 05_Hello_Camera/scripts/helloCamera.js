
//vertex shader source
var VS_Source = 
    '#version 300 es\n\n'+
    'in vec4 position;\n'+
    'in vec4 colour;\n'+
    'in vec2 texCoord;\n'+
    'out vec4 vColour;\n'+
    'out vec2 vUV;\n'+
    'uniform mat4 projectionMatrix;\n'+
    'uniform mat4 viewMatrix;\n' +
    'uniform mat4 modelMatrix;\n'+
    'void main() {\n' +
    'vColour = colour;\n'+
    'vUV = texCoord;\n'+
    'gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;\n' +
    '}\n';
  
//Fragment shader source
var FS_Source = 
    '#version 300 es\n\n'+
    'precision mediump float;\n'+
    'in vec4 vColour;\n'+
    'in vec2 vUV;\n'+
    'out vec4 fragColour;\n'+
    'uniform sampler2D diffuse;\n'+
    'void main() {\n' +
    'fragColour = vColour * texture(diffuse, vUV);\n' +
    '}\n';

/**
 * Base vertex class 
 *      supports position, colour and texture coordinates
 */
class Vertex{
    /**
     * 
     * @param {vec4} a_pos 
     * @param {vec4} a_col 
     * @param {vec2} a_uv
     */
    constructor(a_pos, a_col, a_uv){
        this._position  = a_pos;
        this._colour    = a_col;
        this._uv        = a_uv;
    }

    get position(){
        return this._position;
    }
    set position(newPosition){
        this._position = newPosition;
    }

    get colour(){
        return this._colour;
    }
    set colour(newColour){
        this._colour = newColour;
    }

    get uv(){
        return this._uv;
    }
    set uv(newUV){
        this._uv = newUV;
    }

    toArray(){
        var arr = [];
        for( var v in this){
           for( var i in this[v]){
                arr.push(this[v][i]);
            }
        }
        return arr;
    }
}

/**
 * Function to transform Array or vertex class objects into a single numerical array
 * this is for WebGL as buffer data must be passed as float32 array
 * @param {Vertex[]} parameter 
 */
function VertexDataAsRawArray(parameter) {
    var rawdata = [];
    var vt = null;
    var arr = null;
    for (var i = 0; i < parameter.length; ++i) { // loop through properties
        vt = parameter[i];
        arr = vt.toArray();
        rawdata = rawdata.concat(arr);
    }
    return rawdata;

}
/**
 * Setup function to ensure that image data is loaded prior to the call to main funtion
 * to render image to screen
 */
var gImg = null;
function setup(){
    gImg = new Image();
    gImg.onload = main;
    gImg.src = "./images/testPattern2.png";
}

var projectionMatrix = mat4.Identity();
var modelMatrix = mat4.Identity();
var cameraMatrix = mat4.Identity();

var gl = null;
var canvas = null;
var program = null;
var vao = null;

//Create the main entry point for this application
function main() {

    //grab the canvas element from the document
    canvas = document.getElementById('WebGL');
    canvas.width = 512;
    canvas.height = 512;
    canvas.style = "border:1px solid #000000;";
    //Initialise the WebGL context
    gl = initWebGL(canvas);
    if( !gl ){
        console.log('Failed to create a rendering context for WebGL');
        return;
    }
    //create the shaders for this example
    var vertex_shader = createShader(gl, gl.VERTEX_SHADER, VS_Source);
    var fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, FS_Source);
    //create the program and link shaders passed in
    program = createProgram(gl, vertex_shader, fragment_shader);

    gl.deleteShader(vertex_shader);
    gl.deleteShader(fragment_shader);

    //get attribute locations from the shaders
    var posLoc = gl.getAttribLocation(program, "position");
    var colLoc = gl.getAttribLocation(program, "colour");
    var uvLoc  = gl.getAttribLocation(program, "texCoord");
   
    //The shaders have been loaded and linked into a shader program
    //create a vertex structure and fill it with the appropriate data
    var vertex_structure = [ 
        new Vertex( new vec4(-2.5, -2.5, 0, 1.0), new vec4(1.0 ,0   ,0   , 1.0), new vec2(0.0, 1.0)),
        new Vertex( new vec4(-2.5,  2.5, 0, 1.0), new vec4(0   ,1.0 ,0   , 1.0), new vec2(0.0, 0.0)),
        new Vertex( new vec4( 2.5,  2.5, 0, 1.0), new vec4(0   ,0   ,1.0 , 1.0), new vec2(1.0, 0.0)),
        new Vertex( new vec4( 2.5, -2.5, 0, 1.0), new vec4(1.0 ,1.0 ,1.0 , 1.0), new vec2(1.0, 1.0))];
    
        //indices to pass to opengl for vertex draw order    
    var indices = [ 0, 2, 1, 0, 3, 2];
    
    //Create a vertex buffer to store the vertex data within
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    //WebGL requires the data to be sent as an array of Float32 objects this function 
    //transforms the vertex structure into that float array to send to the GL buffer
    var value = VertexDataAsRawArray(vertex_structure);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value),  gl.STATIC_DRAW);
    delete value;
    //Create an index buffer and pass out indices to that buffer
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //send the image data across to OpenGL
    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    //set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gImg.width, gImg.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, gImg);
    //OpenGL and WebGL will perform much better if we only deal with power of 2 textures
    //As we're doing this we can get OpenGL to generate our mipmaps for us
    gl.generateMipmap(gl.TEXTURE_2D);
    
    //create the vertex array object and bind it
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    //bind the buffers we will use with this VAO
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    //Set up VAO attributes to describe to OpenGL the makeup of our vertex buffer
    gl.enableVertexAttribArray(posLoc);
    gl.enableVertexAttribArray(colLoc);
    gl.enableVertexAttribArray(uvLoc);

    gl.vertexAttribPointer( posLoc, 4, gl.FLOAT, false, 40, 0);
    gl.vertexAttribPointer( colLoc, 4, gl.FLOAT, false, 40, 16);
    gl.vertexAttribPointer( uvLoc, 2, gl.FLOAT, false, 40, 32);
       
    //Set the viewport size for Open GL and the clear colour
    gl.viewport(0,0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //In WebGL2 Culling is disabled by default. 
    //enable culling to respect polygon winding order
    //gl.enable(gl.CULL_FACE);
   // gl.cullFace(gl.BACK);
    
    //set up projection matrix
    projectionMatrix.projection( Math.PI * 0.25, canvas.width/canvas.height, 0.1, 1000.0);

    var viewMatrix = mat4.lookAt( new vec4( 10.0, 10.0, 10.0, 1.0), new vec4( 0, 0, 0, 1.0), new vec4( 0.0, 1.0, 0.0, 0.0));
    cameraMatrix = new mat4(viewMatrix);
    cameraMatrix.inverse();
    requestAnimationFrame(mainLoop);
}

var lastFrameTimeMs = 0;
var maxFPS = 60;
var timestep = 1.0 / maxFPS;
var delta = 0;

function mainLoop(timestamp){

    delta = (timestamp - lastFrameTimeMs) * 0.001;
    lastFrameTimeMs = timestamp;

    var rotationMatrix = mat4.Identity();
    rotationMatrix.rotateX(3.0 * delta);
    var rotZMatrix = mat4.Identity();
    rotZMatrix.rotateZ(2.0 * delta);

    modelMatrix = modelMatrix.mul(rotationMatrix);
    modelMatrix = modelMatrix.mul(rotZMatrix);

    cameraMatrix = freeMovement(cameraMatrix, delta, 10, new vec4(0,1,0,0) );

    var viewMatrix = new mat4(cameraMatrix);
    viewMatrix.inverse(); 

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //use our shader program to draw the scene
    gl.useProgram(program);
    //get our texture uniform and tell it to used texture 0
    var diffuseUniform = gl.getUniformLocation(program, "diffuse");
    gl.uniform1i(diffuseUniform, 0);
    //set up matrix uniforms
    var projMatrixUniform = gl.getUniformLocation(program, "projectionMatrix");
    gl.uniformMatrix4fv( projMatrixUniform, false, projectionMatrix.asFloat32Array());

    var viewMatrixUniform = gl.getUniformLocation(program, "viewMatrix");
    gl.uniformMatrix4fv( viewMatrixUniform, false, viewMatrix.asFloat32Array());

    var modelMatrixUniform = gl.getUniformLocation(program, "modelMatrix");
    gl.uniformMatrix4fv( modelMatrixUniform, false, modelMatrix.asFloat32Array());
    
    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(mainLoop);
}

/**
     * Function to implement free movement  camera in OpenGL
     * @param {mat4} a_transform
     * @param {number} a_deltaTime
     * @param {number} a_speed 
     * @param {vec4} a_up the world up direction default is vec4(0,1,0,0)
     * @return {mat4} returns a new mat4 with adjusted position beased on key input
     */
function freeMovement( a_transform, a_deltaTime, a_speed, a_up ){
    var vForward = a_transform.zAxis;
    var vRight = a_transform.xAxis;
    var vUp = a_transform.yAxis;
    var vTranslation = a_transform.translation;

    var framespeed = Key.isDown(Key.SHIFT) ? a_deltaTime * a_speed * 2.0 : a_deltaTime * a_speed;

    if( Key.isDown(Key.W)){
        vTranslation = vTranslation.sub(vForward.mul(framespeed)); 
    }
    if( Key.isDown(Key.S)){
        vTranslation = vTranslation.add(vForward.mul(framespeed)); 
    }
    if( Key.isDown(Key.D)){
        vTranslation = vTranslation.add(vRight.mul(framespeed)); 
    }
    if( Key.isDown(Key.A)){
        vTranslation = vTranslation.sub(vRight.mul(framespeed)); 
    }
    if( Key.isDown(Key.Q)){
        vTranslation = vTranslation.add(vUp.mul(framespeed)); 
    }
    if( Key.isDown(Key.E)){
        vTranslation = vTranslation.sub(vUp.mul(framespeed)); 
    }

    a_transform.translation = vTranslation;

    if( Mouse.isButtonDown(Mouse.LEFT)){
                
		var iDeltaX = Mouse.X - Mouse.pX;
		var iDeltaY = Mouse.Y - Mouse.pY;
        Mouse.setPreviousPosition( Mouse.X, Mouse.Y);
        
        var mMat = mat4.Identity();;
		
		// pitch
		if (iDeltaY != 0)
		{
			mMat.axisAngleMatrix( vRight, -iDeltaY / 150.0 );
			vRight = mMat.mul(vRight);
			vUp = mMat.mul(vUp);
			vForward = mMat.mul(vForward);
		}

		// yaw
		if (iDeltaX != 0)
		{
			mMat.axisAngleMatrix( a_up, -iDeltaX / 150.0 );
			vRight = mMat.mul(vRight);
			vUp = mMat.mul(vUp);
			vForward = mMat.mul(vForward);
		}

		a_transform.xAxis = vRight;
		a_transform.yAxis = vUp;
		a_transform.zAxis = vForward;
    }
    return a_transform;


} 
//key handling for input
var Key = {
    _pressed: {},
      SHIFT:16,
      Q: 81,
      E: 69,
      W: 87,
      S: 83,  
      A: 65,
      D: 68,

      isDown: function(keyCode) {
        return this._pressed[keyCode];
      },

      onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
      },

      onKeyup: function(event) {
        delete this._pressed[event.keyCode];
      }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Mouse={
    _pressed:{},
    LEFT: 0,
    MIDDLE:1,
    RIGHT:2,
    
    onButtonDown: function(event){
        this._pressed[event.button] = true;
        this.pX = event.clientX;
        this.pY = event.clientY;
    },

    onButtonUp: function(event){
        delete this._pressed[event.button];
    },

    isButtonDown: function(buttonCode){
        return this._pressed[buttonCode];
    },

    onMove: function(event){
        this.X = event.clientX;
        this.Y = event.clientY;
    },

    setPreviousPosition: function( a_x, a_y){
        this.pX = a_x;
        this.pY = a_y;
    }
    
};
window.addEventListener('mousedown', function(event){Mouse.onButtonDown(event);}, false);
window.addEventListener('mouseup', function(event){Mouse.onButtonUp(event);}, false);
window.addEventListener('mousemove', function(event){Mouse.onMove(event);}, false);
//disable the right mouse button context menu 
window.addEventListener('contextmenu', function(event){event.preventDefault();}, false);
