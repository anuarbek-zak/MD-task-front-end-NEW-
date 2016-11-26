export class NewTaskController{
    constructor($http, toastr, $localStorage,$state, CheckAuthService, envService,$stateParams,$anchorScroll, $location,$mdDialog ,$filter,ngProgressFactory){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.task = {};
        vm.task.urgent = false;
        vm.task.performers = [];
       vm.task.auditors = [];
        vm.members = false;
        vm.hours = [];
        vm.currentHour = 0;
        vm.showHours=false;
        vm.taskId = $stateParams.taskId=="new"?undefined:$stateParams.taskId;
        console.log(vm.taskId);
        vm.submitText ="Поставить задачу" ;
        vm.progressbar = ngProgressFactory.createInstance();
        vm.progressbar.setHeight('4px');
        vm.progressbar.start();
        vm.limit =  4;
        vm.userAccepted=false;
        //создаю массив часов
        (function () {
            for(var i=0;i<24;i++){
                vm.hours[i] = i;
            }
        })();

        //проверка:если пришел taskId то значит меняем task,если нет,то создаем новый

        var ifTaskId = function () {
                vm.submitText = "Внести изменения";
                $http.get(envService.read('apiUrl')+"api/tasks/"+vm.taskId+"/"+userId)
                    .success(function (response) {
                         console.log(response);
                        vm.task = response;
                        vm.isCreator = (vm.task.creator._id!=userId)?true:false;
                        vm.task.deadline = $filter('date')(vm.task.deadline,'yyyy-MM-dd');
                        vm.task.status.forEach(function (obj) {
                            if(vm.userId==obj.user._id) vm.userAccepted=true;
                        });
                        vm.showRequireBtns = (vm.task.creator._id!=vm.userId&&vm.task.required==false&&!vm.userAccepted)?true:false;
                        //удаляю из массива юзеров всех аудиторов,соисполнителей и ответсвенных
                        //что бы не дублировались
                        var arr = vm.task.performers.concat(vm.task.auditors);
                        arr.push(vm.task.responsible);
                        for (var i = 0; i < arr.length; i++) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (arr[i]._id == vm.users[j]._id) vm.users.splice(j, 1);
                            }
                        }
                        //беру все коменты
                        $http.get(envService.read('apiUrl')+"api/comment/"+vm.taskId)
                            .success(function(response){
                                vm.progressbar.complete();
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
                        vm.canceled = function (ev) {
                            // создаю модалку
                            var confirm = $mdDialog.prompt()
                                .title('Опишите причину отказа')
                                .placeholder('Написать ...')
                                .ariaLabel('Dog name')
                                .targetEvent(ev)
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
                            var commentObj = {taskId:vm.taskId,creatorId:userId,comment:vm.comment,createdDate:new Date()};
                            $http.post(envService.read('apiUrl')+"api/comment",commentObj)
                                .success(function (res) {
                                    commentObj = res;
                                    commentObj.user = $localStorage.user;
                                    vm.comments.unshift(commentObj);
                                    vm.comment = "";
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

        //Запрос на всех клиентов(Заказчиков)
        $http.get(envService.read('apiUrl')+"api/clients")
            .success(function(response){
                vm.customers = response;
            })
            .error(function(err){
                console.log(err);
            });

        //Запрос на всех юзеров
        $http.get(envService.read('apiUrl')+"api/users")
            .success(function(response){
                vm.users  = [
                    {name:"Alex",_id:12},
                    {name:"John",_id:12},
                    {name:"Baha",_id:12},
                    {name:"Anuarbek",_id:12},
                    {name:"Danik",_id:12},
                    {name:"Danik",_id:12},
                    {name:"Ashat",_id:12},
                    {name:"Ersain",_id:12},
                    {name:"Elena",_id:12},
                    {name:"Cemal",_id:12},
                    {name:"Nurbol",_id:12},
                    {name:"Rasul",_id:12},
                    {name:"Kasm",_id:12},
                    {name:"Rauan",_id:12},
                    {name:"Zak",_id:12},
                    {name:"Yak",_id:12}];
                // vm.users = response;
                vm.progressbar.complete();
                //проверка:если пришел taskId то значит меняем task,если нет,то создаем новый
                if(vm.taskId)  {
                    ifTaskId();
                }

            })
            .error(function(err){
                console.log(err);
            });



        //Записываю ответсвенного в vm.task.responsible и удаляю его из массива всех юзеров
        vm.chooseResponsible = function (user) {
                if(vm.task.responsible!="") vm.users.push(vm.task.responsible);
                vm.task.responsible = user;
                vm.users.splice(vm.users.indexOf(user),1);
                if(vm.users.indexOf(undefined)>-1) vm.users.splice(vm.users.indexOf(undefined));
                vm.searchResponsible = user.name;

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
        vm.removeFromUsers = function (user,arr) {
            arr.push(vm.users[vm.users.indexOf(user)]);
            vm.users.splice(vm.users.indexOf(user),1);
            console.log(user);
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

        //проверка на дату(если есть,то правильно ли введена)
        vm.createTask = function () {
            if(vm.task){

                if(vm.task.deadline!==undefined && vm.task.deadline!=null&&vm.task.deadline!=""){
                    var timestamp=Date.parse(vm.task.deadline );
                    if (isNaN(timestamp)==true) {
                        vm.dateError = true;
                        return;
                    }
                    vm.task.deadline = new Date(timestamp);
                    vm.task.deadline.setHours(vm.currentHour);
                }
                if(typeof vm.task.responsible !== 'object'){
                    vm.responsibleError = true;
                    return;
                }
                vm.progressbar.start();
                vm.dateError = false;
                //айди создателя равен айди текущего юзера
                vm.task.creator = userId;
                vm.task.responsible = vm.task.responsible._id;


                //из массива объектов преобразую в массив айдишек
                vm.idFromObj(vm.task.performers);
                vm.idFromObj(vm.task.auditors);


                if(vm.taskId){
                    vm.task.case = "edit";
                    $http.put(envService.read('apiUrl')+"api/tasks/"+vm.taskId,vm.task)
                        .success(function(response){
                            console.log("edit task",response);
                            vm.task.deadline = $filter('date')(vm.task.deadline,'yyyy-MM-dd');
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
               console.log("OTMENA");
            }
        };
    }
}
