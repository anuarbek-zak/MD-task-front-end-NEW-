export class TaskInfoController{
    constructor($http, $localStorage,$stateParams, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.taskId = $stateParams.taskId;
        vm.messages = [];

        //беру инфу о таске
        $http.post(envService.read('apiUrl')+"/api/tasks/task",{_id:vm.taskId,userId:userId})
            .success(function(response){
                vm.task = response;
            })
            .error(function(err){
                console.log(err);
            });

        vm.closeTask = function(){
            $http.delete(envService.read('apiUrl')+"/api/close/"+vm.taskId)
                .success(function (res) {

                })
                .error(function (res) {
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };

        vm.sendMessage = function (message) {
            $http.post(envService.read('apiUrl')+"/api/apiwka/"+userId,{message:message})
                .success(function (res) {
                    vm.messages.push(res);
                })
                .error(function(err){
                    console.log(err);
                    toastr.error("Ошибка подключения","Ошибка");
                });
        };

    }
}
