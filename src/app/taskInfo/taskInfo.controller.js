export class TaskInfoController{
    constructor($http, $localStorage,$stateParams,toastr, CheckAuthService, envService,$anchorScroll, $location,$mdDialog,ngProgressFactory){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.userId = userId;
        vm.taskId = $stateParams.taskId;
        vm.progressbar = ngProgressFactory.createInstance();
        vm.progressbar.setHeight('4px');
        vm.progressbar.start();
        //для быстрого вывода
        vm.enableToCreate = function () {
            // if(userId==vm.task.creator._id || userId==vm.task.responsible._id || vm.task.performers.indexOf(userId)>-1 || vm.task.auditors.indexOf(userId)>-1) return true;
            return true;
        };

        //беру инфу о таске
        $http.get(envService.read('apiUrl')+"api/tasks/"+vm.taskId+"/"+userId)
            .success(function(response){
                vm.task = response;
                vm.progressbar.complete();
            })
            .error(function(err){
                console.log(err);
            });










        vm.logout = CheckAuthService.logout;
    }
}
