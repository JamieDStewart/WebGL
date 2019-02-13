
//vertex shader source
var VS_Source = 
    '#version 300 es\n\n'+
    'in vec4 position;\n'+
    'in vec4 colour;\n'+
    'out vec4 vColour;\n'+
    'void main() {\n' +
    'vColour = colour;\n'+
    'gl_Position = position;\n' +
    '}\n';
  
//Fragment shader source
var FS_Source = 
    '#version 300 es\n\n'+
    'precision mediump float;\n'+
    'in vec4 vColour;\n'+
    'out vec4 fragColour;\n'+
    'void main() {\n' +
    'fragColour = vColour;\n' +
    '}\n';

class Vertex{
    constructor(){
        this.position;
        this.colour;
    }

    get position(){
        return this.position;
    }
    set position(newPosition){
        this.position = newPosition;
    }

    get colour(){
        return this.colour;
    }
    set colour(newColour){
        this.colour = newColour;
    }
}

//Create the main entry point for this application
function main() {
    //grab the canvas element from the document
    var canvas = document.getElementById('WebGL');
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style = "border:1px solid #000000;";
    //Initialise the WebGL context
    var gl = initWebGL(canvas);
    if( !gl ){
        console.log('Failed to create a rendering context for WebGL');
        return;
    }
    var vertex_shader = createShader(gl, gl.VERTEX_SHADER, VS_Source);
    var fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, FS_Source);

    var program = createProgram(gl, vertex_shader, fragment_shader);
    var posLoc = gl.getAttribLocation(program, "position");
    var colLoc = gl.getAttribLocation(program, "colour");
   
    //The shaders have been loaded and linked into a shader program
    //create a vertex structure and fill it with the appropriate data
    var vertex_data = [-0.5,-0.75, 0, 1.0, 1.0, 0.0, 0.0, 1.0,
        0.5,-0.75, 0, 1.0, 0.0, 1.0, 0.0, 1.0,
        0  , 0.25, 0, 1.0, 0.0, 0.0, 1.0, 1.0];
    
        var indices = [ 0, 1, 2];
    
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_data),  gl.STATIC_DRAW);
   
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
   
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    
    gl.enableVertexAttribArray(posLoc);
    gl.enableVertexAttribArray(colLoc);

    gl.vertexAttribPointer( posLoc, 4, gl.FLOAT, false, 32, 0);
    gl.vertexAttribPointer( colLoc, 4, gl.FLOAT, false, 32, 16);
    
    
    
    gl.viewport(0,0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

}

