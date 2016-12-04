export  class CheckAuthService{

  constructor ($injector, $localStorage, $state){
    'ngInject';
    var self = this;
    // $localStorage.user = {_id:"583404cf6938430afbbb576e"};
    this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
      //var $scope = $injector.get('$rootScope'),
      //  $sessionStorage = $injector.get('$sessionStorage');


      if (toState.data !== undefined) {
        if (toState.data.noLogin !== undefined && toState.data.noLogin) {
          // если нужно, выполняйте здесь какие-то действия
          // перед входом без авторизации

          if ($localStorage.user!=undefined) {
            if (toState.name == 'auth') {
              event.preventDefault();
              $state.go('tasks');
            }
          }

        }
      } else {
        // вход с авторизацией
        if ($localStorage.user) {

          return;


        } else {
          // если пользователь не авторизован - отправляем на страницу авторизации
          event.preventDefault();
          $state.go('auth');
        }
      }
    };

    this.logout = function(){
      delete $localStorage.user;
      $state.go('auth');

    }


  }
}
