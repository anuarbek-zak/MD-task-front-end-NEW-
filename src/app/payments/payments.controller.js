export class PaymentsController{
  constructor (CheckAuthService, $http, toastr, $localStorage, $state,  envService, $filter){
    'ngInject';

    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.envService = envService;
    var vm = this;
    vm.logout = CheckAuthService.logout;
    vm.document = {};
    vm.document.contragent = {};

    vm.document.date = $filter('date')(new Date(), 'от dd MMMM yyyy г.');
    vm.document.number = "00001";
    vm.document.docType = 'Платежи';

    vm.paymentTypes =  vm.currencys = [
      {value: 'Обычные платеж', label: '<span class="m-selected-span">Обычные платеж</span>'},
      {value: 'Зарплатный платеж', label: '<span class="m-selected-span">Зарплатный платеж</span>'},
      {value: 'Пенсионный платеж', label: '<span class="m-selected-span">Пенсионный платеж</span>'},
      {value: 'Социальный платеж', label: '<span class="m-selected-span">Социальный платеж</span>'},
      {value: 'Заявление на перевод валюты', label: '<span class="m-selected-span">Заявление на перевод валюты</span>'},
      {value: 'Заявление на конвертацию валюты', label: '<span class="m-selected-span">Заявление на конвертацию валюты</span>'},
      //{value: 'Оплата услуг связи', label: '<span class="m-selected-span">Оплата услуг связи</span>'}
    ];

    vm.document.paymentType = vm.paymentTypes[0].value;

    this.getNumberDocument();
  }


  getClassValidation(){
    let classValidation = {
      'm-point-orangedot':'',
      'm-point-greendot': '',
      'm-point-reddot': ''
    };
    let orangeDot = false;




    orangeDot = orangeDot || this.document.naOsnovanii;

    if(this.document.naOsnovanii=='Счет на оплату'){
      orangeDot = orangeDot || this.document.schetNaOplatu;
    }
    if(this.document.naOsnovanii=='Счет-фактура'){
      orangeDot = orangeDot || this.document.shetFactura;
    }



    let greenDot = true;


    greenDot = greenDot && this.document.naOsnovanii;

    if(this.document.naOsnovanii=='Счет на оплату'){
      greenDot = greenDot && this.document.schetNaOplatu;
    }
    if(this.document.naOsnovanii=='Счет-фактура'){
      greenDot = greenDot && this.document.shetFactura;
    }







    classValidation['m-point-orangedot'] = orangeDot;
    classValidation['m-point-greendot'] = greenDot;

    classValidation['m-point-reddot'] = this.document.invalid;

    return classValidation;
  }

  getClassValidationForSubmit(){
    return this.document.contragent.validation['m-point-greendot']&&this.getClassValidation()['m-point-greendot'];
  }

  getNumberDocument(){
    let userId = this.$localStorage.user._id;

    let self = this;
    // login
    this.$http({
      url : this.envService.read('apiUrl')+"api/documents/count?docType="+this.document.docType+'&userId='+userId,
      method : "GET"
    }).then(function successCallback(response) {
      console.log(response);

      if (response.data.status == 200){
        console.log(self);
        // self.document.number = response.data.count;
        let count = response.data.count;
        count = count.toString();
        console.log(count.length);
        while(count.length<5){
          count = '0'+ count;
        }
        self.document.number = count;
      }
    }, function errorCallback(response) {
      console.log('Ошибка запроса количества документов по типу');
    });
  }

  sendRequestSelling(){

    let userId = this.$localStorage.user._id;
    let toastr = this.toastr;
    let $state = this.$state;
    if (!this.document.contragent.validation['m-point-greendot']){
      this.document.contragent.invalid = true;
    }
    if (!this.getClassValidation()['m-point-greendot']){
      this.document.invalid = true;
    }

    if (this.document.contragent.validation['m-point-greendot']&&this.getClassValidation()['m-point-greendot']){

      this.$http({
        url : this.envService.read('apiUrl')+"api/documents",
        method : "POST",
        data : {
          userId : userId,
          document : this.document
        }
      }).then(function successCallback(response) {
        console.log(response);

        if (response.status == 200){
          toastr.success('Ваш документ отправлен.', 'Отправлен!');

          $state.go('history');
        }
      }, function errorCallback(response) {
        console.log(response);
        console.log('open toastr');
        toastr.error('Ошибка!');
      });
    }else{
      this.toastr.error('Заполните все необходимые поля', 'Ошибка!');
    }
  }
}
