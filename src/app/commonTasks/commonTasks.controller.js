export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        // Имитирую юзера John Silver
        userId = "58188d91acb42a09bd838d25";
        //Получаю массив со всеми тасками где текущий юзер является либо аудитором(auditor) либо соисполнителем(performer)
        $http.post(envService.read('apiUrl')+"/api/tasks/general",{_id:userId})
            .success(function(response){
                vm.tasks = response;
            })
            .error(function(err){
                console.log(err);
            });


        this.logout = CheckAuthService.logout;
    }
}
