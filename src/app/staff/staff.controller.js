export class StaffController{
  constructor(CheckAuthService, $http, toastr, $localStorage, $state, envService, $filter){
    'ngInject';


    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.envService = envService;
    this.document = {};
    var vm = this;
    vm.logout = CheckAuthService.logout;
    vm.document.date = $filter('date')(new Date(), 'от dd MMMM yyyy г.');
    vm.document.number = "00001";
    this.taskTypes = [
      {value: 'Справка', label: '<span class="m-selected-span">Справка</span>',
        img: 'kadry1',
        imgReverse : 'kadry1-reverse'},
      {value: 'Прием на работу', label: '<span class="m-selected-span">Прием на работу</span>',
        img: 'kadry2',
        imgReverse : 'kadry2-reverse'},
      {value: 'Отпуск', label: '<span class="m-selected-span">Отпуск</span>',
        img: 'kadry3',
        imgReverse : 'kadry3-reverse'},
      {value: 'Увольнение с работы', label: '<span class="m-selected-span">Увольнение с работы</span>',
        img: 'kadry4',
        imgReverse : 'kadry4-reverse'}
    ];


    this.document.docType = 'Справка';


    vm.helpTypes1 = [
      {value: 'о заработной плате', label: '<span class="m-selected-span">о заработной плате</span>'},
      {value: 'о перечислении пенсионных взносов', label: '<span class="m-selected-span">о перечислении пенсионных взносов</span>'},
      {value: 'о суммах дохода для оформления пенсии', label: '<span class="m-selected-span">о суммах дохода для оформления пенсии</span>'},
      {value: 'с места работы по беременности', label: '<span class="m-selected-span">с места работы по беременности</span>'}
    ];
    vm.helpTypes2 = [
      {value: 'Трудовой отпуск', label: '<span class="m-selected-span">Трудовой отпуск</span>'},
      {value: 'Отпуск по уходу за ребенком', label: '<span class="m-selected-span">По уходу за ребенком</span>'},
      {value: 'Отпуск без сохранения зарплаты', label: '<span class="m-selected-span">Отпуск без сохранения зарплаты</span>'},
      {value: 'Отпуск по беременности', label: '<span class="m-selected-span">Отпуск по беременности</span>'}
    ];

    vm.selectTypeTask = (docType)=>{
      vm.document.docType = docType;
      if (docType=='Справка'){
        vm.document.helpType = 'о заработной плате';
      }
      if (docType=='Отпуск'){
        vm.document.helpType = 'Трудовой отпуск';
      }

    };
    vm.selectTypeTask(vm.document.docType);
    vm.getNumberDocument();
  }


  getClassValidation(){
    let classValidation = {
      'm-point-orangedot':'',
      'm-point-greendot': '',
      'm-point-reddot': ''
    };
    let orangeDot = false;


    if (this.document.docType=="Справка"){
      orangeDot = orangeDot || this.document.nameEmployer;
      orangeDot = orangeDot || this.document.position;
      orangeDot = orangeDot || this.document.requiredIn;
      orangeDot = orangeDot || this.document.dateStart;
      orangeDot = orangeDot || this.document.dateFinish;
      orangeDot = orangeDot || this.document.helpType;
      if (this.document.helpType=="о заработной плате"){
        orangeDot = orangeDot || this.document.helpNeeded;
        if (this.document.helpNeeded=='с базы 1с'){
        }
      }
      if (this.document.helpType=="о перечислении пенсионных взносов"){

      }
    }
    if (this.document.docType=="Прием на работу"){
      orangeDot = orangeDot || this.document.nameEmployer;
      orangeDot = orangeDot || this.document.position;
      orangeDot = orangeDot || this.document.requiredIn;
      orangeDot = orangeDot || this.document.dateStart;
      //orangeDot = orangeDot || this.document.dateFinish;
      orangeDot = orangeDot || this.document.udsLichnosti;
      orangeDot = orangeDot || this.document.pensDogovor;
      orangeDot = orangeDot || this.document.copyDiplom;
      orangeDot = orangeDot || this.document.zayavlenieSotrudnika;
      orangeDot = orangeDot || this.document.statusWork;
      if (this.document.statusWork=="По совместительству"){
        orangeDot = orangeDot || this.document.spravkaSDrraboti;
      }
    }
    if (this.document.docType=="Отпуск"){
      orangeDot = orangeDot || this.document.nameEmployer;
      orangeDot = orangeDot || this.document.position;
      //orangeDot = orangeDot || this.document.requiredIn;
      orangeDot = orangeDot || this.document.dateStart;
      orangeDot = orangeDot || this.document.dateFinish;
      orangeDot = orangeDot || this.document.helpType;
      orangeDot = orangeDot || this.document.zayavlenieSotrudnika;
      if (this.document.helpType=="Отпуск по беременности"){
        orangeDot = orangeDot || this.document.svidetelstvoORogdeniiRebenka;
      }
      if (this.document.helpType=="Отпуск по уходу за ребенком"){
        orangeDot = orangeDot || this.document.listVremennoiNetrudosposobnosti;

      }
    }
    if (this.document.docType=="Увольнение с работы"){
      orangeDot = orangeDot || this.document.nameEmployer;
      orangeDot = orangeDot || this.document.position;
      //orangeDot = orangeDot || this.document.requiredIn;
      //orangeDot = orangeDot || this.document.dateStart;
      orangeDot = orangeDot || this.document.dateFinish;
      orangeDot = orangeDot || this.document.typeOfCalculation;
      orangeDot = orangeDot || this.document.zayavlenieSotrudnika;
      orangeDot = orangeDot || this.document.reasonForLeaving;
      if (this.document.reasonForLeaving=="По статье"){
        orangeDot = orangeDot || this.document.article;
      }
    }



    let greenDot = true;

    if (this.document.docType=="Справка"){
      greenDot = greenDot && this.document.nameEmployer;
      greenDot = greenDot && this.document.position;
      greenDot = greenDot && this.document.requiredIn;
      greenDot = greenDot && this.document.dateStart;
      greenDot = greenDot && this.document.dateFinish;
      greenDot = greenDot && this.document.helpType;
      if (this.document.helpType=="о заработной плате"){
        greenDot = greenDot && this.document.helpNeeded;
        if (this.document.helpNeeded=='с базы 1с'){
          greenDot = greenDot && (this.document.reference3mounth||this.document.reference6mounth||this.document.reference12mounth)
        }
        if (this.document.helpType=="о перечислении пенсионных взносов"){

        }
      }
    }
    if (this.document.docType=="Прием на работу"){
      greenDot = greenDot && this.document.nameEmployer;
      greenDot = greenDot && this.document.position;
      greenDot = greenDot && this.document.requiredIn;
      greenDot = greenDot && this.document.dateStart;
      //greenDot = greenDot && this.document.dateFinish;
      greenDot = greenDot && this.document.udsLichnosti;
      greenDot = greenDot && this.document.pensDogovor;
      greenDot = greenDot && this.document.copyDiplom;
      greenDot = greenDot && this.document.zayavlenieSotrudnika;
      greenDot = greenDot && this.document.statusWork;
      if (this.document.statusWork=="По совместительству"){
        greenDot = greenDot && this.document.spravkaSDrraboti;
      }
    }
    if (this.document.docType=="Отпуск"){
      greenDot = greenDot && this.document.nameEmployer;
      greenDot = greenDot && this.document.position;
      //greenDot = greenDot && this.document.requiredIn;
      greenDot = greenDot && this.document.dateStart;
      greenDot = greenDot && this.document.dateFinish;
      greenDot = greenDot && this.document.helpType;
      greenDot = greenDot && this.document.zayavlenieSotrudnika;
      if (this.document.helpType=="Отпуск по беременности"){
        greenDot = greenDot && this.document.svidetelstvoORogdeniiRebenka;
      }
      if (this.document.helpType=="Отпуск по уходу за ребенком"){
        greenDot = greenDot && this.document.listVremennoiNetrudosposobnosti;

      }
    }

    if (this.document.docType=="Увольнение с работы"){
      greenDot = greenDot && this.document.nameEmployer;
      greenDot = greenDot && this.document.position;
      greenDot = greenDot && this.document.dateFinish;
      greenDot = greenDot && this.document.typeOfCalculation;
      greenDot = greenDot && this.document.zayavlenieSotrudnika;
      greenDot = greenDot && this.document.reasonForLeaving;
      if (this.document.reasonForLeaving=="По статье"){
        greenDot = greenDot && this.document.article;
      }
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
    return this.getClassValidation()['m-point-greendot'];
  }

  sendRequestSelling(){

    let userId = this.$localStorage.user._id;
    let toastr = this.toastr;
    let $state = this.$state;

    if (!this.getClassValidation()['m-point-greendot']){
      this.document.invalid = true;
    }

    if (this.getClassValidation()['m-point-greendot']){

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
