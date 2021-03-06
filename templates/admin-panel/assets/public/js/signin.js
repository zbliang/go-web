var app = angular.module('Signin',[])
.directive('btnSubmit', function(){
  return function(scope, element, attrs){
    scope.$watch(function(){
      return scope.$eval(attrs.btnSubmit);
    },
    function(working){
      var el = $(element).button();
      if(working) el.button('loading');
      else el.button('reset');
    });
  }
});
Signin.$inject = ['$scope','$http'];
function Signin($scope, $http) {
  $scope.user = {};
  $scope.close = function() {
    $scope.error = '';
  }
  $scope.update = function(user) {
    $scope.close();
    $scope.working = true;
    $scope.user = angular.copy(user);
    $http.post('signin.json', user).
      success(function(data){
        if(data.Ok){
          window.location.replace('u/');
        } else {
          $scope.error = data.Error;
        }
        $scope.working = false;
      }).
      error(function(data,status){
        alert('HTTP '+status+': '+data);
        $scope.working = false;
      });
  }
}
