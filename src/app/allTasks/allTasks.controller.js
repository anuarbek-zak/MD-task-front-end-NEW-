export class AllTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        let userId = $localStorage.user._id;
        //Запрос на все таски
        $http.get("https://md-tasks.herokuapp.com/api/tasks/all")
            .success(function(response){
                vm.tasks = response;
            })
            .error(function(err){
                console.log(err);
            });

        this.logout = CheckAuthService.logout;
    }
}