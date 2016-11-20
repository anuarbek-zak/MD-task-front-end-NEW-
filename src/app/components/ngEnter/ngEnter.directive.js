export function NgEnterDirective($compile) {
    'ngInject';

    return {
      link:function (scope,element,attrs) {
          console.log('LINK');
          element.on("keydown", function (event) {
              if (event.keyCode === 13) {
                    console.log("NAZHALj");
                  event.preventDefault();
              }
          });
      }
    };
}
