
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

class vec4{
    /**
     * 
     * @param {number} a_x 
     * @param {number} a_y 
     * @param {number} a_z 
     * @param {number} a_w 
     */
    constructor(a_x, a_y, a_z, a_w){
        this.x = a_x;
        this.y = a_y;
        this.z = a_z;
        this.w = a_w;
    }
}


class Vertex{
    /**
     * 
     * @param {vec4} a_pos 
     * @param {vec4} a_col 
     */
    constructor(a_pos, a_col){
        this._position = a_pos;
        this._colour = a_col;
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
    var vertex_structure = [ 
        new Vertex( new vec4(-0.5, -0.75, 0, 1.0), new vec4(1.0 ,0   ,0   , 1.0)),
        new Vertex( new vec4( 0.5, -0.75, 0, 1.0), new vec4(0   ,1.0 ,0   , 1.0)),
        new Vertex( new vec4( 0  ,  0.25, 0, 1.0), new vec4(0   ,0   ,1.0 , 1.0))];
    //WebGL requires the data to be sent as an array of Float32 objects this function 
    //transforms the vertex structure into that float array to send to the GL buffer
    var value = VertexDataAsRawArray(vertex_structure);
    
    
    var indices = [ 0, 1, 2];
    
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value),  gl.STATIC_DRAW);
    delete value;
    
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

