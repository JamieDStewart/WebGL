

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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


}