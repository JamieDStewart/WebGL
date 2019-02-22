
# 02: Hello Triangle

This is a demonstration of how to use WebGL to display a simple triangle to screen and how to make use of vertex array objects, vertex buffers and array buffers.
The vertex structure in this code consists of two components a position and a colour.

There is some difference in the order of set up with Vertex Array Objects within WebGL and their set up in regular OpenGL. Prior to the call to **gl.createVertexArray()** a vertex buffer object must have been created and filled with data or the Vertex Array Object will not be created.  
  
This order dependency is not something that is seen in OpenGL outside of the browser, failure to create a VBO prior to creating a VAO produces some errors in the output from the program, although it should be noted that this output is not as clear as it could be to the nature of the problem.  
  
In this example I am creating both a Vertex and Index buffer objects prior to creation of the VAO, only a VBO is required to be created and filled in order for the creation of the VAO to succeed. But why not create all buffers prior to the creation of the VAO.  
  
The only other artefact to mention on this tutorial is that I prefer to use interleaved Vertex Buffer data, I can see more use of creating fewer vertex buffers that contain all the required data for a vertex in a 3D model or object than a series of separate buffers that each contain a single element of the vertex data.  
Interleaved buffers will need to be transformed from the Vertex structure of position, normal, etc... into a float32 array to send to OpenGL. This is the purpose of the VertexDataAsRayArray function.  

My lack of familiarity with javascript and coming from a C/C++ backgound has led me to implement this fucntion as follows
'''javascript
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
'''
  
If there is a better way of performing this function that is more akin to C/C++ syntax of simply grabbing a pointer to the start of the object in memory then I would love to know how to accomplish that as the for loop approach seems slightly cumbersome.
