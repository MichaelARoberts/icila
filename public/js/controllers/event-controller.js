var eventApp = angular.module('eventApp', ['ngAnimate'])

eventApp.directive("ngFileSelect", function() {
  return {
    link: function($scope, el) {

      el.bind("change", function(e) {

        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })

    }

  }
})

eventApp.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

eventApp.factory('EventSearch', function($http) {

  var EventSearch = {
    getEvents: function() {
      return $http.get("/api/v1/events").then(function(res) {
        return res.data
      })
    }
  }

  return EventSearch
})

eventApp.controller('singleEventCtrl', function($scope, $http, $location) {

  var url = $location.$$absUrl
  param = url.split("/").pop(-1)

  $http.get('/api/v1/events/' + param).then(function(res) {
    $scope.event = res.data
  })

})

eventApp.controller('searchEventsCtrl', function($scope, EventSearch) {

  EventSearch.getEvents().then(function(data) {
    $scope.events = data
  })


})

eventApp.controller('createEventCtrl', function($scope, $http, fileReader) {

  $scope.getFile = function() {
    $scope.progress = 0;
    fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
      $scope.imageSrc = result;
    });
  };

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

  $scope.createEvent = function() {
    var fd = new FormData()
    var file = $scope.eventImage

    fd.append('name', $scope.eventName)
    fd.append('desc', $scope.eventDesc)
    fd.append('img', file)
    fd.append('content', $scope.eventContent)
    fd.append('location', $scope.eventLocation)
    fd.append('event_date', $scope.eventDate)
    fd.append('creator', $scope.eventCreator)
    fd.append('zip', $scope.eventZip)
    fd.append('tags', $scope.eventTags)


    console.log(file)

    $http.post('/api/v1/events', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    })
  }

})