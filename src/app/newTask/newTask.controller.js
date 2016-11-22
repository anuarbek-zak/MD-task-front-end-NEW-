export class NewTaskController{
    constructor($http, toastr, $localStorage,$state, CheckAuthService, envService,$filter){
        'ngInject';
        console.log($filter);
        var vm = this;
        vm.members = false;
        vm.responsible=false;
        vm.performers=[];
        vm.auditors = [];
        vm.hours = [];
        vm.currentHour = 0;
        vm.showHours=false;
        let userId = $localStorage.user._id;
        console.log(userId);

        //создаю массив часов
        for(var i=0;i<24;i++){
            vm.hours[i] = i;
        }

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
                // vm.users = [{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},{name:"laefafafdasdfas",_id:1},];
            })
            .error(function(err){
                console.log(err);
            });

        //Записываю ответсвенного в vm.responsible и удаляю его из массива всех юзеров
        vm.chooseResponsible = function (index) {
                if(vm.responsible!="") vm.users.push(vm.responsible);
                vm.responsible = vm.users[index];
                vm.users.splice(index,1);
            };



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
            arr.push(vm.users[index]);
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
                vm.showFooter = true;
                task.performers = [];
                task.auditors = [];
                task.creator = userId;
                task.responsible = vm.responsible._id;
                task.deadline = new Date(task.deadline);
                task.deadline.setHours(vm.currentHour);
                vm.idFromObj(vm.performers,task.performers);
                vm.idFromObj(vm.auditors,task.auditors);
                $http.post(envService.read('apiUrl')+"/api/tasks/create",task)
                    .success(function(response){
                        console.log(response);
                        toastr.success("","Задачи успешно поставлена !");
                        $state.go('tasksList');
                    })
                    .error(function(err){
                        vm.showFooter = false;
                        toastr.error("Ошибка подключения","Ошибка");
                        console.log(err);
                    });
                }else{
                    console.log("OTMENA");
                }
        };
    }
}
