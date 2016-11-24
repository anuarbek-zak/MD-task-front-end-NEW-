export class TasksListController{
    constructor($http, $localStorage, CheckAuthService, envService,toastr){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;
        vm.preloader = true;
         // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        console.log(userId);


        var cl = function (a="",b) {
            console.log("-----------");
            console.log(a,b);
        };

        //функция срабатывает при успехе запроса
        vm.success = function (selector,response) {
            vm.preloader = false;
            vm.tasks = response.reverse();
            vm.emptyTasks = vm.tasks.length?"":"Нет задач, удовлятворяющиx этой категории";
            vm.selector = selector;
        };

        //функция срабатывает при ошибке
        vm.error = function (err) {
            vm.preloader = false;
            console.log(err);
            toastr.error("Ошибка подключения","Ошибка");
        };

        vm.myTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            $http.post(envService.read('apiUrl')+"/api/tasks/filterBy",
                {_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent})
                .success(function(response){
                    cl(response);
                    vm.success('my',response);
                })
                .error(function(err){
                    vm.error(err);
                });
        };

        //вызываю myTasks(по умолчанию выводит все входящие и все исходящие задачи)
        vm.myTasks();

        vm.allTasks = function () {
            $http.get(envService.read('apiUrl')+"/api/tasks/all")
                .success(function(response){
                    vm.success('all',response);
                })
                .error(function(err){
                    vm.error(err);
                });
        };

        vm.commonTasks = function () {
            $http.post(envService.read('apiUrl')+"/api/tasks/general",{_id:userId})
                .success(function(response){
                    vm.success('withMe',response);
                })
                .error(function(err){
                    vm.error(err);
                });
        };


        //метод для добавления в избранные(при нажатии на звездочку)
        vm.addToFavourites = function (task) {
            if(task.favourite.indexOf(userId)>-1) task.favourite.splice(task.favourite.indexOf(userId),1);
            else task.favourite.push(userId);
            $http.post(envService.read('apiUrl')+"/api/tasks/addToFavourites",{_id:task._id,userId:userId})
                .success(function (res) {
                    console.log(res);
                })
                .error(function (res) {
                    toastr.error("Ошибка подключения","Ошибка");
                    console.log(res);
                });

        };
        vm.logout = CheckAuthService.logout;


    }
}
