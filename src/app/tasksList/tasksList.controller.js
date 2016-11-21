export class TasksListController{
    constructor($http, $localStorage, CheckAuthService, envService,toastr,$uibModal){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;

         // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        console.log(userId);
        vm.myTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            $http.post(envService.read('apiUrl')+"/api/tasks/filterBy",
                {_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent})
                .success(function(response){
                    vm.tasks = response.reverse();
                    vm.emptyTasks = vm.tasks.length?"":"Нет задач, удовлятворяющиx этой категории";
                    vm.selector = 'my';
                })
                .error(function(err){
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };

        //вызываю myTasks(по умолчанию выводит все входящие и все исходящие задачи)
        vm.myTasks();

        vm.allTasks = function () {
            $http.get(envService.read('apiUrl')+"/api/tasks/all")
                .success(function(response){
                    vm.tasks = response.reverse();
                    vm.emptyTasks = vm.tasks.length?"":"Нет задач, удовлятворяющиx этой категории";
                    vm.selector = 'all';

                })
                .error(function(err){
                    toastr.error("Ошибка подключения","Ошибка");
                    console.log(err);
                });
        };

        vm.commonTasks = function () {
            $http.post(envService.read('apiUrl')+"/api/tasks/general",{_id:userId})
                .success(function(response){
                    vm.tasks = response.reverse();
                    vm.emptyTasks = vm.tasks.length?"":"Нет задач, удовлятворяющиx этой категории";
                    vm.selector = 'withMe';
                })
                .error(function(err){
                    toastr.error("Ошибка подключения","Ошибка");
                    console.log(err);
                });
        };

        vm.accepted = function (taskId) {
          $http.put(envService.read('apiUrl')+"/api/tasks/general/"+taskId)
              .success(function(response){

              })
              .error(function(err){
                  toastr.error("Ошибка подключения","Ошибка");
                  console.log(err);
              });
        };

        vm.canceled = function (taskId) {
            console.log(taskId);

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                template:"a",
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
               console.log("success");
            });
          // $http.put(envService.read('apiUrl')+"/api/tasks/general/"+taskId)
          //     .success(function(response){
          //
          //     })
          //     .error(function(err){
          //         toastr.error("Ошибка подключения","Ошибка");
          //         console.log(err);
          //     });
        };

        //метод для добавления в избранные(при нажатии на звездочку)
        // и получаю boolean - таск в избранных или нет
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
