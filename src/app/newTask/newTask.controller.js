export class NewTaskController{
    constructor($http, $localStorage, $window, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        this.$http = $http;
        this.$localStorage = $localStorage;
        vm.members = false;
        vm.performers=[];
        vm.auditors = [];
        vm.responsible="";
        let userId = $localStorage.user._id;

        userId = "58188d91acb42a09bd838d25";
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

        vm.chooseResponsible = function (id) {
            if(vm.responsible==""){
                vm.users.forEach(function (user,i,users) {
                    if(user._id==id){
                        vm.responsible = user;
                        users.splice(i,1)
                    }
                });
            }else{
                vm.users.push(vm.responsible);
                vm.users.forEach(function (user,i,users) {
                    if(user._id==id){
                        vm.responsible = user;
                        users.splice(i,1)
                    }
                });
            }
        }

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
                task.performer = [];
                task.auditor = [];
                task.creator = userId;
                vm.idToArr(vm.performers,task.performer);
                vm.idToArr(vm.auditors,task.auditor);
                console.log(task);
                $http.post("https://md-tasks.herokuapp.com/api/tasks/create",task)
                    .success(function(response){
                        console.log(response);
                    })
                    .error(function(err){
                        console.log(err);
                    });

                alert("Задача успешно поставлена!");
                // $window.location.href = "#/tasks/myTasks";
                }else{
                    console.log("OTMENA");
                }
        };
    }
}