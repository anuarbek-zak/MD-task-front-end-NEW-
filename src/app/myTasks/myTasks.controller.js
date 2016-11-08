export class MyTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        userId = "58188d91acb42a09bd838d25";

        $http.post('https://md-tasks.herokuapp.com/api/tasks/my',{userId:userId})
            .success(function(response){
                vm.tasks = response;
            })
            .error(function(err){
                console.log(err);
            });

        vm.outcome = function () {
            // $http.post('https://md-tasks.herokuapp.com/api/tasks/my/outcome',{userId:userId})
            //     .success(function(response){
            //         vm.tasks = response;
            //     })
            //     .error(function(err){
            //         console.log(err);
            //     });

        }

       vm.income = function () {
           // $http.post('https://md-tasks.herokuapp.com/api/tasks/my/income',{userId:userId})
           //     .success(function(response){
           //         vm.tasks = response;
           //     })
           //     .error(function(err){
           //         console.log(err);
           //     });
       }

        vm.addToFavorites = function (id) {
            // $http.post("apiwka",id)
            //     .success(function (res) {
            //         console.log(res);
            //     })
            //     .error(function (res) {
            //         console.log(res);
            //     });


        };
        this.logout = CheckAuthService.logout;
    }
}