var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var savedData = '';

var radius = 10;
var dragging = false;

canvas.width = 500;
canvas.height = 500;
copy.height = 500;
copy.width = 500;

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
  savedData = context.getImageData(0, 0, 500, 500);
}
var restore = function(){
  console.log(savedData);
  context.clearRect(0, 0, 500, 500);
  context.putImageData(savedData,0,0);

}


