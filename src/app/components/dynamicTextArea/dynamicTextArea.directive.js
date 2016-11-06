
export function DynamicTextArea($compile) {
  'ngInject';

  return {
    scope: { ngModel: '=' },
    require: "?ngModel",
    link: function(scope, elt, attrs, ngModel) {
      var tmpModel = false;
      var origHeight = elt.css('height');
      var height = elt.css('height');
      var heightChangeIndex = 0;
      scope.$watch('ngModel', function() {
        if (elt.css('height') > origHeight && !heightChangeIndex) {
          heightChangeIndex = scope.ngModel.length;
        }
        else if (elt.css('height') <= origHeight && elt.is(':focus')) {
          heightChangeIndex = 0;
        }
      });

    }
  };
}
