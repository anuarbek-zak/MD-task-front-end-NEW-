export  class TicketSupportService{

  constructor ($http, $localStorage, envService){
    'ngInject';
    var self = this;

    /**
     * Функция для возврата value в массиве по name
     */
    this.getHeaderInObjectWithValue = function(object, name) {
      for (let i =0; i<object.length; i++){
        if(object[i].name == name){
          return(object[i].value);
        }
      }
      return null;
    };

    this.starThread = (star, _id)=>{
      let userId = $localStorage.user._id;
      let id = _id;
      console.log(id);
      $http({
        url : envService.read('apiUrl')+"api/thread/"+id+"/?userId="+userId,
        method : "POST",
        data : {
          star
        }
      }).then(function successCallback(response) {
        console.log(response);
        console.log('update star thread');

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

  }
}
