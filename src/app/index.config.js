export function config ($logProvider, toastrConfig, $mdThemingProvider, tmhDynamicLocaleProvider, $httpProvider, envServiceProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  $httpProvider.defaults.timeout = 90000000000;

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';

  //toastrConfig.preventDuplicates = true;
  // toastrConfig.progressBar = true;

  //tmhDynamicLocaleProvider.set('ru');
  tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.5.8/angular-locale_ru-ru.js');
  $mdThemingProvider.theme('default')
      .primaryPalette('blue')


  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      development: ['localhost'],
      production: []
    },
    vars: {
      development: {
        apiUrl: 'https://md-tasks.herokuapp.com/'
      },
      localhost: {
        apiUrl: '192.168.43.125:8083/'
      },
      production: {
        apiUrl: 'http://159.203.234.82:8083/'
      }
    }
  });
  envServiceProvider.check();
}
