// get drag bound function
var dragBoundFunc = rect1.dragBoundFunc();

// create vertical drag and drop
rect1.dragBoundFunc(function(pos){
  // important pos - is absolute position of the node
  // you should return absolute position too
  return {
    x: this.absolutePosition().x,
    y: pos.y
  };
});