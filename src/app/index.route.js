export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      //url: '',
      templateUrl: 'app/main/main.html'//,
      //controller: 'MainController',
      //controllerAs: 'vm'
    })
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'vm',
      // parent : 'home',
      data: {
        'noLogin': true
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm',
      parent : 'home'
    })
    .state('documents', {
      url: '/documents',
      templateUrl: 'app/documents/documents.html',
      controller: 'DocumentsController',
      controllerAs: 'vm',
      parent : 'home'
    })
    .state('selling', {
      url: '/selling',
      templateUrl: 'app/selling/selling.html',
      controller: 'SellingController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('supply', {
      url: '/supply',
      templateUrl: 'app/supply/supply.html',
      controller: 'SupplyController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('payments', {
      url: '/payments',
      templateUrl: 'app/payments/payments.html',
      controller: 'PaymentsController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('staff', {
      url: '/staff',
      templateUrl: 'app/staff/staff.html',
      controller: 'StaffController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('other', {
      url: '/other',
      templateUrl: 'app/other/other.html',
      controller: 'OtherController',
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
    .state('history', {
      url: '/history',
      templateUrl: 'app/history/history.html',
      controller: 'HistoryController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      parent : 'documents'
    });

  $urlRouterProvider.otherwise('/documents/tasks/myTasks');
}
