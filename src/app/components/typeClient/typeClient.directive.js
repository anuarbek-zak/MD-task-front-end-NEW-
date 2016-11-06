export function TypeClientDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/typeClient/typeClient.html',
    scope: {
      mContragent: '='
    },
    controller: TypeClientController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class TypeClientController {
  constructor ($scope, $http, $localStorage, envService) {
    'ngInject';

    var vm = this;
    if (this.mContragent===undefined)
      this.mContragent = {};

    this.mContragent.type = 'new';

    this.bankTypes = [
      {value: 'АО «Altyn Bank» (ДБ АО «Народный Банк Казахстана»)', label: '<span class="m-selected-span">АО «Altyn Bank» (ДБ АО «Народный Банк Казахстана»)</span>'},
      {value: 'АО «БТА Банк»', label: '<span class="m-selected-span">АО «БТА Банк»</span>'},
      {value: 'АО ДБ «RBS (Kazakhstan)»', label: '<span class="m-selected-span">АО ДБ «RBS (Kazakhstan)»</span>'},
      {value: 'АО «ДОЧЕРНИЙ БАНК  «АЛЬФА-БАНК»', label: '<span class="m-selected-span">АО «ДОЧЕРНИЙ БАНК  «АЛЬФА-БАНК»</span>'},
      {value: 'АО «АТФБанк»', label: '<span class="m-selected-span">АО «АТФБанк»</span>'},
      {value: 'АО «Банк Астаны»', label: '<span class="m-selected-span">АО «Банк Астаны»</span>'},
      {value: 'АО ДБ «БАНК КИТАЯ В КАЗАХСТАНЕ»', label: '<span class="m-selected-span">АО ДБ «БАНК КИТАЯ В КАЗАХСТАНЕ»</span>'},
      {value: 'АО «KASPI BANK»', label: '<span class="m-selected-span">АО «KASPI BANK»</span>'},
      {value: 'АО «ЦЕНТРАЛЬНЫЙ ДЕПОЗИТАРИЙ ЦЕННЫХ БУМАГ»', label: '<span class="m-selected-span">АО ДБ «Punjab National Bank  - Казахстан»</span>'},
      {value: 'АО «Ситибанк Казахстан»', label: '<span class="m-selected-span">АО «Ситибанк Казахстан»</span>'},
      {value: 'АО ДБ «Punjab National Bank  - Казахстан»', label: '<span class="m-selected-span">АО «ДОЧЕРНИЙ БАНК  «АЛЬФА-БАНК»</span>'},
      {value: 'АО «EU Bank (ДБ АО  «Евразийский банк»)»', label: '<span class="m-selected-span">АО «EU Bank (ДБ АО  «Евразийский банк»)»</span>'},
      {value: 'АО «Банк Развития Казахстана»', label: '<span class="m-selected-span">АО «Банк Развития Казахстана»</span>'},
      {value: 'АО «Евразийский банк развития»', label: '<span class="m-selected-span">АО «Евразийский банк развития»</span>'},
      {value: 'АО «Евразийский Банк»', label: '<span class="m-selected-span">АО «Евразийский Банк»</span>'},
      {value: 'АО «ЭКСИМБАНК КАЗАХСТАН»', label: '<span class="m-selected-span">АО «ЭКСИМБАНК КАЗАХСТАН»</span>'},
      {value: 'РГКП Государственный центр по выплате пенсий', label: '<span class="m-selected-span">РГКП Государственный центр по выплате пенсий</span>'},
      {value: 'АО «Жилстройсбербанк Казахстана»', label: '<span class="m-selected-span">АО «Жилстройсбербанк Казахстана»</span>'},
      {value: 'АО  «Исламский Банк  «Al Hilal»', label: '<span class="m-selected-span">АО  «Исламский Банк  «Al Hilal»</span>'},
      {value: 'АО «Народный Банк Казахстана»', label: '<span class="m-selected-span">АО «Народный Банк Казахстана»</span>'},
      {value: 'АО «Евразийский банк развития»', label: '<span class="m-selected-span">АО «Евразийский банк развития»</span>'},
      {value: 'АО «Торгово-промышленный Банк Китая в г. Алматы»', label: '<span class="m-selected-span">АО «Торгово-промышленный Банк Китая в г. Алматы»</span>'},
      {value: 'г.Москва Межгосударственный Банк', label: '<span class="m-selected-span">г.Москва Межгосударственный Банк</span>'},
      {value: 'ДБ АО «Хоум Кредит энд Финанс Банк»', label: '<span class="m-selected-span">ДБ АО «Хоум Кредит энд Финанс Банк»</span>'},
      {value: 'АО «ForteBank»', label: '<span class="m-selected-span">АО «ForteBank»</span>'},
      {value: 'АО «Казинвестбанк»', label: '<span class="m-selected-span">АО «Казинвестбанк»</span>'},
      {value: 'АО «Банк ЦентрКредит»', label: '<span class="m-selected-span">АО «Банк ЦентрКредит»</span>'},
      {value: 'АО «Казахстанская фондовая биржа»', label: '<span class="m-selected-span">АО «Казахстанская фондовая биржа»</span>'},
      {value: 'АО «Банк  «Bank RBK»', label: '<span class="m-selected-span">АО «Евразийский банк развития»</span>'},
      {value: 'РГП «Казахстанский центр межбанковских расчетов НБРК»', label: '<span class="m-selected-span">РГП «Казахстанский центр межбанковских расчетов НБРК»</span>'},
      {value: 'РГУ «Комитет казначейства Министерства финансов РК»', label: '<span class="m-selected-span">РГУ «Комитет казначейства Министерства финансов РК»</span>'},
      {value: 'АО «КАЗПОЧТА»', label: '<span class="m-selected-span">АО «КАЗПОЧТА»</span>'},
      {value: 'АО  «Банк Kassa Nova»', label: '<span class="m-selected-span">АО  «Банк Kassa Nova»</span>'},
      {value: 'АО ДБ «КАЗАХСТАН-ЗИРААТ ИНТЕРНЕШНЛ БАНК»', label: '<span class="m-selected-span">АО ДБ «КАЗАХСТАН-ЗИРААТ ИНТЕРНЕШНЛ БАНК»</span>'},
      {value: 'АО «КАЗКОММЕРЦБАНК»', label: '<span class="m-selected-span">АО «КАЗКОММЕРЦБАНК»</span>'},
      {value: 'АО «AsiaCredit Bank (АзияКредит Банк)»', label: '<span class="m-selected-span">АО «AsiaCredit Bank (АзияКредит Банк)»</span>'},
      {value: 'АО ДБ «Национальный Банк Пакистана» в Казахстане', label: '<span class="m-selected-span">АО ДБ «Национальный Банк Пакистана» в Казахстане</span>'},
      {value: 'Республиканское Государств Учреждение Национальный Банк РК', label: '<span class="m-selected-span">Республиканское Государств Учреждение Национальный Банк РК</span>'},
      {value: 'АО «Delta Bank»', label: '<span class="m-selected-span">АО «Delta Bank»</span>'},
      {value: 'АО «Нурбанк»', label: '<span class="m-selected-span">АО «Нурбанк»</span>'},
      {value: 'ДБ АО «Сбербанк»', label: '<span class="m-selected-span">ДБ АО «Сбербанк»</span>'},
      {value: 'АО «Qazaq Banki»', label: '<span class="m-selected-span">АО «Qazaq Banki»</span>'},
      {value: 'АО «Шинхан Банк Казахстан»', label: '<span class="m-selected-span">АО «Шинхан Банк Казахстан»</span>'},
      {value: 'АО «Capital Bank Kazakhstan»', label: '<span class="m-selected-span">АО «Capital Bank Kazakhstan»</span>'},
      {value: 'АО «Цеснабанк»', label: '<span class="m-selected-span">АО «Цеснабанк»</span>'},
      {value: 'Дочерняя организация АО Банк ВТБ (Казахстан)', label: '<span class="m-selected-span">Дочерняя организация АО Банк ВТБ (Казахстан)</span>'},
      {value: 'АО «Заман-Банк»', label: '<span class="m-selected-span">АО «Заман-Банк»</span>'},
      {value: 'Банк кастодиан АО «ЕНПФ»', label: '<span class="m-selected-span">Банк кастодиан АО «ЕНПФ»</span>'}
    ];


    this.countryTypes = [
      {value: 'Казахстан', label: '<span class="m-selected-span">Казахстан</span>'},
      {value: 'Россия', label: '<span class="m-selected-span">Россия</span>'}
    ];

    this.contragents = [];
    this.contragentsObject = [];
    /// типа должен брать контрагетов всех
    //var contragents = this.contragents;

    $http({
      url: envService.read('apiUrl') + 'api/contragents?userId='+$localStorage.user._id,
      method: "GET"
    }).then(function successCallback(response) {

      vm.contragents = [];
      console.log('getcontragents');
      console.log(response);
      if (response.data){
        let data = response.data;
        angular.forEach(data, (item)=> {
          //console.log(item);
          let obj = item;
          //console.log(obj);
          //contragents.push(obj['companyName']);
          vm.contragents.push({
            value: obj['companyName'],
            label: obj['companyName']
          })
          // delete obj['type'];
          vm.contragentsObject.push(obj);
        });
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    this.selectContragent = ()=>{
      let finded = vm.contragentsObject.find((item)=>{
        if (vm.mContragent.companyName==item.companyName){
          return JSON.parse(JSON.stringify(item));
        }
      });
      vm.mContragent = finded;
    };


    this.mContragent.country = this.countryTypes[0].value;
  }
  getClassValidation(){
    let classValidation = {
      'm-point-orangedot':'',
      'm-point-greendot': '',
      'm-point-reddot': ''
    };
    let orangeDot = this.mContragent.companyName||
        this.mContragent.urAdress||
        this.mContragent.bin||
        //this.mContragent.street||
        this.mContragent.nameBank||
        //this.mContragent.city||
        //this.mContragent.state||
        this.mContragent.accountNumber||
        this.mContragent.postIndex
      // || this.mContragent.country
      ;
    classValidation['m-point-orangedot'] = orangeDot;

    let greenDot = this.mContragent.companyName&&
      this.mContragent.urAdress&&
      this.mContragent.bin&&
      //this.mContragent.street&&
      this.mContragent.nameBank&&
      //this.mContragent.city&&
      //this.mContragent.state&&
      this.mContragent.accountNumber&&
      this.mContragent.postIndex
      // && this.mContragent.country
      ;

    classValidation['m-point-greendot'] = greenDot;

    classValidation['m-point-reddot'] = this.mContragent.invalid;

    this.mContragent.validation = classValidation;
    return classValidation;
  }


}
