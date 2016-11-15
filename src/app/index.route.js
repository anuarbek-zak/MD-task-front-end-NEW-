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
    .state('ticket', {
      url: '/ticket',
      templateUrl: 'app/ticket/ticket.html',
      controller: 'TicketController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('ticketDetail', {
      url: '/ticket/:id',
      templateUrl: 'app/ticketDetail/ticketDetail.html',
      controller: 'TicketDetailController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      parent : 'documents'
    })
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'app/tasks/tasks.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        parent : 'documents'
      })
      .state('taskInfo', {
        url: '/taskInfo/:taskId',
        templateUrl: 'app/taskInfo/taskInfo.html',
        controller: 'TaskInfoController',
        controllerAs: 'vm',
        parent : 'documents'
      })
      .state('newTask', {
        url: '/newTask',
        templateUrl: 'app/newTask/newTask.html',
        controller: 'NewTaskController',
        controllerAs: 'vm',
        parent : 'documents'
      })
      .state('myTasks', {
        url: '/myTasks',
        templateUrl: 'app/myTasks/myTasks.html',
        controller: 'MyTasksController',
        controllerAs: 'vm',
        parent : 'tasks'
      })
      .state('allTasks', {
        url: '/allTasks',
        templateUrl: 'app/allTasks/allTasks.html',
        controller: 'AllTasksController',
        controllerAs: 'vm',
        parent : 'tasks'
      })
      .state('commonTasks', {
        url: '/commonTasks',
        templateUrl: 'app/commonTasks/commonTasks.html',
        controller: 'CommonTasksController',
        controllerAs: 'vm',
        parent : 'tasks'
      })
  ;

  $urlRouterProvider.otherwise('/');
}
