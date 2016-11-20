export class TasksListController{
    constructor($http, $localStorage, CheckAuthService, envService,toastr){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;
        // посылается запрос через метод vm.getTasks(responsible,creator,favourite,urgent)
        // и судя по значениям(true,false) выдает массив tasks по которому прохожусь ng-repeatom
        //отправляю входящие,исходящие,избранные,горящие и id юзера
        console.log(userId);
        vm.myTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            // vm.tasks =  [{"_id":"5826fd48bd76f60004f2f19e","name":"Task","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"17 November 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"]},{"_id":"5826e43bb9766600040e784b","name":"Task 12","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"07 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":[]},{"_id":"5825ebbf6f81d9000465c3bf","name":"Sdelat krasivo","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"11 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":["581c4bf33afb2fcb15258c5b"]},{"_id":"5825e3326f81d9000465c3be","name":"Task 10","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"01 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581c4bf33afb2fcb15258c5b"]},{"_id":"5824b83df83a860004bbca29","name":"Task 35","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"01 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":[]},{"_id":"582476d28c285b000452ae54","name":"Tasks 34","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"16 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":[]},{"_id":"5824661e6cf76200047b0965","name":"Task 4","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"10 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581719b420bdaab829d07443"]},{"_id":"582461ec7472860004423d12","name":"Task 3","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":[]},{"_id":"58245102bed6260004a5a9eb","name":"Task1","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"01 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":["581719b420bdaab829d07443"]}];
            $http.post(envService.read('apiUrl')+"/api/tasks/filterBy",
                {_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent})
                .success(function(response){
                    vm.tasks = response.reverse();
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
                    console.log(response);
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
          $http.put(envService.read('apiUrl')+"/api/tasks/general/"+taskId)
              .success(function(response){

              })
              .error(function(err){
                  toastr.error("Ошибка подключения","Ошибка");
                  console.log(err);
              });
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
