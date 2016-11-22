export class TaskInfoController{
    constructor($http, $localStorage,$stateParams,toastr, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.taskId = $stateParams.taskId;
        vm.limit =  4;
        console.log(vm.userId);
        //беру инфу о таске
        $http.post(envService.read('apiUrl')+"/api/tasks/task",{_id:vm.taskId,userId:userId})
            .success(function(response){
                vm.task = response;
            })
            .error(function(err){
                console.log(err);
            });
        //беру все коменты
        $http.post(envService.read('apiUrl')+"/api/comment/all",{taskId:vm.taskId})
            .success(function(response){
                console.log(response);
                vm.comments = response;
            })
            .error(function(err){
                console.log(err);
            });


        vm.sendComment = function (comment) {
            console.log(new Date(),comment);
            var commentObj = {taskId:vm.taskId,creatorId:userId,comment:comment,createdDate:new Date()};
            $http.post(envService.read('apiUrl')+"/api/comment/add",commentObj)
                .success(function (res) {
                    commentObj = res;
                    commentObj.user = $localStorage.user;
                    vm.comments.push(commentObj);
                    comment = "";
                })
                .error(function(err){
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };

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

        vm.closeTask = function(){
            $http.delete(envService.read('apiUrl')+"/api/close/"+vm.taskId)
                .success(function (res) {
                    console.log(res);
                })
                .error(function (res) {
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };
    }
}
