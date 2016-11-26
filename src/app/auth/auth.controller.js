export class AuthController {
  constructor ($http, $state, $q, toastr, $localStorage, envService) {
    'ngInject';

    var self = this;

    self.backGroundStyle = ()=>{
      return {
        'background-selling':$state.includes('selling'),
        'background-supply':$state.includes('supply'),
        'background-tasks':$state.includes('tasks'),
        'background-staff':$state.includes('staff'),
        'background-payments':$state.includes('payments'),
        'background-other':$state.includes('other')
      }
    };
    console.log('auth controller');

    // $http({
    //   url : envService.read('apiUrl')+"api/signup",
    //   method : "POST",
    //   data : {
    //     email : 'ticketmirusdesk@gmail.com',
    //     name : 'John Silver',
    //     password : '1',
    //     idToEnter: '25AU17',
    //     telephone: '+77017217306',
    //     role: 1
    //   }
    // }).then(function successCallback(response) {
    //
    //   console.error(response);
    //   console.log(response);
    // }, function errorCallback(response) {
    //   console.log(response);
    // });


    console.log(envService.read('apiUrl'));


    self.auth = ()=>{

      // login
      $http({
        url : envService.read('apiUrl')+"auth/api/login",
        method : "POST",
        data : {
          idToEnter : self.idToEnter,
          password : self.password
        }
      }).then(function successCallback(response) {
        console.log(response);

        $localStorage.user = response.data;
        $state.go('tasksList');
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
