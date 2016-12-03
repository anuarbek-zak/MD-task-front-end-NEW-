export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      templateUrl: 'app/main/main.html'
    })
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'vm',
      data: {
        'noLogin': true
      }
    })
    .state('documents', {
      url: '/documents',
      templateUrl: 'app/documents/documents.html',
      controller: 'DocumentsController',
      controllerAs: 'vm',
      parent : 'home'
    })
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'app/tasksList/tasksList.html',
        controller: 'TasksListController',
        controllerAs: 'vm',
        parent : 'documents'
      })
      .state('newTask', {
        url: '/tasks/:taskId',
        templateUrl: 'app/newTask/newTask.html',
        controller: 'NewTaskController',
        controllerAs: 'vm',
        parent : 'documents'
      });

  $urlRouterProvider.otherwise('/');
}
