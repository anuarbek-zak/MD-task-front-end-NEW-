export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        // $http.post('apiwka',userId)
        //     .success(function(response){
        //         vm.tasks = response;
        //     })
        //     .error(function(err){
        //         console.log(err);
        //     });
        vm.tasks = [];
        this.logout = CheckAuthService.logout;
    }
}