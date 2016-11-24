export class NewTaskController{
    constructor($http, toastr, $localStorage,$state, CheckAuthService, envService,$stateParams, $filter){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.task = {};
        vm.task.urgent = false;
        vm.task.performers = [];
        vm.task.auditors = [];
        vm.members = false;
        vm.task.responsible=false;
        vm.hours = [];
        vm.currentHour = 0;
        vm.showHours=false;
        vm.taskId = $stateParams.taskId;
        vm.submitText ="Поставить задачу" ;
        var once = true;

        //для быстрого вывода
        var cl = function (a) {
            console.log("-----------");
            console.log(a);
            console.log("-----------");
        };

        //создаю массив часов
        (function () {
            for(var i=0;i<24;i++){
                vm.hours[i] = i;
            }
        })();

        //удаляю responsible из массива юзеров если
        // он уже есть(на редактировании)
        // var removeResp = function () {
        //     if(once && $stateParams.taskId){
        //         once = false;
        //         vm.users.forEach(function (user,i,arr) {
        //             if(user._id==vm.task.responsible._id)  arr.splice(i,1);
        //
        //         });
        //     }
        // }
        //
        // removeResp();

        //проверка:если пришел taskId то значит меняем task,если нет,то создаем новый

        var ifTaskId = function () {
            if($stateParams.taskId) {
                vm.submitText = "Внести изменения";
                $http.post(envService.read('apiUrl') + "/api/tasks/task", {_id: $stateParams.taskId, userId: userId})
                    .success(function (response) {
                        vm.task = response;
                        vm.task.deadline = $filter('date')(vm.task.deadline,'yyyy-MM-dd');
                        //удаляю из массива юзеров всех аудиторов,соисполнителей и ответсвенных
                        //что бы не дублировались
                        var arr = vm.task.performers.concat(vm.task.auditors);
                        arr.push(vm.task.responsible);
                        for (var i = 0; i < arr.length; i++) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (arr[i]._id == vm.users[j]._id) vm.users.splice(j, 1);
                            }
                        }

                    })
                    .error(function (err) {
                        console.log(err);
                        toastr.error("Ошибка подключения", "Ошибка");
                    });
            }
        };

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

                //проверка:если пришел taskId то значит меняем task,если нет,то создаем новый
                ifTaskId();
            })
            .error(function(err){
                console.log(err);
            });

        //Записываю ответсвенного в vm.task.responsible и удаляю его из массива всех юзеров
        vm.chooseResponsible = function (index) {
                if(vm.task.responsible!="") vm.users.push(vm.task.responsible);
                vm.task.responsible = vm.users[index];
                vm.users.splice(index,1);
            };



        //При нажатии на "удалить участников" возвращает их в массив всех юзеров
        // и очищает массивы аудиторов и перформеров а так же
        // скрывает поле "удалить участников"
        vm.hideMembers = function () {
            vm.users = vm.users.concat(vm.task.auditors.concat(vm.task.performers));
            vm.task.performers=[];
            vm.task.auditors=[];
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

        //беру id из объекта юзера и добавляю массив что бы отправить
        //массив ТОЛЬКО из id
        vm.idFromObj = function (arr) {
            arr.forEach(function (user,i) {
                arr[i] = user._id;
            });
        };

        //отправляю созданный таск на сервер
        //айди создателя равен айди текущего юзера
        vm.createTask = function () {
            if(vm.task){
                vm.showFooter = true;
                vm.dateError = false;
                vm.task.creator = userId;
                vm.task.responsible = vm.task.responsible._id;
                cl("DEADLINE"+vm.task.deadline);
                //проверка на дату(если есть,то правильно ли введена)
                if(vm.task.deadline!==undefined){
                    var timestamp=Date.parse(vm.task.deadline );
                    if (isNaN(timestamp)==true) {
                        vm.dateError = true;
                        vm.showFooter = false;
                        return;
                    }

                    vm.task.deadline = new Date(timestamp);
                    vm.task.deadline.setHours(vm.currentHour);
                }

                vm.idFromObj(vm.task.performers);
                vm.idFromObj(vm.task.auditors);
                if($stateParams.taskId){
                    $http.put(envService.read('apiUrl')+"/api/tasks/update/"+$stateParams.taskId,vm.task)
                        .success(function(response){
                            console.log(response);
                            toastr.success("","Задача успешно изменена !");
                            $state.go('taskInfo({taskId:vm.taskId})');
                        })
                        .error(function(err){
                            vm.showFooter = false;
                            toastr.error("Ошибка подключения","Ошибка");
                            console.log(err);
                        });
                }else{
                    $http.post(envService.read('apiUrl')+"/api/tasks/create",vm.task)
                        .success(function(response){
                            console.log(response);
                            toastr.success("","Задача успешно поставлена !");
                            $state.go('tasksList');
                        })
                        .error(function(err){
                            vm.showFooter = false;
                            toastr.error("Ошибка подключения","Ошибка");
                            console.log(err);
                        });
                }

            }else{
               console.log("OTMENA");
            }
        };
    }
}
