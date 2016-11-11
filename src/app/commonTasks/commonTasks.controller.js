export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        //Получаю массив со всеми тасками где текущий юзер является либо аудитором(auditor) либо соисполнителем(performer)
        $http.post(envService.read('apiUrl')+"/api/tasks/general",{_id:userId})
            .success(function(response){
                vm.tasks = response.reverse();
            })
            .error(function(err){
                console.log(err);
            });


        // this.logout = CheckAuthService.logout;
    }
}
