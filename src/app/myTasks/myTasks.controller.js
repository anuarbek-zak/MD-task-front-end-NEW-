export class MyTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        this.$http = $http;
        this.$localStorage = $localStorage;
        let userId = $localStorage.user._id;
        console.log("Pawet my tasks sd");

        $http.post('apiwka',userId)
            .success(function(response){
                vm.tasks = response;
            })
            .error(function(err){
                console.log(err);
            });
        vm.tasks = [{"performer":
                        [{"name":"Петя","position":"Прогер","_id":2},
                        {"name":"Надя","position":"Прогер","_id":4},
                        {"name":"Ваня","position":"Прогер","_id":6}],
                    "auditor":
                        [{"name":"Вася","position":"Бухгалтер","_id":1},
                         {"name":"Даша","position":"Бухгалтер","_id":5}],
                    "responsible":[{"name":"Оля","position":"Бухгалтер","_id":3}],
                    "deadline":"13.12",
                    "name":"Сделать фронтэнд",
                    "description":"авыфвыа",
                    "required":true,
                    "creator":"Рустам",
                    _id:1},

                     {"performer":
                        [{"name":"Петя","position":"Прогер","_id":2},
                        {"name":"Надя","position":"Прогер","_id":4},
                        {"name":"Ваня","position":"Прогер","_id":6}],
                    "auditor":
                        [{"name":"Вася","position":"Бухгалтер","_id":1},
                         {"name":"Даша","position":"Бухгалтер","_id":5}],
                    "responsible":[{"name":"Оля","position":"Бухгалтер","_id":3}],
                    "deadline":"05.12",
                    "name":"Сделать бэкенд",
                    "description":"ляля",
                    "required":false,
                    "creator":"Елнур",
                     _id:2}];
        this.logout = CheckAuthService.logout;
    }
}