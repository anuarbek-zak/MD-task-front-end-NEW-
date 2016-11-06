export class SellingController{
  constructor ($http, tmhDynamicLocale, CheckAuthService, toastr, $localStorage, $state, envService, $filter){
    'ngInject';


    var vm = this;

    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.envService = envService;

    vm.document = {};
    vm.logout = CheckAuthService.logout;


    vm.document.date = $filter('date')(new Date(), 'от dd MMMM yyyy г.');
    vm.document.number = "00001";
    vm.docTypes = [
      {
        value: 'Счет-фактура',
        label: '<span class="m-selected-span">Счет-фактура</span>',
        img: 'realisation1',
        imgReverse : 'realisation1-reverse'
      },
      {
        value: 'Счет на оплату',
        label: '<span class="m-selected-span">Счет на оплату</span>',
        img: 'realisation2',
        imgReverse : 'realisation2-reverse'
      },
      {
        value: 'Накладная',
        label: '<span class="m-selected-span">Накладная</span>',
        img: 'realisation3',
        imgReverse : 'realisation3-reverse'
      },
      {
        value: 'Акт выполненных работ',
        label: '<span class="m-selected-span">Акт выполненных работ</span>',
        img: 'realisation4',
        imgReverse : 'realisation4-reverse'
      }
    ];
    vm.document.docType = vm.docTypes[0].value;

    this.getNumberDocument();
    vm.units = [
      {value: 'штук', label: '<span class="m-selected-span">штук</span>'},
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

    vm.document.itemUnit = vm.units[0].value;

    vm.currencys = [
      {value: 'тенге', label: '<span class="m-selected-span">тенге</span>'},
      {value: 'доллар', label: '<span class="m-selected-span">доллар</span>'},
      {value: 'евро', label: '<span class="m-selected-span">евро</span>'},
      {value: 'рубль', label: '<span class="m-selected-span">рубль</span>'}
    ];
    vm.document.itemCurrency = vm.currencys[0].value;


    vm.document.items = [{index:1, unit:vm.units[0].value, currency: vm.currencys[0].value}];
//  Item method add and delete
    vm.addItem = function() {
      var item = {
        index: vm.document.items.length+1,
        unit:vm.units[0].value,
        currency: vm.currencys[0].value
      };
      vm.document.items.push(item);

    };
    vm.deleteItem = function(index) {
      vm.document.items.splice(index, 1);
    };

    vm.clickToCross = function(index){
      console.log(index);
      if (index == 0 ){
        vm.addItem();
      }else{
        vm.deleteItem(index);
      }
    };

  }

  getClassValidation(){
    let classValidation = {
      'm-point-orangedot':'',
      'm-point-greendot': '',
      'm-point-reddot': ''
    };
    let orangeDot = false;
    if (this.document.docType=="Счет-фактура"||this.document.docType=="Счет на оплату"){
      for (let i=0; i<this.document.items.length; i++) {
        orangeDot = orangeDot ||
          this.document.items[i].code ||
          this.document.items[i].name ||
          this.document.items[i].count ||
          // this.document.items[i].unit ||
          this.document.items[i].price ||
          // this.document.items[i].currency ||
          this.document.items[i].summ;
      }
    }

    if(this.document.docType=="Счет-фактура"){
      orangeDot = orangeDot || this.document.naOsnovanii;

      if(this.document.naOsnovanii=='Счет на оплату'){
        orangeDot = orangeDot || this.document.schetNaOplatu;
      }
      if(this.document.naOsnovanii=='Доверенности'){
        orangeDot = orangeDot || this.document.doverennost;
      }
      if(this.document.naOsnovanii=='Договора'){
        if (this.document.osnovanie) {
          orangeDot = orangeDot || this.document.osnovanie.nomerDogovora;
          orangeDot = orangeDot || this.document.osnovanie.date;
        }else{
          orangeDot = orangeDot || this.document.osnovanie;
        }
      }

      //if(this.document.naOsnovanii=='Счет-фактура'){
      //  orangeDot = orangeDot || vm.document.shetFactura;
      //}
    }

    if (this.document.docType=='Счет на оплату'){
      if (this.document.naOsnovaniiDogovora){
        if (this.document.osnovanie) {
          orangeDot = orangeDot || this.document.osnovanie.nomerDogovora;
          orangeDot = orangeDot || this.document.osnovanie.date;
        }else{
          orangeDot = orangeDot || this.document.osnovanie;
        }
      }
    }



    if(this.document.docType=="Накладная"||this.document.docType=="Акт выполненных работ"){
      orangeDot = orangeDot || this.document.naOsnovanii;

      if(this.document.naOsnovanii=='Счет на оплату'){
        orangeDot = orangeDot || this.document.schetNaOplatu;
      }

      if(this.document.naOsnovanii=='Счет-фактура'){
        orangeDot = orangeDot || this.document.shetFactura;
      }
    }

    let greenDot = true;
    if (this.document.docType=="Счет-фактура"||this.document.docType=="Счет на оплату"){
      for (let i=0; i<this.document.items.length; i++) {
        greenDot = greenDot &&
          this.document.items[i].code &&
          this.document.items[i].name &&
          this.document.items[i].count &&
          // this.document.items[i].unit &&
          this.document.items[i].price &&
          // this.document.items[i].currency &&
          this.document.items[i].summ;
      }
    }

    if(this.document.docType=="Счет-фактура"){
      greenDot = greenDot && this.document.naOsnovanii;

      if(this.document.naOsnovanii=='Счет на оплату'){
        greenDot = greenDot && this.document.schetNaOplatu;
      }
      if(this.document.naOsnovanii=='Доверенности'){
        greenDot = greenDot && this.document.doverennost;
      }
      if(this.document.naOsnovanii=='Договора'){
        if (this.document.osnovanie) {
          greenDot = greenDot && this.document.osnovanie.nomerDogovora;
          greenDot = greenDot && this.document.osnovanie.date;
        }else{
          greenDot = greenDot && this.document.osnovanie;
        }
      }
    }

    if (this.document.docType=='Счет на оплату'){
      if (this.document.naOsnovaniiDogovora){
        if (this.document.osnovanie) {
          greenDot = greenDot && this.document.osnovanie.nomerDogovora;
          greenDot = greenDot && this.document.osnovanie.date;
        }else{
          greenDot = greenDot && this.document.osnovanie;
        }
      }

    }

    if(this.document.docType=="Накладная"||this.document.docType=="Акт выполненных работ"){
      greenDot = greenDot && this.document.naOsnovanii;

      if(this.document.naOsnovanii=='Счет на оплату'){
        greenDot = greenDot && this.document.schetNaOplatu;
      }

      if(this.document.naOsnovanii=='Счет-фактура'){
        greenDot = greenDot && this.document.shetFactura;
      }
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

      // login
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

  calculateItem(item){
    item.summ = item.count*item.price;
  }
}
