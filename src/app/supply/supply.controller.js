export class SupplyController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state, envService, $filter){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.envService = envService;

    var vm = this;
    vm.logout = CheckAuthService.logout;
    vm.document = {};
    vm.document.date = $filter('date')(new Date(), 'от dd MMMM yyyy г.');
    vm.document.number = "00001";
    vm.document.docType = 'Поступление';

    vm.getNumberDocument();
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

  getClassValidationForSubmit(){
    return this.document.contragent.validation['m-point-greendot']&&this.getClassValidation()['m-point-greendot'];
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
      if(this.document.naOsnovanii=='Счет-фактура + Накладная'){
        orangeDot = orangeDot || this.document.shetFactura;
        orangeDot = orangeDot || this.document.nakladnaya;
      }



    let greenDot = true;


      greenDot = greenDot && this.document.naOsnovanii;

      if(this.document.naOsnovanii=='Счет на оплату'){
        greenDot = greenDot && this.document.schetNaOplatu;
      }
      if(this.document.naOsnovanii=='Счет-фактура + Накладная'){
        greenDot = greenDot && this.document.shetFactura;
        greenDot = greenDot && this.document.nakladnaya;
      }

    classValidation['m-point-orangedot'] = orangeDot;
    classValidation['m-point-greendot'] = greenDot;

    classValidation['m-point-reddot'] = this.document.invalid;

    return classValidation;
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
        toastr.error('Ошибка авторизации', 'Ошибка!');
      });

      // this.$http({
      //   url: 'https://script.google.com/macros/s/AKfycbyDD8L7yXLFrAC_K7yCE4iJUHUy_eK_o2DPa4eZqGsC8uGaoguz/exec' +
      //   '?request=document&userId=' + userId + '&document=' + JSON.stringify(this.document) + '&from=ticket',
      //   method: "POST",
      //   //headers : {
      //   //  'Accept' : 'application/json, text/javascript',
      //   //  'Content-Type' : 'multipart/form-data; charset=utf-8'
      //   //}
      // }).then(function successCallback(response) {
      //
      //   console.log('successCallback');
      //   console.log(response);
      //   if (response.data.task_id){
      //     toastr.success('Ваш документ отправлен.', 'Отправлен!');
      //
      //     $state.go('history');
      //   }
      // }, function errorCallback(response) {
      //   console.log('errorCallback');
      //   console.log(response);
      // });
    }else{
      this.toastr.error('Заполните все необходимые поля', 'Ошибка!');
    }
  }
}
