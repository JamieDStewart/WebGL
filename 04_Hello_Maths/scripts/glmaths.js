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
     sub( a_val){ if( a_val instanceof vec4){ return new vec3( this.x - a_val.x, this.y - a_val.y, this.z - a_val.z, this.w - a_val.w); }else{ return new vec4( this.x - a_val, this.y - a_val, this.z - a_val, this.w - a_val); } }
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
        this._m11 = a_m11; this._m21 = a_m21; this._m31 = a_m31;
        this._m12 = a_m12; this._m22 = a_m22; this._m32 = a_m32;
        this._m13 = a_m13; this._m23 = a_m23; this._m33 = a_m33;
    }
    get m11(){ return this._m11; }   get m12(){ return this._m12; }  get m13(){ return this._m13; }
    get m21(){ return this._m21; }   get m22(){ return this._m22; }  get m23(){ return this._m23; }
    get m31(){ return this._m31; }   get m32(){ return this._m32; }  get m33(){ return this._m33; }
    
    set m11(a_m11){ this._m11 = a_m11; }   set m12(a_m12){ this._m12 = a_m12; }  set m13(a_m13){ this._m13 = a_m13; }
    set m21(a_m21){ this._m21 = a_m21; }   set m22(a_m22){ this._m22 = a_m22; }  set m23(a_m23){ this._m23 = a_m23; }
    set m31(a_m31){ this._m31 = a_m31; }   set m32(a_m32){ this._m32 = a_m32; }  set m33(a_m33){ this._m33 = a_m33; }

    get xAxis(){ return new Array([this._m11, this.m_21, this._m31]); }
    get yAxis(){ return new Array([this._m12, this.m_22, this._m32]); }
    get zAxis(){ return new Array([this._m13, this.m_23, this._m33]); }

    set xAxis(a_v3){ this._m11 = a_v3.x; this._m21 = a_v3.y; this._m31 = a_v3.z; }
    set yAxis(a_v3){ this._m12 = a_v3.x; this._m22 = a_v3.y; this._m32 = a_v3.z; }
    set zAxis(a_v3){ this._m13 = a_v3.x; this._m23 = a_v3.y; this._m33 = a_v3.z; }

    asFloat32Array() {
        return new Float32Array([this._m11, this._m21, this._m31, 
            this._m12, this._m22, this._m23, this._m13, this._m23, this._m33]);
    }
    
    identity(){
        this.m11 = 1.0; this.m12 = 0.0; this.m13 = 0.0;
        this.m21 = 0.0; this.m22 = 1.0; this.m23 = 0.0;
        this.m31 = 0.0; this.m32 = 0.0; this.m33 = 1.0;
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
            this.m12 + a_m3.m12, this.m22 + a_m3.m22, this.m23 + a_m3.m32,
            this.m13 + a_m3.m13, this.m23 + a_m3.m23, this.m33 + a_m3.m33
        );
    }

    sub(a_m3){
        return new mat3(
            this.m11 - a_m3.m11, this.m12 - a_m3.m12, this.m13 - a_m3.m13,
            this.m21 - a_m3.m21, this.m22 - a_m3.m22, this.m23 - a_m3.m23,
            this.m31 - a_m3.m31, this.m32 - a_m3.m32, this.m33 - a_m3.m33
        );
    }

    mul(a_m3){
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
            return new mat3( this.m11 * a_m3, this.m12 * a_m3, this.m13 * a_m3,
                             this.m21 * a_m3, this.m22 * a_m3, this.m23 * a_m3,
                             this.m31 * a_m3, this.m32 * a_m3, this.m33 * a_m3 );
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
        var fDet = determinant();
        if( fDet > 0.0){
            var invDet = 1.0/ fDet;
            
        }
        else{
            return false;
        }
    }


}