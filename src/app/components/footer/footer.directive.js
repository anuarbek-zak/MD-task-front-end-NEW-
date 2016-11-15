export function FooterDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/footer/footer.html',
    controller: FooterController,
    controllerAs: 'vvm',
    // bindToController: true
  };

  return directive;
}

class FooterController {
  constructor ($http, envService, $state) {
    'ngInject';
    // /api/document/count/all
    var self = this;
    self.counter = 0;
    self.$state = $state;


      // login
    $http({
      url : envService.read('apiUrl')+"api/ticket/count",
      method : "GET"
    }).then(function successCallback(response) {
        console.log(response);

        if (response.data.status  == 200){
          self.counter = response.data.count;

        }
      }, function errorCallback(response) {
        console.error('ошибка запроса '+this.envService.read('apiUrl')+"api/ticket/count")
      });


  }
}
