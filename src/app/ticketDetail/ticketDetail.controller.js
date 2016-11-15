export class TicketDetailController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state,
              envService, $stateParams, TicketSupportService ){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.TicketSupportService = TicketSupportService;
    var vm = this;
    vm.logout = CheckAuthService.logout;

    vm.actionType="reply";
    this.statuses = [
      {value: 'Открыт', label: '<span class="m-selected-span">Открыт</span>'},
      {value: 'Ожидание', label: '<span class="m-selected-span">Ожидание</span>'},
      {value: 'Закрыт', label: '<span class="m-selected-span">Закрыт</span>'},
      {value: 'Спам', label: '<span class="m-selected-span">Спам</span>'}
    ];
    this.employers = [
      {value: 'none', label: '<span class="m-selected-span m-selected-face"></span>'},
      {value: '12AS12', label: '<span class="m-selected-span m-selected-face-with-text">12AS12</span>'},
      {value: '12WD32', label: '<span class="m-selected-span m-selected-face-with-text">12WD32</span>'},
      {value: '54AU42', label: '<span class="m-selected-span m-selected-face-with-text">54AU42</span>'}
    ];
    this.deadlines = [
      {value: 'none', label: '<span class="m-selected-span m-selected-clock">Продлить</span>'},
      {value: '2hours', label: '<span class="m-selected-span m-selected-clock">на 2 часа</span>'},
      {value: '4hours', label: '<span class="m-selected-span m-selected-clock">на 4 часа</span>'},
      {value: '8hours', label: '<span class="m-selected-span m-selected-clock">на 8 часов</span>'}
    ];

    this.selectedStatus = this.deadlines[0].value;

    this.starThread = TicketSupportService.starThread;

    this.getTicketDetail = ()=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      console.log(id);
      $http({
        url : envService.read('apiUrl')+"api/ticket/"+id+"/?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log(response);

        vm.tickets = response.data.tickets;
        vm.comments = response.data.comments;
        vm.tickets = vm.tickets.concat(vm.comments);
        console.log(vm.tickets);
        vm.thread = response.data.thread;
        if (!vm.thread.user){
          vm.thread.user = {'idToEnter': 'none'};
        }else{
          vm.employers.push({value: vm.thread.user.idToEnter, label: '<span class="m-selected-span m-selected-face-with-text">'+vm.thread.user.idToEnter+'</span>'});
        };

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.replyToClient = (body)=>{
      let userId = this.$localStorage.user._id;
      let id = vm.tickets[0].idThread;

      $http({
        url : envService.read('apiUrl')+"api/ticket/"+id+"/reply?userId="+userId,
        method : "POST",
        data : {
          body
        }
      }).then(function successCallback(response) {
        console.log(response);
        $state.go('ticket');

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.runAction = (action, body)=>{
      switch (action){
        case "reply":{
          vm.replyToClient(body);
          return;
        }
        case "forward":{
          return;
        }
        case "note":{
          vm.addComment(body);
          return;
        }

      }
    };

    this.addComment = (body)=>{
          let userId = this.$localStorage.user._id;
          let id = vm.tickets[0].idThread;

          $http({
            url : envService.read('apiUrl')+"api/comment/"+id+"?userId="+userId,
            method : "POST",
            data : {
              text : body
            }
          }).then(function successCallback(response) {
            console.log(response);
            $state.go('ticket');

          }, function errorCallback(response) {
            console.log('Ошибка запроса');
          });
        };

    this.getTicketDetail();
  }


}
