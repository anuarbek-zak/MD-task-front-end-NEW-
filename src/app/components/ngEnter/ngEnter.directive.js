export function NgEnterDirective($compile) {
    'ngInject';
    return {
      link:function ($scope,element,attrs) {
          console.log('LINK');
          var map = {13: false, 17: false};
          element.keydown(function(e) {
              if (e.keyCode in map) {
                  map[e.keyCode] = true;
                  if (map[13] && map[17]) {
                      console.log(element.val());
                      $scope.vm.sendComment(element.val());
                      element.val("");
                      $scope.$apply();
                      event.preventDefault();
                  }
              }
          }).keyup(function(e) {
              if (e.keyCode in map) {
                  map[e.keyCode] = false;
              }
          })
      }
    };
}
