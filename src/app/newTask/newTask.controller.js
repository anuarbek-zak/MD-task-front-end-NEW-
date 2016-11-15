export class NewTaskController{
    constructor($http, toastr, $localStorage,$state, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        vm.members = false;
        vm.performers=[];
        vm.auditors = [];
        vm.responsible="";
        vm.currentPerformer = "Выберите соисполнителя";
        vm.currentAuditor = "Выберите аудитора";
        vm.currentResponsible = "Выберите ответсвенного";
        let userId = $localStorage.user._id;
        console.log(userId);

        //Запрос на всех клиентов(Заказчиков)
        $http.get(envService.read('apiUrl')+"/api/clients/all")
            .success(function(response){
                vm.customers = response;
            })
            .error(function(err){
                console.log(err);
            });

        //Запрос на всех юзеров
        $http.get(envService.read('apiUrl')+"/api/users/all")
            .success(function(response){
                vm.users = response;
            })
            .error(function(err){
                console.log(err);
            });

        //Записываю ответсвенного в vm.responsible и удаляю его из массива всех юзеров
        vm.chooseResponsible = function (id) {
                if(vm.responsible!="") vm.users.push(vm.responsible);
                vm.users.forEach(function (user,i,users) {
                    if(user._id==id){
                        vm.currentResponsible = user.name;
                        vm.responsible = user;
                        users.splice(i,1)
                    }
                });
            }

        //При нажатии на "удалить участников" возвращает их в массив всех юзеров
        // и очищает массивы аудиторов и перформеров а так же
        // скрывает поле "удалить участников"
        vm.hideMembers = function () {
            vm.users = vm.users.concat(vm.auditors.concat(vm.performers));
            vm.performers=[];
            vm.auditors=[];
            vm.members = !vm.members;
        };

        //удаляет из массива юзеров выбраного юзера по айди
        vm.removeFromUsers = function (index,arr) {
            var user = vm.users[index];
            switch (arr){
                case vm.performers:
                    vm.currentPerformer = user.name;
                    break;
                case vm.auditors:
                    vm.currentAuditor = user.name;
                    break;
            }
            arr.push(user);
            vm.users.splice(index,1);

        };

        //добавляет в массив юзеров выбраного юзера
        vm.addToUsers = function (user,arr) {
          vm.users.push(user);
          arr.splice(arr.indexOf(user),1);
        };

        //беру id из юзера и добавляю массив
        vm.idFromObj = function (fromArr,toArr) {
            fromArr.forEach(function (user,i) {
                toArr[i] = user._id;
            });
        };

        //отправляю созданный таск на сервер
        //айди создателя равен айди текущего юзера
        vm.createTask = function (task) {
            if(task){
                task.performer = [];
                task.auditor = [];
                task.creator = userId;
                vm.idFromObj(vm.performers,task.performer);
                vm.idFromObj(vm.auditors,task.auditor);
                $http.post(envService.read('apiUrl')+"/api/tasks/create",task)
                    .success(function(response){
                        console.log(response);
                        toastr.success("","Задачи успешно поставлена !");
                        $state.go('myTasks');
                    })
                    .error(function(err){
                        alert("Задача не созадана. Попробуйте еще раз");
                        console.log(err);
                    });

                }else{
                    console.log("OTMENA");
                }
        };
    }
}
