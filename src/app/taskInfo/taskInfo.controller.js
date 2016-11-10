export class TaskInfoController{
    constructor($http, $localStorage,$stateParams, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.taskId = $stateParams.taskId;

        //беру инфу о таске
        $http.post(envService.read('apiUrl')+"/api/tasks/task",{_id:vm.taskId,userId:userId})
            .success(function(response){
                vm.task = response;
                console.log(res);
            })
            .error(function(err){
                console.log(err);
            });

        // vm.closeTask = function(){
        //     $http.delete("apiwka",vm.taskId)
        //         .success(function (res) {
        //
        //         })
        //         .error(function (res) {
        //             console.log(res);
        //         })
        // }

        this.logout = CheckAuthService.logout;
    }
}
