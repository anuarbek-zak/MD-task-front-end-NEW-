export class MyTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        // Имитирую юзера John Silver
        userId = "581c4bf33afb2fcb15258c5b";
        // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        vm.getTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            $http.post("https://md-tasks.herokuapp.com/api/tasks/filterBy",
                {_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent})
                .success(function(response){
                    vm.tasks = response;
                })
                .error(function(err){
                    console.log(err);
                });
        };
        //вызываю getTasks(по умолчанию выводит все входящие в все исходящие задачи)
        vm.getTasks();
        //метод для добавления в избранные(при нажатии на звездочку)
        // и получаю boolean - таск в избранных или нет
        vm.addToFavourites = function (task) {
            $http.post($localStorage.apiwka+"/api/tasks/addToFavourites",{_id:task._id})
                .success(function (res) {
                    task.favourite = res;
                })
                .error(function (res) {
                    console.log(res);
                });

        };
        this.logout = CheckAuthService.logout;
    }
}