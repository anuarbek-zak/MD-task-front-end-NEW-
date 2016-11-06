export class TasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        this.$http = $http;
        this.$localStorage = $localStorage;
        let userId = $localStorage.user._id;
        console.log("Pawet tasks");
        this.logout = CheckAuthService.logout;
    }
}