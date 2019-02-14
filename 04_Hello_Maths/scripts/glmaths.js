/**
 * This javascript file contains a basic and functional maths library
 * The layout of this maths library is designed to be similar to that 
 * of OpenGL's so a column major matrix/vector style has been implemented
 * 
 */
 class vec2{
     constructor(a_x, a_y){ this._x = a_x; this._y = a_y; }
     get x(){ return this._x; }
     set x(val){ this._x = val; }
     get y(){ return this._y; }
     set y(val){ this._y = val; }
     /**
      * Function to convert vec2 into Float32Array
      * @return {Float32Array}
      */
     asFloat32Array(){ return Float32Array([this.x, this.y]); }
     /**
      * function returns the negative of the vector
      * @return {vec2} the negative of the calling vector
      */
     neg(){ return new vec2( -this.x, -this.y); }
     /**
      * Function to add vectors or scalar value to vector
      * @param {vec2|number} a_val 
      * @return {vec2} returns a new vector with the additive value
      */
     add( a_val ){ if(a_val instanceof vec2){ return new vec2(this.x + a_val.x, this.y + a_val.y); }else{ return new vec2(this.x + a_val, this.y + a_val); } }
     /**
      * Function to subtract a scalar value or vector from vec2
      * @param {vec2|number} a_val 
      * @return {vec2} returns a new vector with the subtractive value
      */
     sub( a_val){ if( a_val instanceof vec2){ return new vec2( this.x - a_val.x, this.y - a_val.y); }else{ return new vec2( this.x - a_val, this.y - a_val); } }
     /**
      * Function to multiply value with a vector
      * @param {vec2|number} a_val 
      * @return {vec2} returns a new vector with the multiplied value
      */
     mul(a_val){
        if( a_val instanceof vec2){
            return new vec2( this.x * a_val.x, this.y * a_val.y);
        }else{
            return new vec2(this.x * a_val, this.y * a_val);
        }
     }
     /**
      * Function to divide value with a vector
      * @param {vec2|number} a_val 
      * @return {vec2} returns a new vector with the divided value
      */
     div(a_val){
        if( a_val instanceof vec2){
            return new vec2(this.x/a_val.x, this.y/a_val.y);
        }else{
            return new vec2(this.x/a_val, this.y/a_val);
        }
     }
     /**
      * Length of the vector
      * @return {number} length of the vector
      */
     length(){
         return Math.sqrt(this.x * this.x + this.y * this.y);
     }
     /**
      * LengthSqrd of the vector
      * @return {number} length of the vector squared
      */
     lengthSqrd(){
         return this.x * this.x + this.y * this.y;
     }
     /**
      * get the distance to the vector provided in the argument
      * @param {vec2} a_v2 
      * @return {number} returns the distance to the given vec2
      */
     distance(a_v2){
         return this.sub(a_v2).length();
     }

     distanceSqrd(a_v2){
         return this.sub(a_v2).lengthSqrd();
     }
     /**
      * The Dot Product of the vector with the vec2 passed into this function
      * @param {vec2} a_v2 
      * @return {number} 
      */
     dot(a_v2){
         return this.x * a_v2.x + this.y * a_v2.y;
     }
     /**
      * Function to test if this is a unit vector 
      * unit vectors have a length of 1 (or less)
      */
     isUnit(){
         return (this.length() <= 1.0 );
     }

     /**
      * normalize - convert vector to unit length
      * @return {number} return value is the previous length of the vector
      */
     normalize(){
         var len = this.length();
         var invNorm = (len != 0.0) ? 1.0/len : Number.EPSILON;
         this.x *= invNorm;
         this.y *= invNorm;
         return len;
     }
     /**
      * getUnit() - function get the unit/normalised vector 
      *   no modification to original vector
      */
     getUnit(){
        var len = this.length();
        var invNorm = (len != 0.0) ? 1.0/len : Number.EPSILON;
        return new vec2(this.x*invNorm, this.y*invNorm);
     }

     /**
      * getPerp() - returns a vector that is perpendicular to this vector
      */
     getPerp(){
         return new vec2( this.y, -this.x);
     }

     /**
      * lerp - linear interpolation, lerp between this vector and
      * the one passed in by ammount
      * @param {vec2} a_v2 
      * @param {number} a_amount value between 0 - 1
      * @return a new vec2
      */
     lerp(a_v2, a_amount){
         return a_v2.sub(this).mul(a_amount).add(this);
     }

     rotate( a_angle ){
         var tempX = this.x;
         this.x = tempX * Math.cos(a_angle) - this.y * Math.sin(a_angle);
         this.y = tempX * Math.sin(a_angle) + this.y * Math.cos(a_angle);
     }

 }
 
 /**
  * vec3 class 
  *    Vector3 class and functions
  */
class vec3{
    constructor(a_x, a_y, a_z){
        this._x = a_x; this._y = a_y; this._z = a_z;
    }
    get x(){ return this._x; }
    get y(){ return this._y; }
    get z(){ return this._z; }
    set x(a_x){ this._x = a_x; }
    set y(a_y){ this._y = a_y; }
    set z(a_z){ this._z = a_z; }

    /**
      * Function to convert vec2 into Float32Array
      * @return {Float32Array}
      */
     asFloat32Array(){ return Float32Array([this.x, this.y, this.z]); }
     /**
      * function returns the negative of the vector
      * @return {vec3} the negative of the calling vector
      */
     neg(){ return new vec3( -this.x, -this.y, -this.z); }
     /**
      * Function to add vectors or scalar value to vector
      * @param {vec3|number} a_val 
      * @return {vec3} returns a new vector with the additive value
      */
     add( a_val ){ if(a_val instanceof vec3){ return new vec3(this.x + a_val.x, this.y + a_val.y, this.z + a_val.z); }else{ return new vec3(this.x + a_val, this.y + a_val, this.z + a_val); } }
     /**
      * Function to subtract a scalar value or vector from vec2
      * @param {vec3|number} a_val 
      * @return {vec3} returns a new vector with the subtractive value
      */
     sub( a_val){ if( a_val instanceof vec3){ return new vec3( this.x - a_val.x, this.y - a_val.y, this.z - a_val.z); }else{ return new vec3( this.x - a_val, this.y - a_val, this.z - a_val); } }
     /**
      * Function to multiply value with a vector
      * @param {vec3|number} a_val 
      * @return {vec3} returns a new vector with the multiplied value
      */
     mul(a_val){
        if( a_val instanceof vec3){
            return new vec3( this.x * a_val.x, this.y * a_val.y, this.z * a_val.z);
        }else{
            return new vec3(this.x * a_val, this.y * a_val, this.z * a_val);
        }
     }
     /**
      * Function to divide value with a vector
      * @param {vec3|number} a_val 
      * @return {vec3} returns a new vector with the divided value
      */
     div(a_val){
        if( a_val instanceof vec3){
            return new vec3(this.x/a_val.x, this.y/a_val.y, this.z/a_val.z);
        }else{
            return new vec3(this.x/a_val, this.y/a_val, this.z/a_val);
        }
     }
     /**
      * Length of the vector
      * @return {number} length of the vector
      */
     length(){
         return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
     }
     /**
      * LengthSqrd of the vector
      * @return {number} length of the vector squared
      */
     lengthSqrd(){
         return this.x * this.x + this.y * this.y + this.z * this.z;
     }
     /**
      * get the distance to the vector provided in the argument
      * @param {vec3} a_v3 
      * @return {number} returns the distance to the given vec2
      */
     distance(a_v3){
         return this.sub(a_v3).length();
     }

     distanceSqrd(a_v3){
         return this.sub(a_v3).lengthSqrd();
     }
     /**
      * The Dot Product of the vector with the vec2 passed into this function
      * @param {vec3} a_v3 
      * @return {number} 
      */
     dot(a_v3){
         return this.x * a_v3.x + this.y * a_v3.y + this.z * a_v3.z;
     }
     /**
      * Function to test if this is a unit vector 
      * unit vectors have a length of 1 (or less)
      */
     isUnit(){
         return (this.length() <= 1.0 );
     }

     /**
      * normalize - convert vector to unit length
      * @return {number} return value is the previous length of the vector
      */
     normalize(){
         var len = this.length();
         var invNorm = (len != 0.0) ? 1.0/len : Number.EPSILON;
         this.x *= invNorm;
         this.y *= invNorm;
         this.z *= invNorm;
         return len;
     }
     /**
      * getUnit() - function get the unit/normalised vector 
      *   no modification to original vector
      */
     getUnit(){
        var len = this.length();
        var invNorm = (len != 0.0) ? 1.0/len : Number.EPSILON;
        return new vec3(this.x*invNorm, this.y*invNorm, this.z*invNorm);
     }

     /**
      * lerp - linear interpolation, lerp between this vector and
      * the one passed in by ammount
      * @param {vec3} a_v3 
      * @param {number} a_amount value between 0 - 1
      * @return a new vec2
      */
     lerp(a_v3, a_amount){
         return a_v3.sub(this).mul(a_amount).add(this);
     }

     rotateX( a_angle ){
         var tempY = this.y;
         this.y = tempY * Math.cos(a_angle) - this.z * Math.sin(a_angle);
         this.z = tempY * Math.sin(a_angle) + this.z * Math.cos(a_angle);
     }

     rotateY( a_angle ){
        var tempX = this.x;
        this.x = tempX * Math.cos(a_angle) - this.z * Math.sin(a_angle);
        this.z = tempX * Math.sin(a_angle) + this.z * Math.cos(a_angle);
    }

    rotateZ( a_angle ){
        var tempX = this.x;
        this.x = tx * Math.cos(a_angle) - this.y * Math.sin(a_angle);
        this.y = tx * Math.sin(a_angle) + this.y * Math.cos(a_angle);
    }
}
