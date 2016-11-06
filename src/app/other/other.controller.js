export class OtherController{
  constructor(CheckAuthService, $http, toastr, $localStorage, $state, envService, $filter){
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

    vm.docTypes = [
      {value: 'Акт сверки', label: '<span class="m-selected-span">Акт сверки</span>',
        img: 'other1',
        imgReverse : 'other1-reverse'},
      {value: 'Справка об отсутствии задолженности', label: '<span class="m-selected-span">Справка об отсутствии задолженности</span>',
        img: 'other2',
        imgReverse : 'other2-reverse'},
      {value: 'Доверенность', label: '<span class="m-selected-span">Доверенность</span>',
        img: 'other3',
        imgReverse : 'other3-reverse'}
    ];

    vm.document.docType = vm.docTypes[0].value;

  }

  getClassValidation(){
    let classValidation = {
      'm-point-orangedot':'',
      'm-point-greendot': '',
      'm-point-reddot': ''
    };
    let orangeDot = false;

    if (this.document.docType=="Акт сверки"){
      orangeDot = orangeDot || this.document.dateStart;
      orangeDot = orangeDot || this.document.dateFinish;
    }
    if (this.document.docType=="Справка об отсутствии задолженности"){
      orangeDot = orangeDot || this.document.referenceToBank;
      orangeDot = orangeDot || this.document.dateStart;
      orangeDot = orangeDot || this.document.dateFinish;
    }
    if (this.document.docType=="Доверенность"){
      orangeDot = orangeDot || this.document.confidant;
      orangeDot = orangeDot || this.document.position;
      orangeDot = orangeDot || this.document.osnovanie;
    }

    let greenDot = true;

    if (this.document.docType=="Акт сверки"){
      greenDot = greenDot && this.document.dateStart;
      greenDot = greenDot && this.document.dateFinish;

    }
    if (this.document.docType=="Справка об отсутствии задолженности"){
      greenDot = greenDot && this.document.referenceToBank;
      greenDot = greenDot && this.document.dateStart;
      greenDot = greenDot && this.document.dateFinish;
    }

    if (this.document.docType=="Доверенность"){
      greenDot = greenDot && this.document.confidant;
      greenDot = greenDot && this.document.position;
      greenDot = greenDot && this.document.osnovanie;
    }

    classValidation['m-point-orangedot'] = orangeDot;
    classValidation['m-point-greendot'] = greenDot;

    classValidation['m-point-reddot'] = this.document.invalid;

    return classValidation;
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
