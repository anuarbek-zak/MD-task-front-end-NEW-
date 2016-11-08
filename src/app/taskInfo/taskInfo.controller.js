export class TaskInfoController{
    constructor($http, $localStorage,$stateParams, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm.taskId = $stateParams.taskId;

        $http.post('https://md-tasks.herokuapp.com/api/tasks/task',{_id:vm.taskId})
            .success(function(response){
                vm.task = response;
                vm.task.visited = false;
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

        // vm.task = {"performer":
        //     [{"name":"Петя","position":"Прогер","_id":2},
        //         {"name":"Надя","position":"Прогер","_id":4},
        //         {"name":"Ваня","position":"Прогер","_id":6}],
        //     "auditor":
        //         [{"name":"Вася","position":"Бухгалтер","_id":1},
        //             {"name":"Даша","position":"Бухгалтер","_id":5}],
        //     "responsible":[{"name":"Оля","position":"Бухгалтер","_id":3}],
        //     "deadline":"дата",
        //     "name":"Название задачи",
        //     "description":"Здесь суть",
        //     "required":true,
        //     "creator":"",
        //     _id:1};
        this.logout = CheckAuthService.logout;
    }
}