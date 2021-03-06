export class TasksController{
    constructor($http, $localStorage, CheckAuthService, envService,toastr,ngProgressFactory){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;
        vm.progressbar = ngProgressFactory.createInstance();

        // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        vm.getTasks = function (responsible=true,creator=true,favourite=false,urgent=false,general=false,all=false,selector='my',sideSelector="") {
            vm.selector=selector;
            $localStorage.selector = selector;
            vm.sideSelector = sideSelector;
            vm.progressbar.start();
            $http.post(envService.read('apiUrl')+"api/tasks/filter",{_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent,general:general,all:all})
                .success(function(response){
                    vm.progressbar.complete();
                    vm.tasks = response;
                    vm.emptyTasks = vm.tasks.length?"":"Нет задач, удовлятворяющиx этой категории";
                })
                .error(function(err){
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };

        //вызываю getTasks(по умолчанию выводит все входящие и все исходящие задачи)
        vm.getTasks();

        //метод для добавления в избранные(при нажатии на звездочку)
        vm.addToFavourites = function (task) {
            if(task.favourite.includes(vm._id)) task.favourite.splice(task.favourite.indexOf(userId),1);
            else task.favourite.push(userId);
            $http.put(envService.read('apiUrl')+"api/tasks/"+task._id,{userId:userId,case:"favourite"})
                .success(function (res) {

                })
                .error(function (err) {
                    toastr.error("Ошибка подключения","Ошибка");
                    console.log(err);
                });

        };
        vm.logout = CheckAuthService.logout;

    }
}
