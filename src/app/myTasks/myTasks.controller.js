export class MyTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;
        // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        vm.getTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            $http.post(envService.read('apiUrl')+"/api/tasks/filterBy",
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
            $http.post(envService.read('apiUrl')+"/api/tasks/addToFavourites",{_id:task._id,userId:userId})
                .success(function (res) {   
                    console.log("RES "+res);
                    if(res) task.favourite.push(userId);
                    else {
                        task.favourite.splice(task.favourite.indexOf(userId),1);
                    }
                    console.log(res)
                })
                .error(function (res) {
                    console.log(res);
                });

        };
        this.logout = CheckAuthService.logout;
    }
}
