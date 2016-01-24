var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var putPoint = function(e){
  if (dragging){
    context.beginPath();
    context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    context.fill();
  }
}

var engage = function(){
  dragging = true;
}

var disengage = function(){
  dragging = false;
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mousemove', putPoint);
var saveCanvas = function(){
  console.log(canvas.toDataURL());
}