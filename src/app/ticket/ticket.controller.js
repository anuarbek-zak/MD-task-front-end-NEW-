export class TicketController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state, envService, TicketSupportService){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.TicketSupportService = TicketSupportService;
    var vm = this;
    vm.logout = CheckAuthService.logout;

    this.starThread = TicketSupportService.starThread;
    this.selector = 'my';

    this.employers = [
      {value: 'none', label: '<span class="m-selected-span m-selected-face"></span>'},
      {value: 'услуга', label: '<span class="m-selected-span">услуга</span>'},
      {value: 'уп.', label: '<span class="m-selected-span">уп.</span>'},
      {value: 'тонн', label: '<span class="m-selected-span">тонн</span>'},
      {value: 'м кв.', label: '<span class="m-selected-span">м кв.</span>'},
      {value: 'пог. м', label: '<span class="m-selected-span">пог. м</span>'},
      {value: 'кг.', label: '<span class="m-selected-span">кг.</span>'},
      {value: 'куб. м', label: '<span class="m-selected-span">куб. м</span>'},
      {value: 'литр', label: '<span class="m-selected-span">литр</span>'},
      {value: 'компл.', label: '<span class="m-selected-span">компл</span>'}
    ];

    this.statuses = [
      {value: 'none', label: '<span class="m-selected-span m-selected-flag "></span>'},
      {value: 'услуга', label: '<span class="m-selected-span">услуга</span>'},
      {value: 'уп.', label: '<span class="m-selected-span">уп.</span>'},
      {value: 'тонн', label: '<span class="m-selected-span">тонн</span>'},
      {value: 'м кв.', label: '<span class="m-selected-span">м кв.</span>'},
      {value: 'пог. м', label: '<span class="m-selected-span">пог. м</span>'},
      {value: 'кг.', label: '<span class="m-selected-span">кг.</span>'},
      {value: 'куб. м', label: '<span class="m-selected-span">куб. м</span>'},
      {value: 'литр', label: '<span class="m-selected-span">литр</span>'},
      {value: 'компл.', label: '<span class="m-selected-span">компл</span>'}
    ];
    this.selectedEmployer = this.employers[0].value;
    this.selectedStatus = this.statuses[0].value;

    this.getTickets = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/thread?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log(response);

        vm.tickets = response.data.tickets;
        let ticket = vm.tickets[0];
        console.log(ticket);

        console.log(TicketSupportService.getHeaderInObjectWithValue(ticket.lastTicket.headers, 'From'));
        console.log(TicketSupportService.getHeaderInObjectWithValue(ticket.lastTicket.headers, 'Reply-To'));
        console.log(TicketSupportService.getHeaderInObjectWithValue(ticket.lastTicket.headers, 'Subject'));
      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };


   this.getTickets();
  }


}
