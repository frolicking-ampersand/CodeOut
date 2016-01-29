
var app = angular.module('molboard', []);
app.controller('mainController', function ($scope, $http) {
  $scope.canvas = document.getElementById("canvas");
  $scope.context = canvas.getContext('2d');
  $scope.savedData = new Image();
  $scope.savedPic = new Image();
  console.log($scope.canvas);
  $scope.radius = 10;
  $scope.dragging = false;

  $scope.canvas.width = 500;
  $scope.canvas.height = 500;

  $scope.putPoint = function(e){
    if ($scope.dragging){
      $scope.context.beginPath();
      $scope.context.arc(e.clientX, e.clientY, $scope.radius, 0, Math.PI*2);
      $scope.context.fill();
    }
  }

  $scope.engage = function(){
    $scope.dragging = true;
  }

  $scope.disengage = function(){
    $scope.dragging = false;
  }

  canvas.addEventListener('mousedown', $scope.engage);
  canvas.addEventListener('mouseup', $scope.disengage);
  canvas.addEventListener('mousemove', $scope.putPoint);
  $scope.saveCanvas = function(){
    $scope.savedData.src = $scope.canvas.toDataURL('image/png');
    console.log($scope.savedData.src);
    //savedData = $scope.context.getImageData(0, 0, 500, 500);
    $http.post('/api/boards', [ $scope.savedData.src])
      .success(function (data) {
        console.log(data);
      });
  }
//   $scope.longstring = "data:image/png;base64,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
// "

  $scope.restore = function(){
    // console.log($scope.savedData.src);
    $scope.context.clearRect(0, 0, 500, 500);
    $http.get('/api/boards')
      .success(function (data) {
        console.log(data);
        $scope.savedPic.src = data;
        $scope.context.drawImage($scope.savedPic,0,0);
      });
    //$scope.context.drawImage($scope.longstring,0,0);

    //$scope.context.putImageData(savedData,0,0);
  }


});
