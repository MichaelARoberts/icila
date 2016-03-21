var eventApp = angular.module('eventApp',['ngAnimate'])

eventApp.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){

      el.bind("change", function(e){

        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })

    }

  }
})

eventApp.factory('EventSearch', function($http){

  var EventSearch = {
    getEvents: function() {
      return $http.get("/api/v1/events").then(function(res){
         return res.data
      })
    }
  }

  return EventSearch
})

eventApp.controller('singleEventCtrl', function($scope, $http, $location){

  var url = $location.$$absUrl
  param = url.split("/").pop(-1)

  $http.get('/api/v1/events/' + param).then(function(res){
    $scope.event = res.data
  })

})

eventApp.controller('searchEventsCtrl', function($scope, EventSearch){

  EventSearch.getEvents().then(function(data){
    $scope.events = data
  })


})

eventApp.controller('createEventCtrl', function($scope, $http, fileReader) {

  console.log(fileReader)
  $scope.getFile = function () {
      $scope.progress = 0;
      fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
        $scope.imageSrc = result;
      });
  };

  $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
  });

})
