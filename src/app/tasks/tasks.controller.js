export class TasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        this.$localStorage = $localStorage;
        let userId = $localStorage.user._id;
        // vm.logout = CheckAuthService.logout;
    }
}