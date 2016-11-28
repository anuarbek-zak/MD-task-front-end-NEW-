/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { DocumentsController } from './documents/documents.controller';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { FooterDirective } from '../app/components/footer/footer.directive';
import { MenuDocumentsDirective } from '../app/components/menuDocuments/menuDocuments.directive';
import { DynamicTextArea } from '../app/components/dynamicTextArea/dynamicTextArea.directive';
import { NgEnterDirective } from '../app/components/ngEnter/ngEnter.directive';
import { AcceptedFilter } from '../app/components/acceptedFilter/accepted.filter';
import { MenuService } from '../app/components/menuService/menuService.service';
import { CheckAuthService } from '../app/components/checkAuth/checkAuth.service';
import { NewTaskController } from './newTask/newTask.controller';
import {  TasksListController } from './tasksList/tasksList.controller';


angular.module('ticketMirusDesk', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource',
  'ui.router', 'ngMaterial','ngMdIcons', 'toastr', 'lfNgMdFileInput', 'ui.mask','mgcrea.ngStrap','monospaced.elastic',
  '720kb.datepicker', 'tmh.dynamicLocale', 'ngStorage', 'naif.base64', 'environment', 'base64','ui.bootstrap','ngProgress'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('DocumentsController', DocumentsController)
    .controller('NewTaskController', NewTaskController)
    .controller('TasksListController',  TasksListController)

  .filter('accepted',AcceptedFilter)
  .directive('acmeNavbar', NavbarDirective)
  .directive('mFooter', FooterDirective)
  .directive('mMenuDocuments', MenuDocumentsDirective)
  .directive('dynamicTextArea', DynamicTextArea)
  .directive('ngEnter', NgEnterDirective)
  .service('MenuService', MenuService)
  .service('CheckAuthService', CheckAuthService)

