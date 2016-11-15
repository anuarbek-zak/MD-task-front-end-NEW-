export class AllTasksController{
    constructor($http, $localStorage, CheckAuthService, envService){
        'ngInject';

        var vm = this;
        let userId = $localStorage.user._id;
        //Запрос на все таски
        vm.tasks =  [{"_id":"5826fd48bd76f60004f2f19e","name":"Task","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"17 November 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"]},{"_id":"5826e43bb9766600040e784b","name":"Task 12","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"07 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":[]},{"_id":"5825ebbf6f81d9000465c3bf","name":"Sdelat krasivo","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"11 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":["581c4bf33afb2fcb15258c5b"]},{"_id":"5825e3326f81d9000465c3be","name":"Task 10","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"01 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581c4bf33afb2fcb15258c5b"]},{"_id":"5824b83df83a860004bbca29","name":"Task 35","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"01 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":[]},{"_id":"582476d28c285b000452ae54","name":"Tasks 34","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"16 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":[]},{"_id":"5824661e6cf76200047b0965","name":"Task 4","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"deadline":"10 ноября 2016","visited":["581c4bf33afb2fcb15258c5b","581719b420bdaab829d07443"],"favourite":["581719b420bdaab829d07443"]},{"_id":"582461ec7472860004423d12","name":"Task 3","creator":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"responsible":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":[]},{"_id":"58245102bed6260004a5a9eb","name":"Task1","creator":{"_id":"581c4bf33afb2fcb15258c5b","name":"John Silver"},"responsible":{"_id":"581719b420bdaab829d07443","name":"Alex Petrov"},"deadline":"01 ноября 2016","visited":["581719b420bdaab829d07443","581c4bf33afb2fcb15258c5b"],"favourite":["581719b420bdaab829d07443"]}];

        // $http.get(envService.read('apiUrl')+"/api/tasks/all")
        //     .success(function(response){
        //         vm.tasks = response.reverse();
        //     })
        //     .error(function(err){
        //         console.log(err);
        //     });

        // this.logout = CheckAuthService.logout;
    }
}
