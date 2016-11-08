export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        userId = "58188d91acb42a09bd838d25";

        // $http.post('apiwka',userId)
        //     .success(function(response){
        //         vm.tasks = response;
        //     })
        //     .error(function(err){
        //         console.log(err);
        //     });


        this.logout = CheckAuthService.logout;
    }
}