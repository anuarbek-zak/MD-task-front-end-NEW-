export class NewTaskController{
    constructor($http, $localStorage, $window, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        vm.members = false;
        vm.performers=[];
        vm.auditors = [];
        vm.responsible="";
        // Имитирую юзера John Silver
        let userId = $localStorage.user._id;
        userId = "581c4bf33afb2fcb15258c5b";
        //Запрос на всех клиентов(Заказчиков)
        $http.get("https://md-tasks.herokuapp.com/api/clients/all")
            .success(function(response){
                vm.customers = response;
                console.log(response);
            })
            .error(function(err){
                console.log(err);
            });
        //Запрос на всех юзеров
        $http.get("https://md-tasks.herokuapp.com/api/users/all")
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
                        vm.responsible = user;
                        users.splice(i,1)
                    }
                });
            }

        //При нажатии на "удалить участников" добавляет их в массив всех юзеров
        // и очищает массивы аудиторов и перформеров а так же
        // скрывает поле "удалить участников"
        vm.hideMembers = function () {
            vm.users = vm.users.concat(vm.auditors.concat(vm.performers));
            vm.performers=[];
            vm.auditors=[];
            vm.members = !vm.members;
        };

        //удаляет из массива юзеров выбраного юзера по айди
        vm.removeFromUsers = function (id,arr) {
            vm.users.forEach(function (user,i,users) {
                if(user._id==id){
                    users.splice(i,1);
                    arr.push(user);
                }
            });
        };
        //добавляет в массив юзеров выбраного юзера
        vm.addToUsers = function (user,arr) {
          vm.users.push(user);
          arr.splice(arr.indexOf(user),1);
        };

        //беру id из юзера и добавляю массив
        vm.idToArr = function (fromArr,toArr) {
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
                vm.idToArr(vm.performers,task.performer);
                vm.idToArr(vm.auditors,task.auditor);
                console.log(task);
                $http.post("https://md-tasks.herokuapp.com/api/tasks/create",task)
                    .success(function(response){
                        console.log(response);
                        alert("Задача успешно поставлена!");
                        $window.location.href = "#/tasks/myTasks";
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