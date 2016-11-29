export class NewTaskController{
    constructor($http, toastr, $localStorage,$state, envService,$stateParams,$anchorScroll, $location,$mdDialog ,$filter,ngProgressFactory){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.showContent = false;
        vm.task = {};
        vm.task.performers = [];
        vm.task.auditors = [];
        vm.acceptedUsers = [];
        vm.canceledUsers = [];
        vm.hours = [];
        vm.currentHour = 0;
        vm.taskId = $stateParams.taskId=="new"?undefined:$stateParams.taskId;
        console.log('taskId ',vm.taskId);
        vm.submitText ="Поставить задачу" ;
        vm.progressbar = ngProgressFactory.createInstance();
        vm.limit =  4;
        vm.userAccepted=false;

        //создаю массив часов
        (function () {
            for(var i=0;i<24;i++){
                vm.hours[i] = i;
            }
        })();

        //проверка:если пришел taskId то значит меняем task,если нет,то создаем новый
        //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\
        var getTaskById = function () {
                vm.submitText = "Изменить задачу";
                vm.progressbar.start();
                $http.get(envService.read('apiUrl')+"api/tasks/"+vm.taskId+"/"+userId)
                    .success(function (response) {
                        vm.task = response;
                        vm.currentHour = $filter('date')(vm.task.deadline,'H')?$filter('date')(vm.task.deadline,'H'):0 ;
                        vm.notCreator = (vm.task.creator._id!=userId)?true:false;
                        vm.task.deadline = $filter('date')(vm.task.deadline,'yyyy-MM-dd');
                        vm.searchResponsible = vm.task.responsible.name;
                        vm.task.status.forEach(function (obj) {
                            if(vm.userId==obj.user._id) vm.userAccepted=true;
                        });
                        vm.showRequireBtns = (vm.task.creator._id!=vm.userId&&vm.task.required==false&&!vm.userAccepted)?true:false;

                        // /удаляю из массива юзеров всех аудиторов,соисполнителей и ответсвенных
                        //что бы не дублировались
                        var arr = vm.task.performers.concat(vm.task.auditors);
                        arr.push(vm.task.responsible);
                        for (var i = 0; i < arr.length; i++) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (arr[i]._id == vm.users[j]._id) vm.users.splice(j, 1);
                            }
                        }

                        //создание массивов тех кто принял задачу и те кто нет
                        vm.task.status.forEach(function (status) {
                            if(status.accepted===true) vm.acceptedUsers.push(status);
                            else vm.canceledUsers.push(status);
                        });

                        //беру все коменты
                        $http.get(envService.read('apiUrl')+"api/comment/"+vm.taskId)
                            .success(function(response){
                                vm.progressbar.complete();
                                vm.showContent = true;
                                vm.comments = response.reverse();
                            })
                            .error(function(err){
                                console.log(err);
                            });

                        //когда принял таск
                        vm.accepted = function (taskId=vm.taskId,userId=vm.userId,comment="",accepted=true,statusText="Задача принята") {
                            $http.put(envService.read('apiUrl')+"api/tasks/"+vm.taskId,{case:"accept",userId:userId,comment:comment,accepted:accepted})
                                .success(function(response){
                                    toastr.info("",statusText);
                                    vm.showRequireBtns= false;
                                    vm.task.status.push({_id:taskId,user:$localStorage.user,comment:comment,accepted:accepted});
                                })
                                .error(function(err){
                                    toastr.error("Ошибка подключения","Ошибка");
                                    console.log(err);
                                });
                        };

                        //когда отклонил таск
                        vm.canceled = function () {
                            // создаю модалку
                            var confirm = $mdDialog.prompt()
                                .title('Опишите причину отказа')
                                .placeholder('Написать ...')
                                .cancel('Отмена')
                                .ok('Отправить');

                            $mdDialog.show(confirm).then(function(result) {
                                if(!result){
                                    toastr.error("","Заполните причину отказа");
                                    return;
                                }
                                vm.reason = result;
                                vm.accepted(vm.taskId,vm.userId,vm.reason,false,"Задача отклонена");

                            }, function() {
                                vm.reason = "";
                            });
                        };

                        //когда нажимаю ответить на комент
                        vm.writeAnswer = function (name) {
                            vm.comment = name+" ,  ";
                            document.getElementById("createTextArea").focus();
                            $location.hash("createTextArea");
                            $anchorScroll(1000);

                        };

                        //отправка комента,проверка на пустой комент,принимаю объект комента и добавлю в массив комментов
                        vm.sendComment = function () {

                            if(!vm.comment) return;
                            vm.progressbar.start();
                            var commentObj = {taskId:vm.taskId,creatorId:userId,comment:vm.comment,createdDate:new Date()};
                            $http.post(envService.read('apiUrl')+"api/comment",commentObj)
                                .success(function (res) {
                                    vm.comment = "";
                                    commentObj = res;
                                    commentObj.user = $localStorage.user;
                                    vm.comments.unshift(commentObj);
                                    vm.progressbar.complete();
                                })
                                .error(function(err){
                                    console.log(err);
                                    toastr.error("Ошибка подключения","Ошибка");
                                });
                        };
                        //удаление коммента
                        vm.removeComment = function (commentId,i) {
                            console.log(commentId,i);
                            $http.delete(envService.read('apiUrl')+"api/comment/"+commentId)
                                .success(function (res) {
                                    console.log(res);
                                    vm.comments.splice(i,1);
                                })
                                .error(function(err){
                                    console.log(err);
                                    toastr.error("Ошибка подключения","Ошибка");
                                });
                        };
                    })
                    .error(function (err) {
                        console.log(err);
                        toastr.error("Ошибка подключения", "Ошибка");
                    });

        };
        // конец ifTaskId
        //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\


        //Запрос на всех клиентов(Заказчиков)
        $http.get(envService.read('apiUrl')+"api/clients")
            .success(function(response){
                vm.customers = response;
            })
            .error(function(err){
                console.log(err);
                toastr.error("Ошибка","Ошибка подключения!");
            });

        //Запрос на всех юзеров
        $http.get(envService.read('apiUrl')+"api/users")
            .success(function(response){
                vm.users = response;
                //проверка:если пришел taskId вызываем ifTaskId
                if(vm.taskId) getTaskById();
                vm.showContent = true;
            })
            .error(function(err){
                console.log(err);
                toastr.error("Ошибка","Ошибка подключения!");
            });



        //Записываю ответсвенного в vm.task.responsible и удаляю его из массива всех юзеров
        vm.chooseResponsible = function (user) {
                console.log("resp",vm.task.responsible);
                if(vm.task.responsible) vm.users.push(vm.task.responsible);
                console.log("users",vm.users);
                vm.task.responsible = user;
                vm.users.splice(vm.users.indexOf(user),1);

            };

        vm.removeResonsible = function () {
             vm.users.push(vm.task.responsible);
             vm.task.responsible = undefined;
             vm.responsibleText = "";
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

        //когда выбраз заказчика
        vm.chooseCustomer = function (customer) {
            vm.task.customer=customer;
            vm.customerError = false;
        };

        //удаляет из массива юзеров выбраного юзера по айди
        vm.removeFromUsers = function (obj) {
            var index = vm.users.indexOf(obj.user);
            obj.arr.push(vm.users[index]);
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

        //отправляю созданный таск на сервер либо меняю
        vm.createTask = function () {
            if(vm.task){
                if(vm.task.customer && typeof vm.task.customer!=="object"){
                    vm.customerError = true;
                    return;
                }
                //проверка на дату(если есть,то правильно ли введена)
                if(vm.task.deadline!==undefined && vm.task.deadline!=null&&vm.task.deadline!=""){
                    var timestamp=Date.parse(vm.task.deadline );
                    if (isNaN(timestamp)==true) {
                        vm.dateError = true;
                        return;
                    }
                    vm.task.deadline = new Date(timestamp);
                    vm.task.deadline.setHours(vm.currentHour);
                }

                vm.progressbar.start();
                //отправляю айдишки вместо объектов
                vm.task.creator = userId;
                vm.task.responsible = vm.task.responsible._id;
                //из массива объектов преобразую в массив айдишек
                vm.idFromObj(vm.task.performers);
                vm.idFromObj(vm.task.auditors);


                if(vm.taskId){
                    vm.task.case = "edit";
                    $http.put(envService.read('apiUrl')+"api/tasks/"+vm.taskId,vm.task)
                        .success(function(response){
                            vm.task.deadline = $filter('date')(vm.task.deadline,'yyyy-MM-dd');
                            console.log("audiotr perf",response);
                            vm.task.responsible = response.responsible;
                            vm.task.performers = response.performers;
                            vm.task.auditors = response.auditors;
                            toastr.success("","Задача успешно изменена !");
                            vm.progressbar.complete();
                        })
                        .error(function(err){
                            toastr.error("Ошибка подключения","Ошибка");
                            console.log(err);
                        });
                }else{
                    $http.post(envService.read('apiUrl')+"api/tasks",vm.task)
                        .success(function(response){
                            console.log(response);
                            toastr.success("","Задача успешно поставлена !");
                            vm.progressbar.complete();
                            $state.go('tasksList');
                        })
                        .error(function(err){
                            toastr.error("Ошибка подключения","Ошибка");
                            console.log(err);
                        });
                }
            }else{
                toastr.error("ID Задачи не найдено","Ошибка");
            }
        };
    }
}
