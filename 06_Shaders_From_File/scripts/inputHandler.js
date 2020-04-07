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

//mouse handler
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