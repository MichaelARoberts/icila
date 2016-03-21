var imageApp = angular.module('imageApp',[])

imageApp.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){

      el.bind("change", function(e){

        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })

    }

  }
})

imageApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


imageApp.controller('imageSearchCtrl', function($scope, $http){

  $http.get('/api/v1/images').then(function(res){
      $scope.images = res.data
  })

})

imageApp.controller('imageUploadCtrl', function($scope, $http, fileReader){

  $scope.getFile = function () {
      $scope.progress = 0;
      fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
        $scope.imageSrc = result;
      });
  };

  $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
  });



  $scope.uploadImage = function(){

    var file = $scope.imageFile
    console.log('file is ')
    console.dir(file)

    var fd = new FormData()
    fd.append('img', file)
    fd.append('title', $scope.imageTitle)
    fd.append('caption', $scope.imageCaption)
    fd.append('zip', $scope.imageZip)
    fd.append('tags', $scope.imageTags)

    $http.post('/api/v1/images', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': 'multipart/form-data'}
    })

  }

})
