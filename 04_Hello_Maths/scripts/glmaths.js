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
     asFloat32Array(){ return new Float32Array([this.x, this.y]); }
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
         this.x *= invNorm; this.y *= invNorm;
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
     asFloat32Array(){ return new Float32Array([this.x, this.y, this.z]); }
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
        if( a_val instanceof vec3){ return new vec3( this.x * a_val.x, this.y * a_val.y, this.z * a_val.z); }
        else{ return new vec3(this.x * a_val, this.y * a_val, this.z * a_val); }
     }
     /**
      * Function to divide value with a vector
      * @param {vec3|number} a_val 
      * @return {vec3} returns a new vector with the divided value
      */
     div(a_val){
        if( a_val instanceof vec3){ return new vec3(this.x/a_val.x, this.y/a_val.y, this.z/a_val.z); }
        else{ return new vec3(this.x/a_val, this.y/a_val, this.z/a_val); }
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
      * Cross Product
      * @return {vec3} vector that is perpendicular to this vector and the one passed in
      */
     cross(a_v3){
         return new vec3( this.y * a_v3.z - this.z * a_v3.y,
            this.z * a_v3.x - this.x * a_v3.z,
            this.x * a_v3.y - this.y * a_v3.x);
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
         this.x *= invNorm; this.y *= invNorm; this.z *= invNorm;
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


 /**
  * vec4 class 
  *    Vector3 class and functions
  */
 class vec4{
    constructor(a_x, a_y, a_z, a_w){
        this._x = a_x; this._y = a_y; this._z = a_z; this._w = a_w;
    }
    get x(){ return this._x; }
    get y(){ return this._y; }
    get z(){ return this._z; }
    get w(){ return this._w; }
    set x(a_x){ this._x = a_x; }
    set y(a_y){ this._y = a_y; }
    set z(a_z){ this._z = a_z; }
    set w(a_w){ this._w = a_w; }

    /**
      * Function to convert vec2 into Float32Array
      * @return {Float32Array}
      */
     asFloat32Array(){ return new Float32Array([this.x, this.y, this.z, this.w]); }
     /**
      * function returns the negative of the vector
      * @return {vec4} the negative of the calling vector
      */
     neg(){ return new vec4( -this.x, -this.y, -this.z, -this.w); }
     /**
      * Function to add vectors or scalar value to vector
      * @param {vec4|number} a_val 
      * @return {vec4} returns a new vector with the additive value
      */
     add( a_val ){ if(a_val instanceof vec4){ return new vec4(this.x + a_val.x, this.y + a_val.y, this.z + a_val.z, this.w + a_val.w); }else{ return new vec4(this.x + a_val, this.y + a_val, this.z + a_val, this.w + a_val); } }
     /**
      * Function to subtract a scalar value or vector from vec2
      * @param {vec4|number} a_val 
      * @return {vec4} returns a new vector with the subtractive value
      */
     sub( a_val){ if( a_val instanceof vec4){ return new vec4( this.x - a_val.x, this.y - a_val.y, this.z - a_val.z, this.w - a_val.w); }else{ return new vec4( this.x - a_val, this.y - a_val, this.z - a_val, this.w - a_val); } }
     /**
      * Function to multiply value with a vector
      * @param {vec4|number} a_val 
      * @return {vec4} returns a new vector with the multiplied value
      */
     mul(a_val){
        if( a_val instanceof vec4){ return new vec4( this.x * a_val.x, this.y * a_val.y, this.z * a_val.z, this.w * a_val.w); }
        else{ return new vec4(this.x * a_val, this.y * a_val, this.z * a_val, this.w * a_val); }
     }
     /**
      * Function to divide value with a vector
      * @param {vec4|number} a_val 
      * @return {vec4} returns a new vector with the divided value
      */
     div(a_val){
        if( a_val instanceof vec4){ return new vec4(this.x/a_val.x, this.y/a_val.y, this.z/a_val.z, this.w/a_val.w); }
        else{ return new vec4(this.x/a_val, this.y/a_val, this.z/a_val, this.w/a_val); }
     }
     /**
      * Length of the vector
      * @return {number} length of the vector
      */
     length(){
         return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
     }

     length3(){
         return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
     }
     /**
      * LengthSqrd of the vector
      * @return {number} length of the vector squared
      */
     lengthSqrd(){
         return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
     }
     length3Sqrd(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
     /**
      * get the distance to the vector provided in the argument
      * @param {vec4} a_v4 
      * @return {number} returns the distance to the given vec2
      */
     distance(a_v4){
         return this.sub(a_v4).length();
     }
     distance3(a_v4){
        return this.sub(a_v4).length3();
    }

     distanceSqrd(a_v4){
         return this.sub(a_v4).lengthSqrd();
     }

     distance3Sqrd(a_v4){
        return this.sub(a_v4).length3Sqrd();
    }
     /**
      * The Dot Product of the vector with the vec2 passed into this function
      * @param {vec4} a_v4 
      * @return {number} 
      */
     dot(a_v4){
         return this.x * a_v4.x + this.y * a_v4.y + this.z * a_v4.z + this.w * a_v4.w;
     }
     dot3(a_v4){
        return this.x * a_v4.x + this.y * a_v4.y + this.z * a_v4.z;
    }
     /**
      * Cross Product
      * @return {vec4} vector that is perpendicular to this vector and the one passed in
      * with vector 4 the vectors are treated as directional with the returned w componenet being 0.
      */
     cross(a_v4){
         return new vec4( this.y * a_v4.z - this.z * a_v4.y,
            this.z * a_v4.x - this.x * a_v4.z,
            this.x * a_v4.y - this.y * a_v4.x, 
            0.0);
     }
     /**
      * Function to test if this is a unit vector 
      * unit vectors have a length of 1 (or less)
      */
     isUnit(){
         return (this.length() <= 1.0 );
     }
     isUnit3(){
        return (this.length3() <= 1.0 );
    }

     /**
      * normalize - convert vector to unit length
      * @return {number} return value is the previous length of the vector
      */
     normalize(){
         var len = this.length();
         var invNorm = (len != 0.0) ? 1.0/len : Number.EPSILON;
         this.x *= invNorm; this.y *= invNorm; this.z *= invNorm;
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
      * @param {vec4} a_v4 
      * @param {number} a_amount value between 0 - 1
      * @return a new vec2
      */
     lerp(a_v4, a_amount){
         return a_v4.sub(this).mul(a_amount).add(this);
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

class mat3{
    constructor( a_m11, a_m21, a_m31, a_m12, a_m22, a_m32, a_m13, a_m23, a_m33){
        if( a_m11 instanceof mat3){ //construct from another matrix
            this._m11 = a_m11.m11; this._m21 = a_m11.m21; this._m31 = a_m11.m31;
            this._m12 = a_m11.m12; this._m22 = a_m11.m22; this._m32 = a_m11.m32;
            this._m13 = a_m11.m13; this._m23 = a_m11.m23; this._m33 = a_m11.m33;
        }else if( a_m11 instanceof vec3 ){ //construct from three vectors
            this._m11 = a_m11.x; this._m21 = a_m11.y; this._m31 = a_m11.z;
            this._m12 = a_m21.x; this._m22 = a_m21.y; this._m32 = a_m21.z;
            this._m13 = a_m31.x; this._m23 = a_m31.y; this._m33 = a_m31.z;
        }
        else{
            this._m11 = a_m11; this._m21 = a_m21; this._m31 = a_m31;
            this._m12 = a_m12; this._m22 = a_m22; this._m32 = a_m32;
            this._m13 = a_m13; this._m23 = a_m23; this._m33 = a_m33;
        }
    }
    get m11(){ return this._m11; }   get m12(){ return this._m12; }  get m13(){ return this._m13; }
    get m21(){ return this._m21; }   get m22(){ return this._m22; }  get m23(){ return this._m23; }
    get m31(){ return this._m31; }   get m32(){ return this._m32; }  get m33(){ return this._m33; }
    
    set m11(a_m11){ this._m11 = a_m11; }   set m12(a_m12){ this._m12 = a_m12; }  set m13(a_m13){ this._m13 = a_m13; }
    set m21(a_m21){ this._m21 = a_m21; }   set m22(a_m22){ this._m22 = a_m22; }  set m23(a_m23){ this._m23 = a_m23; }
    set m31(a_m31){ this._m31 = a_m31; }   set m32(a_m32){ this._m32 = a_m32; }  set m33(a_m33){ this._m33 = a_m33; }

    get xAxis(){ return new vec3(this._m11, this._m21, this._m31); }
    get yAxis(){ return new vec3(this._m12, this._m22, this._m32); }
    get zAxis(){ return new vec3(this._m13, this._m23, this._m33); }

    set xAxis(a_v3){ this._m11 = a_v3.x; this._m21 = a_v3.y; this._m31 = a_v3.z; }
    set yAxis(a_v3){ this._m12 = a_v3.x; this._m22 = a_v3.y; this._m32 = a_v3.z; }
    set zAxis(a_v3){ this._m13 = a_v3.x; this._m23 = a_v3.y; this._m33 = a_v3.z; }

    asFloat32Array() {
        return new Float32Array([this._m11, this._m21, this._m31, 
            this._m12, this._m22, this._m23, this._m13, this._m23, this._m33]);
    }
    
    static Identity(){
        return new mat4( 1.0, 0.0, 0.0,
                         0.0, 1.0, 0.0,
                         0.0, 0.0, 1.0);
    }

    neg(){
        return new mat3(
            -this.m11, -this.m21, -this.m31,
            -this.m12, -this.m22, -this.m32,
            -this.m13, -this.m23, -this.m33
        );
    }

    add(a_m3){
        return new mat3(
            this.m11 + a_m3.m11, this.m21 + a_m3.m21, this.m31 + a_m3.m31,
            this.m12 + a_m3.m12, this.m22 + a_m3.m22, this.m32 + a_m3.m32,
            this.m13 + a_m3.m13, this.m23 + a_m3.m23, this.m33 + a_m3.m33
        );
    }

    sub(a_m3){
        return new mat3(
            this.m11 - a_m3.m11, this.m21 - a_m3.m21, this.m31 - a_m3.m31,
            this.m21 - a_m3.m21, this.m22 - a_m3.m22, this.m32 - a_m3.m32,
            this.m31 - a_m3.m31, this.m23 - a_m3.m23, this.m33 - a_m3.m33
        );
    }

    mul(a_val){
        if( a_val instanceof mat3){
            return new mat3(
                this.m11 * a_val.m11 + this.m12 * a_val.m21 + this.m13 * a_val.m31,
                this.m21 * a_val.m11 + this.m22 * a_val.m21 + this.m23 * a_val.m31,
                this.m31 * a_val.m11 + this.m32 * a_val.m21 + this.m33 * a_val.m31,
                this.m11 * a_val.m12 + this.m12 * a_val.m22 + this.m13 * a_val.m32,
                this.m21 * a_val.m12 + this.m22 * a_val.m22 + this.m23 * a_val.m32,
                this.m31 * a_val.m12 + this.m32 * a_val.m22 + this.m33 * a_val.m32,
                this.m11 * a_val.m13 + this.m12 * a_val.m23 + this.m13 * a_val.m33,
                this.m21 * a_val.m13 + this.m22 * a_val.m23 + this.m23 * a_val.m33,
                this.m31 * a_val.m13 + this.m32 * a_val.m23 + this.m33 * a_val.m33
            );
        }
        else if( a_val instanceof vec3){
            return new vec3(this.m11 * a_val.x + this.m12 * a_val.y + this.m13 * a_val.z,
                            this.m21 * a_val.x + this.m22 * a_val.y + this.m23 * a_val.z,
                            this.m31 * a_val.x + this.m32 * a_val.y + this.m33 * a_val.z);
        }
        else{
            return new mat3( this.m11 * a_val, this.m21 * a_val, this.m31 * a_val,
                             this.m12 * a_val, this.m22 * a_val, this.m32 * a_val,
                             this.m13 * a_val, this.m23 * a_val, this.m33 * a_val );
        }
    }

    transpose(){
        var k = this.m12; this.m12 = this.m21; this.m21 = k;
        k = this.m13; this.m13 = this.m31; this.m31 = k;
        k = this.m32; this.m32 = this.m23; this.m23 = k;
    }

    determinant(){
        return (this.m11 * ( this.m22 * this.m33 - this.m23 * this.m32 ) +
                this.m21 * ( this.m32 * this.m13 - this.m12 * this.m33 ) +
                this.m31 * ( this.m12 * this.m23 - this.m22 * this.m13 ) )
    }

    inverse(){
        var fDet = this.determinant();
        if( fDet > 0.0){
            var invDet = 1.0/ fDet;
            var mat = new mat3(this);
            this.m11 = ( mat.m22 * mat.m33 - mat.m32 * mat.m23 ) * invDet;
            this.m21 = ( mat.m31 * mat.m23 - mat.m21 * mat.m33 ) * invDet;
            this.m31 = ( mat.m21 * mat.m32 - mat.m31 * mat.m22 ) * invDet;

            this.m12 = ( mat.m32 * mat.m13 - mat.m12 * mat.m33 ) * invDet;
            this.m22 = ( mat.m11 * mat.m33 - mat.m31 * mat.m13 ) * invDet;
            this.m32 = ( mat.m31 * mat.m12 - mat.m11 * mat.m32 ) * invDet;

            this.m13 = ( mat.m12 * mat.m23 - mat.m22 * mat.m13 ) * invDet;
            this.m23 = ( mat.m21 * mat.m13 - mat.m11 * mat.m23 ) * invDet;
            this.m33 = ( mat.m11 * mat.m22 - mat.m21 * mat.m12 ) * invDet;
        }
        else{
            return false;
        }
    }

    orthonormalize(){
        var xBasis = this.xAxis;
	    var yBasis = this.yAxis;
	    var zBasis = this.zAxis;
	
	    yBasis = yBasis.sub( zBasis.mul(zBasis.dot( yBasis ) ));
	    yBasis.normalize();
	    xBasis = yBasis.cross(zBasis);
	    xBasis.normalize();

        this.xAxis = xBasis;
        this.yAxis = yBasis;
        this.zAxis = zBasis;
    }

    rotateX(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = 1.0; this.m12 = 0.0; this.m13 = 0.0;
        this.m21 = 0.0; this.m22 = co;  this.m23 = si;
        this.m31 = 0.0; this.m32 = -si; this.m33 = co;
    }

    rotateY(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = co;  this.m12 = 0.0; this.m13 = si;
        this.m21 = 0.0; this.m22 = 1.0; this.m23 = 0.0;
        this.m31 = -si; this.m32 = 0.0; this.m33 = co;
    }

    rotateZ(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = co;  this.m12 = -si; this.m13 = 0.0;
        this.m21 = si;  this.m22 =  co; this.m23 = 0.0;
        this.m31 = 0.0; this.m32 = 0.0; this.m33 = 1.0;
    }

    scale(a_v3){
        this.m11 = a_v3.x; this.m12 = 0.0; this.m13 = 0.0;
        this.m21 = 0.0; this.m22 = a_v3.y; this.m23 = 0.0;
        this.m31 = 0.0; this.m32 = 0.0; this.m33 = a_v3.z;
    }

    static lookAt( a_eyePos, a_lookAt, a_worldUp ){
        var m3 = mat3.Identity();
        var vFwd = a_lookAt.sub(a_eyePos);
        vFwd.normalize();
        m3.zAxis = vFwd;
        m3.yAxis = a_worldUp;
        m3.orthonormalize();
        return m3;
    }

}

class mat4{
    constructor( a_m11, a_m21, a_m31, a_m41, a_m12, a_m22, a_m32, a_m42, a_m13, a_m23, a_m33, a_m43, a_m14, a_m24, a_m34, a_m44){
        if( a_m11 instanceof mat4){ //construct from another matrix
            this._m11 = a_m11.m11; this._m21 = a_m11.m21; this._m31 = a_m11.m31; this._m41 = a_m11.m41;
            this._m12 = a_m11.m12; this._m22 = a_m11.m22; this._m32 = a_m11.m32; this._m42 = a_m11.m42;
            this._m13 = a_m11.m13; this._m23 = a_m11.m23; this._m33 = a_m11.m33; this._m43 = a_m11.m43;
            this._m14 = a_m11.m14; this._m24 = a_m11.m24; this._m34 = a_m11.m34; this._m44 = a_m11.m44;
        }else if( a_m11 instanceof mat3){ //construct from another matrix
            this._m11 = a_m11.m11; this._m21 = a_m11.m21; this._m31 = a_m11.m31; this._m41 = 0.0;
            this._m12 = a_m11.m12; this._m22 = a_m11.m22; this._m32 = a_m11.m32; this._m42 = 0.0;
            this._m13 = a_m11.m13; this._m23 = a_m11.m23; this._m33 = a_m11.m33; this._m43 = 0.0;
            this._m14 = 0.0;       this._m24 = 0.0;       this._m34 = 0.0;       this._m44 = 1.0;
        }else if( a_m11 instanceof vec4 ){ //construct from three vectors
            this._m11 = a_m11.x; this._m21 = a_m11.y; this._m31 = a_m11.z; this._m41 = a_m11.w;
            this._m12 = a_m21.x; this._m22 = a_m21.y; this._m32 = a_m21.z; this._m42 = a_m21.w;
            this._m13 = a_m31.x; this._m23 = a_m31.y; this._m33 = a_m31.z; this._m43 = a_m31.w;
            this._m14 = a_m41.x; this._m24 = a_m41.y; this._m34 = a_m41.z; this._m44 = a_m41.w;
        }else if( a_m11 instanceof vec3 ){ //construct from three vectors
            this._m11 = a_m11.x; this._m21 = a_m11.y; this._m31 = a_m11.z; this._m41 = 0.0;
            this._m12 = a_m21.x; this._m22 = a_m21.y; this._m32 = a_m21.z; this._m42 = 0.0;
            this._m13 = a_m31.x; this._m23 = a_m31.y; this._m33 = a_m31.z; this._m43 = 0.0;
            this._m14 = 0.0;     this._m24 = 0.0;     this._m34 = 0.0;     this._m44 = 1.0;
        }
        else{
            this._m11 = a_m11; this._m21 = a_m21; this._m31 = a_m31; this._m41 = a_m41;
            this._m12 = a_m12; this._m22 = a_m22; this._m32 = a_m32; this._m42 = a_m42;
            this._m13 = a_m13; this._m23 = a_m23; this._m33 = a_m33; this._m43 = a_m43;
            this._m14 = a_m14; this._m24 = a_m24; this._m34 = a_m34; this._m44 = a_m44;
        }
    }
    get m11(){ return this._m11; }   get m12(){ return this._m12; }  get m13(){ return this._m13; } get m14(){ return this._m14; }
    get m21(){ return this._m21; }   get m22(){ return this._m22; }  get m23(){ return this._m23; } get m24(){ return this._m24; }
    get m31(){ return this._m31; }   get m32(){ return this._m32; }  get m33(){ return this._m33; } get m34(){ return this._m34; }
    get m41(){ return this._m41; }   get m42(){ return this._m42; }  get m43(){ return this._m43; } get m44(){ return this._m44; }
    
    set m11(a_m11){ this._m11 = a_m11; }   set m12(a_m12){ this._m12 = a_m12; }  set m13(a_m13){ this._m13 = a_m13; } set m14(a_m14){ this._m14 = a_m14; }
    set m21(a_m21){ this._m21 = a_m21; }   set m22(a_m22){ this._m22 = a_m22; }  set m23(a_m23){ this._m23 = a_m23; } set m24(a_m24){ this._m24 = a_m24; }
    set m31(a_m31){ this._m31 = a_m31; }   set m32(a_m32){ this._m32 = a_m32; }  set m33(a_m33){ this._m33 = a_m33; } set m34(a_m34){ this._m34 = a_m34; }
    set m41(a_m41){ this._m41 = a_m41; }   set m42(a_m42){ this._m42 = a_m42; }  set m43(a_m43){ this._m43 = a_m43; } set m44(a_m44){ this._m44 = a_m44; }

    get xAxis(){ return new vec4(this._m11, this._m21, this._m31, this._m41); }
    get yAxis(){ return new vec4(this._m12, this._m22, this._m32, this._m42); }
    get zAxis(){ return new vec4(this._m13, this._m23, this._m33, this._m43); }
    get translation(){ return new vec4(this._m14, this._m24, this._m34, this._m44); }

    set xAxis(a_v4){ this._m11 = a_v4.x; this._m21 = a_v4.y; this._m31 = a_v4.z; this._m41 = a_v4.w; }
    set yAxis(a_v4){ this._m12 = a_v4.x; this._m22 = a_v4.y; this._m32 = a_v4.z; this._m42 = a_v4.w; }
    set zAxis(a_v4){ this._m13 = a_v4.x; this._m23 = a_v4.y; this._m33 = a_v4.z; this._m43 = a_v4.w; }
    set translation(a_v4){ this._m14 = a_v4.x; this._m24 = a_v4.y; this._m34 = a_v4.z; this._m44 = a_v4.w; }

    asFloat32Array() {
        return new Float32Array([this._m11, this._m21, this._m31, this._m41, 
                                 this._m12, this._m22, this._m32, this._m42, 
                                 this._m13, this._m23, this._m33, this._m43,
                                 this._m14, this._m24, this._m34, this._m44]);
    }
    
    static Identity(){
        return new mat4( 1.0, 0.0, 0.0, 0.0,
                         0.0, 1.0, 0.0, 0.0,
                         0.0, 0.0, 1.0, 0.0,
                         0.0, 0.0, 0.0, 1.0);
    }

    neg(){
        return new mat4(
            -this.m11, -this.m21, -this.m31, -this.m41,
            -this.m12, -this.m22, -this.m32, -this.m42,
            -this.m13, -this.m23, -this.m33  -this.m43,
            -this.m14, -this.m24, -this.m34  -this.m44
        );
    }

    add(a_m4){
        return new mat4(
            this.m11 + a_m4.m11, this.m21 + a_m4.m21, this.m31 + a_m4.m31, this.m41 + a_m4.m41,
            this.m12 + a_m4.m12, this.m22 + a_m4.m22, this.m32 + a_m4.m32, this.m42 + a_m4.m42,
            this.m13 + a_m4.m13, this.m23 + a_m4.m23, this.m33 + a_m4.m33, this.m43 + a_m4.m43,
            this.m14 + a_m4.m14, this.m24 + a_m4.m24, this.m34 + a_m4.m34, this.m44 + a_m4.m44
        );
    }

    sub(a_m4){
        return new mat4(
            this.m11 - a_m4.m11, this.m21 - a_m4.m21, this.m31 - a_m4.m31, this.m41 - a_m4.m41,
            this.m12 - a_m4.m12, this.m22 - a_m4.m22, this.m32 - a_m4.m32, this.m42 - a_m4.m42,
            this.m13 - a_m4.m13, this.m23 - a_m4.m23, this.m33 - a_m4.m33, this.m43 - a_m4.m43,
            this.m14 - a_m4.m14, this.m24 - a_m4.m24, this.m34 - a_m4.m34, this.m44 - a_m4.m44
        );
    }

    mul(a_val){
        if( a_val instanceof mat4){
            return new mat4(
                this.m11 * a_val.m11 + this.m12 * a_val.m21 + this.m13 * a_val.m31 + this.m14 * a_val.m41,
                this.m21 * a_val.m11 + this.m22 * a_val.m21 + this.m23 * a_val.m31 + this.m24 * a_val.m41,
                this.m31 * a_val.m11 + this.m32 * a_val.m21 + this.m33 * a_val.m31 + this.m34 * a_val.m41,
                this.m41 * a_val.m11 + this.m42 * a_val.m21 + this.m43 * a_val.m31 + this.m44 * a_val.m41,

                this.m11 * a_val.m12 + this.m12 * a_val.m22 + this.m13 * a_val.m32 + this.m14 * a_val.m42,
                this.m21 * a_val.m12 + this.m22 * a_val.m22 + this.m23 * a_val.m32 + this.m24 * a_val.m42,
                this.m31 * a_val.m12 + this.m32 * a_val.m22 + this.m33 * a_val.m32 + this.m34 * a_val.m42,
                this.m41 * a_val.m12 + this.m42 * a_val.m22 + this.m43 * a_val.m32 + this.m44 * a_val.m42,

                this.m11 * a_val.m13 + this.m12 * a_val.m23 + this.m13 * a_val.m33 + this.m14 * a_val.m43,
                this.m21 * a_val.m13 + this.m22 * a_val.m23 + this.m23 * a_val.m33 + this.m24 * a_val.m43,
                this.m31 * a_val.m13 + this.m32 * a_val.m23 + this.m33 * a_val.m33 + this.m34 * a_val.m43,
                this.m41 * a_val.m13 + this.m42 * a_val.m23 + this.m43 * a_val.m33 + this.m44 * a_val.m43,

                this.m11 * a_val.m14 + this.m12 * a_val.m24 + this.m13 * a_val.m34 + this.m14 * a_val.m44,
                this.m21 * a_val.m14 + this.m22 * a_val.m24 + this.m23 * a_val.m34 + this.m24 * a_val.m44,
                this.m31 * a_val.m14 + this.m32 * a_val.m24 + this.m33 * a_val.m34 + this.m34 * a_val.m44,
                this.m41 * a_val.m14 + this.m42 * a_val.m24 + this.m43 * a_val.m34 + this.m44 * a_val.m44,
            );
        }
        else if( a_val instanceof vec4){
            return new vec4(this.m11 * a_val.x + this.m12 * a_val.y + this.m13 * a_val.z + this.m14 * a_val.w,
                            this.m21 * a_val.x + this.m22 * a_val.y + this.m23 * a_val.z + this.m24 * a_val.w,
                            this.m31 * a_val.x + this.m32 * a_val.y + this.m33 * a_val.z + this.m34 * a_val.w,
                            this.m41 * a_val.x + this.m42 * a_val.y + this.m43 * a_val.z + this.m44 * a_val.w);
        }
        else{
            return new mat4( this.m11 * a_val, this.m21 * a_val, this.m31 * a_val, this.m41 * a_val,
                             this.m12 * a_val, this.m22 * a_val, this.m32 * a_val, this.m42 * a_val,
                             this.m13 * a_val, this.m23 * a_val, this.m33 * a_val, this.m43 * a_val,
                             this.m14 * a_val, this.m24 * a_val, this.m34 * a_val, this.m44 * a_val, );
        }
    }

    transpose(){
        var k = this.m12; this.m12 = this.m21; this.m21 = k;
        k = this.m13; this.m13 = this.m31; this.m31 = k;
        k = this.m32; this.m32 = this.m23; this.m23 = k;
    }

    determinant(){
        return (this.m11 * ( this.m22 * this.m33 - this.m23 * this.m32 ) +
                this.m21 * ( this.m32 * this.m13 - this.m12 * this.m33 ) +
                this.m31 * ( this.m12 * this.m23 - this.m22 * this.m13 ) )
    }

    inverse(){
        var fDet = this.determinant();
        if( fDet > 0.0){
            var invDet = 1.0/ fDet;
            var mat = new mat4(this);
            this.m11 = ( mat.m22 * mat.m33 - mat.m32 * mat.m23 ) * invDet;
            this.m21 = ( mat.m31 * mat.m23 - mat.m21 * mat.m33 ) * invDet;
            this.m31 = ( mat.m21 * mat.m32 - mat.m31 * mat.m22 ) * invDet;
            this.m41 = 0.0;

            this.m12 = ( mat.m32 * mat.m13 - mat.m12 * mat.m33 ) * invDet;
            this.m22 = ( mat.m11 * mat.m33 - mat.m31 * mat.m13 ) * invDet;
            this.m32 = ( mat.m31 * mat.m12 - mat.m11 * mat.m32 ) * invDet;
            this.m42 = 0.0;

            this.m13 = ( mat.m12 * mat.m23 - mat.m22 * mat.m13 ) * invDet;
            this.m23 = ( mat.m21 * mat.m13 - mat.m11 * mat.m23 ) * invDet;
            this.m33 = ( mat.m11 * mat.m22 - mat.m21 * mat.m12 ) * invDet;
            this.m43 = 0.0;

            this.m14 = (mat.m12 * (mat.m33 * mat.m24 - mat.m23 * mat.m34) +
				        mat.m22 * (mat.m13 * mat.m34 - mat.m33 * mat.m14) +
				        mat.m32 * (mat.m23 * mat.m14 - mat.m13 * mat.m24)) * invDet;
		    this.m24 = (mat.m11 * (mat.m23 * mat.m34 - mat.m33 * mat.m24) +
				        mat.m21 * (mat.m33 * mat.m14 - mat.m13 * mat.m34) +
				        mat.m31 * (mat.m13 * mat.m24 - mat.m23 * mat.m14)) * invDet;
		    this.m34 = (mat.m11 * (mat.m32 * mat.m24 - mat.m22 * mat.m34) +
				        mat.m21 * (mat.m12 * mat.m34 - mat.m32 * mat.m14) +
				        mat.m31 * (mat.m22 * mat.m14 - mat.m12 * mat.m24)) * invDet;
		    this.m44 = 1.0;
        }
        else{
            return false;
        }
    }

    rotateX(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = 1.0; this.m12 = 0.0; this.m13 = 0.0; this.m14 = 0.0;
        this.m21 = 0.0; this.m22 = co;  this.m23 = si;  this.m24 = 0.0;
        this.m31 = 0.0; this.m32 = -si; this.m33 = co;  this.m34 = 0.0;
        this.m41 = 0.0; this.m42 = 0.0; this.m43 = 0.0; this.m44 = 1.0;
    }

    rotateY(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = co;  this.m12 = 0.0; this.m13 = si; this.m14 = 0.0;
        this.m21 = 0.0; this.m22 = 1.0; this.m23 = 0.0; this.m24 = 0.0;
        this.m31 = -si; this.m32 = 0.0; this.m33 = co; this.m34 = 0.0;
        this.m41 = 0.0; this.m43 = 0.0; this.m43 = 0.0; this.m44 = 1.0;
    }

    rotateZ(angle){
        var co = Math.cos(angle);
        var si = Math.sin(angle);
        this.m11 = co;  this.m12 = -si; this.m13 = 0.0; this.m14 = 0.0;
        this.m21 = si;  this.m22 =  co; this.m23 = 0.0; this.m24 = 0.0;
        this.m31 = 0.0; this.m32 = 0.0; this.m33 = 1.0; this.m34 = 0.0;
        this.m41 = 0.0; this.m42 = 0.0; this.m43 = 0.0; this.m44 = 1.0;
    }

    scale(a_v3){
        this.m11 = a_v3.x; this.m12 = 0.0;    this.m13 = 0.0;    this.m14 = 0.0;
        this.m21 = 0.0;    this.m22 = a_v3.y; this.m23 = 0.0;    this.m24 = 0.0;
        this.m31 = 0.0;    this.m32 = 0.0;    this.m33 = a_v3.z; this.m34 = 0.0;
        this.m41 = 0.0;    this.m42 = 0.0;    this.m43 = 0.0;    this.m44 = 1.0;
    }

    orthonormalize(){
        var xBasis = this.xAxis;
	    var yBasis = this.yAxis;
	    var zBasis = this.zAxis;
	
	    yBasis = yBasis.sub( zBasis.mul(zBasis.dot( yBasis ) ));
	    yBasis.normalize();
	    xBasis = yBasis.cross(zBasis);
	    xBasis.normalize();

        this.xAxis = xBasis;
        this.yAxis = yBasis;
        this.zAxis = zBasis;
    }

    projection( a_fov, a_aspect, a_zNear, a_zFar){
        var cotan = 1.0 / Math.tan(a_fov * 0.5);
        if( Math.abs( a_zFar-a_zNear ) > 0.01 )
        {
            var h = cotan;
            var w = h/a_aspect;	
            var r = 1.0/(a_zFar-a_zNear);
            
            this.m11 =   w; this.m21 = 0.0; this.m31 = 0.0;                     this.m41 =  0.0;
            this.m12 = 0.0; this.m22 =   h; this.m32 =  0.0;                    this.m42 =  0.0;
            this.m13 = 0.0; this.m23 = 0.0; this.m33 = -(a_zFar+a_zNear)*r;     this.m43 = -1.0;
            this.m14 = 0.0; this.m24 = 0.0; this.m34 = -(2.0*a_zFar*a_zNear)*r; this.m44 =  0.0;
        }
    }

    orthographic(a_left, a_right, a_top, a_bottom, a_near, a_far){
        var deltaX = a_right - a_left;
        var deltaY = a_top - a_bottom;
        var deltaZ = a_far - a_near;

        this.m11 = 2.0/deltaX;  this.m21 = 0.0;         this.m31 = 0.0;         this.m41 = 0.0;
        this.m12 = 0.0;         this.m22 = 2.0/deltaY;  this.m32 = 0.0;         this.m42 = 0.0;
        this.m13 = 0.0;         this.m23 = 0.0;         this.m33 = -2.0/deltaZ; this.m43 = 0.0;
        
        this.m14 = -((a_right + a_left)/deltaX);
        this.m24 = -((a_top + a_bottom)/deltaY);
        this.m34 = -((a_far + a_near)/deltaZ);
        this.m44 = 1.0;
    }

    /**
     * This function mimics the gluLookAt function found here https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/gluLookAt.xml
     * This function returns a view matrix (the inverse of the camera matrix)
     * @param {vec4} a_eyePos - position of the viewer, camera in the world space
     * @param {vec4} a_lookAt - the location that we wish to look at
     * @param {vec4} a_worldUp - the relative up direction of the world in relation to the camera, or the direction you want up to be.
     */
    static lookAt( a_eyePos, a_lookAt, a_worldUp ){
        var m4 = mat4.Identity();
        //as this is the view matrix it's not the vector from the eye to the lookat point we want it's the reverse of this
        //transforming from world space to viewspace.
        var vFwd = a_eyePos.sub(a_lookAt);
        vFwd.normalize();
        m4.zAxis = vFwd;
        m4.yAxis = a_worldUp;
        m4.translation = a_eyePos;
        m4.orthonormalize();
        m4.inverse();
        return m4;
    }

}