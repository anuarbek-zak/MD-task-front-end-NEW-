export function NgEnterDirective($compile) {
    'ngInject';
    var ENTERCODE = 13;
    return {
      link:function ($scope,element,attrs) {
          console.log('LINK');
          element.on("keydown", function (event) {
              if (event.keyCode === ENTERCODE) {
                  $scope.vm.sendComment(element.val());
                  element.val("");
                  $scope.$apply();
                  event.preventDefault();
              }
          });
      }
    };
}
