export class HistoryController{
  constructor($http, $localStorage, CheckAuthService, envService){
    'ngInject';

    var self = this;
    this.$http = $http;
    this.$localStorage = $localStorage;
    let userId = $localStorage.user._id;

    this.logout = CheckAuthService.logout;
    // возвращает список всех документов
    this.$http({
      url: envService.read('apiUrl')+"api/documents?userId="+userId,
      method: "GET"
    }).then(function successCallback(response) {
      console.log(response);
      let data = response.data.document;

      self.history = data;

    }, function errorCallback(response) {
      console.log(response);
    });
  }
}
