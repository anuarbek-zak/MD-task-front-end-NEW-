export class AuthController {
  constructor ($http, $state, $q, toastr, $localStorage, envService) {
    'ngInject';

    var self = this;

    self.backGroundStyle = ()=>{
      return {
        'background-selling':$state.includes('selling'),
        'background-supply':$state.includes('supply'),
        'background-staff':$state.includes('staff'),
        'background-payments':$state.includes('payments'),
        'background-other':$state.includes('other')
      }
    };
    console.log('auth controller');

    $http({
      url : "http://localhost:8080/api/signup",
      method : "POST",
      data : {
        email : 'aleckseypro@mail.ru',
        name : 'Alex Petrov',
        password : '123456'
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });


    console.log(envService.read('apiUrl'));


    self.auth = ()=>{

      // login
      $http({
        url : envService.read('apiUrl')+"api/login",
        method : "POST",
        data : {
          idToEnter : self.idToEnter,
          password : self.password
        }
      }).then(function successCallback(response) {
        console.log(response);

        $localStorage.user = response.data;
        $state.go('selling');
      }, function errorCallback(response) {
        console.log(response);
        console.log('open toastr');
        toastr.error('Ошибка авторизации', 'Ошибка!');
      });
    };
    console.log(self);
    console.log('auth controller');

  }


}
