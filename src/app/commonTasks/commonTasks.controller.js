export class CommonTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';
        var vm = this;
        let userId = $localStorage.user._id;
        vm._id = userId;

        //Получаю массив со всеми тасками где текущий юзер является либо аудитором(auditor) либо соисполнителем(performer)
        $http.post(envService.read('apiUrl')+"/api/tasks/general",{_id:userId})
            .success(function(response){
                vm.tasks = response.reverse();
                console.log(response);
            })
            .error(function(err){
                console.log(err);
            });

        vm.addToFavourites = function (task) {
            $http.post(envService.read('apiUrl')+"/api/tasks/addToFavourites",{_id:task._id,userId:userId})
                .success(function (res) {
                    if(res) task.favourite.push(userId);
                    else {
                        task.favourite.splice(task.favourite.indexOf(userId),1);
                    }
                    console.log(res)
                })
                .error(function (res) {
                    console.log(res);
                });

        };


        // this.logout = CheckAuthService.logout;
    }
}
