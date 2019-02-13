
//vertex shader source
var VS_Source = 
    'void main() {\n' +
    'gl_Position = vec4( 0.0, 0.0, 0.0, 1.0);\n' +
    'gl_PointSize = 10.0;\n' +
    '}\n';
  
//Fragment shader source
var FS_Source = 
    'void main() {\n' +
    'gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

//Create the main entry point for this application
function main() {
    //grab the canvas element from the document
    var canvas = document.getElementById('WebGL');
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style = "border:1px solid #000000;";
    //Initialise the WebGL context
    var gl = initWebGL(canvas);
    g_gl = gl;
    if( !gl ){
        console.log('Failed to create a rendering context for WebGL');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vertex_shader = createShader(gl, gl.VERTEX_SHADER, VS_Source);
    var fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, FS_Source);

    var program = createProgram(gl, vertex_shader, fragment_shader);

    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);

}

