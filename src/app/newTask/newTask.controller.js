export class NewTaskController{
    constructor($http, $localStorage, $window, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        this.$http = $http;
        this.$localStorage = $localStorage;
        vm.members = false;
        vm.performers=[];
        vm.auditors = [];
        vm.responsibles = [];

        let userId = $localStorage.user._id;

        console.log("User id is " +userId); 


        $http.get("https://md-tasks.herokuapp.com/api/contragents/all")
            .success(function(response){
                vm.customers = response;
                console.log(response);
            })
            .error(function(err){
                console.log(err);
            });

        $http.get("https://md-tasks.herokuapp.com/api/users/all")
            .success(function(response){
                vm.users = response;
            })
            .error(function(err){
                console.log(err);
            });

        vm.hideMembers = function () {
            vm.users = vm.users.concat(vm.auditors.concat(vm.performers));
            vm.performers=[];
            vm.auditors=[];
            vm.members = !vm.members;
        };

        vm.removeFromUsers = function (id,arr) {
            vm.users.forEach(function (user,i,users) {
                if(user._id==id){
                    users.splice(i,1);
                    arr.push(user);
                }
            });
        };

        // vm.removeFromUsers = function (index,arr) {
        //     console.log(index);
        //     arr.push(vm.users[index]);
        //     vm.users.splice(index,1);
        //     console.log(vm.users);
        //     console.log(arr);
        // };

        vm.addToUsers = function (user,arr) {
          vm.users.push(user);
          arr.splice(arr.indexOf(user),1);
        };

        vm.idToArr = function (fromArr,toArr) {
            fromArr.forEach(function (user,i) {
                toArr[i] = user._id;
            });
        };


        vm.createTask = function (task) {
            if(task){
                task.creator = userId;
                task.performer=[];
                task.auditor = [];
                task.responsible = [];
                vm.idToArr(vm.performers,task.performer);
                vm.idToArr(vm.auditors,task.auditor);
                vm.idToArr(vm.responsibles,task.responsible);
                console.log(task);



                //
                // $http.post("apiwka",id)
                //     .success(function(resposne){
                //
                //     })
                //     .error(function(err){
                //         console.log(err);
                //     });

                alert("Задача успешно поставлена!");
                $window.location.href = "#/tasks/myTasks";
                }else{
                    console.log("OTMENA");
                }
        };
    }
}