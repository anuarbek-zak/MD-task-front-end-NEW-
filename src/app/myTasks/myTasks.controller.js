export class MyTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        userId = "581c4bf33afb2fcb15258c5b";

        vm.getTasks = function (responsible=true,creator=true,favourite=false,urgent=false) {
            console.log("HWllo");
            $http.post('https://md-tasks.herokuapp.com/api/tasks/filterBy',
                {_id:userId,responsible:responsible,creator:creator,favourite:favourite,urgent:urgent})
                .success(function(response){
                    vm.tasks = response;
                })
                .error(function(err){
                    console.log(err);
                });
        };

        vm.getTasks();
        vm.addToFavourites = function (task) {
            $http.post("https://md-tasks.herokuapp.com/api/tasks/addToFavourites",{_id:task._id})
                .success(function (res) {
                    task.favourite = res;
                })
                .error(function (res) {
                    console.log(res);
                });

        };
        this.logout = CheckAuthService.logout;
    }
}