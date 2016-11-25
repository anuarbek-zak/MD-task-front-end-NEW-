export class TaskInfoController{
    constructor($http, $localStorage,$stateParams,toastr, CheckAuthService, envService,$anchorScroll, $location,$mdDialog,ngProgressFactory){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.taskId = $stateParams.taskId;
        vm.limit =  4;
        vm.userAccepted=false;
        vm.progressbar = ngProgressFactory.createInstance();
        vm.progressbar.setHeight('4px');
        vm.progressbar.start();
        //для быстрого вывода
        var cl = function (a="",b) {
            console.log("-----------");
            console.log(a,b);
        };
        cl(userId);
        vm.enableToCreate = function () {
            // if(userId==vm.task.creator._id || userId==vm.task.responsible._id || vm.task.performers.indexOf(userId)>-1 || vm.task.auditors.indexOf(userId)>-1) return true;
            return true;
        };

        //беру инфу о таске
        $http.get(envService.read('apiUrl')+"/api/tasks/"+vm.taskId+"/"+userId)
            .success(function(response){
                cl("task obj",response);
                vm.task = response;
                vm.progressbar.complete();
                vm.task.status.forEach(function (obj) {
                   if(vm.userId==obj.user._id) vm.userAccepted=true;
                });
                vm.showRequireBtns = (vm.task.creator._id!=vm.userId&&vm.task.required==false&&!vm.userAccepted)?true:false;
            })
            .error(function(err){
                console.log(err);
            });

        //беру все коменты
        $http.get(envService.read('apiUrl')+"/api/comment/"+vm.taskId)
            .success(function(response){
                vm.comments = response.reverse();
            })
            .error(function(err){
                console.log(err);
            });

        //когда принял таск
        vm.accepted = function (taskId=vm.taskId,userId=vm.userId,comment="",accepted=true,statusText="Задача принята") {
            $http.put(envService.read('apiUrl')+"/api/tasks/"+vm.taskId,{case:"accept",userId:userId,comment:comment,accepted:accepted})
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
            cl("elem ",document.getElementById("createTextArea"));
            document.getElementById("createTextArea").focus();
            $location.hash("createTextArea");
            $anchorScroll(1000);

        };

        //отправка комента,проверка на пустой комент,принимаю объект комента и добавлю в массив комментов
        vm.sendComment = function () {
            if(!vm.comment) return;
            var commentObj = {taskId:vm.taskId,creatorId:userId,comment:vm.comment,createdDate:new Date()};
            $http.post(envService.read('apiUrl')+"/api/comment",commentObj)
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
                    $http.delete(envService.read('apiUrl')+"/api/comment/"+commentId)
                        .success(function (res) {
                            console.log(res);
                            vm.comments.splice(i,1);
                        })
                        .error(function(err){
                            console.log(err);
                            toastr.error("Ошибка подключения","Ошибка");
                        });
                };

        // vm.closeTask = function(){
        //     $http.delete(envService.read('apiUrl')+"/api/close/"+vm.taskId)
        //         .success(function (res) {
        //             console.log(res);
        //         })
        //         .error(function (res) {
        //             console.log(err);
        //             toastr.error("Ошибка подключения","Ошибка");
        //         });
        // };
    }
}
