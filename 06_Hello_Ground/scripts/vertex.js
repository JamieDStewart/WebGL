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