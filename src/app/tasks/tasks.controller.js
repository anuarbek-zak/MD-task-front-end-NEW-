export class TasksController{
    constructor(CheckAuthService){
        'ngInject';
        var vm = this;
        vm.logout = CheckAuthService.logout;
    }
}
