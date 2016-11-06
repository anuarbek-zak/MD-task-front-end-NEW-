export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        this.$http = $http;
        this.$localStorage = $localStorage;
        let userId = $localStorage.user._id;
        console.log("Pawet my tasks sd");

        $http.post('apiwka',userId)
            .success(function(response){
                vm.tasks = response;
            })
            .error(function(err){
                console.log(err);
            });
        vm.tasks = [];
        this.logout = CheckAuthService.logout;
    }
}