export function runBlock ($log, tmhDynamicLocale, CheckAuthService,$rootScope, envService, $localStorage, $state ) {
  'ngInject';
  $log.debug('runBlock end');
  tmhDynamicLocale.set('ru');


  // Здесь мы будем проверять авторизацию
  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
      CheckAuthService.checkAccess(event, toState, toParams, fromState, fromParams);
    }
  );
  // development
  // production
  envService.set('development');

}
