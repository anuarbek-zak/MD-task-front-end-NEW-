export class TaskInfoController{
    constructor($http, $localStorage,$stateParams,toastr, CheckAuthService, envService,$anchorScroll, $location){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.taskId = $stateParams.taskId;
        vm.limit =  4;

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
        $http.post(envService.read('apiUrl')+"/api/tasks/task",{_id:vm.taskId,userId:userId})
            .success(function(response){
                cl("task obj",response);
                vm.task = response;
                vm.allMembersCount = vm.task.auditors.length+vm.task.performers.length+1;
            })
            .error(function(err){
                console.log(err);
            });

        //беру все коменты
        $http.post(envService.read('apiUrl')+"/api/comment/all",{taskId:vm.taskId})
            .success(function(response){
                vm.comments = response.reverse();
            })
            .error(function(err){
                console.log(err);
            });

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
            $http.post(envService.read('apiUrl')+"/api/comment/add",commentObj)
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
                    $http.post(envService.read('apiUrl')+"/api/comment/delete",{_id:commentId})
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
