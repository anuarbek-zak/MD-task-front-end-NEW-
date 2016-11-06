export class SettingsController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state, envService){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    var vm = this;
    vm.logout = CheckAuthService.logout;

    this.getUser = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/settings/user?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log(response);

        vm.user = response.data;
      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.saveUser = ()=>{
      let userId = this.$localStorage.user._id;
      let user = {
        userId,
        representative: vm.user.representative,
        telephone: vm.user.telephone,
        email: vm.user.email
      }
      $http({
        url : envService.read('apiUrl')+"api/settings/user",
        method : "POST",
        data : user
      }).then(function successCallback(response) {
        console.log(response);
        toastr.success('Настройки сохранены.', 'Обновлены!');
        if (response.data.status == 200){

        }
      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.getSettings = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/settings?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log(response);

        vm.settings = response.data;
      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.saveSettings = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/settings",
        method : "POST",
        data : {userId, copyToEmail: this.settings.copyToEmail, sendSMSAfterFihish: this.settings.sendSMSAfterFihish}
      }).then(function successCallback(response) {
        console.log(response);
        toastr.success('Настройки сохранены.', 'Обновлены!');
        if (response.data.status == 200){

        }
      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.changePassword = ()=>{
      let userId = this.$localStorage.user._id;
      if (vm.newPassword&&vm.newPassword==vm.repeatNewPassword) {

        $http({
          url: envService.read('apiUrl') + "api/changePassword",
          method: "POST",
          data: {userId, password: this.password, newPassword: this.newPassword}
        }).then(function successCallback(response) {
          console.log(response);
          toastr.success('Пароль изменен.');
        }, function errorCallback(response) {
          console.log('Ошибка запроса');
        });
      }else {
        toastr.error('Новый пароль и его повтор не совпадают');
      }
    };

    this.getSettings();
    this.getUser();
  }


}
