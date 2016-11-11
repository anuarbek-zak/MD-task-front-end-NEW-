/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { RegisterController } from './register/register.controller';
import { DocumentsController } from './documents/documents.controller';
import { SellingController } from './selling/selling.controller';
import { SupplyController } from './supply/supply.controller';
import { PaymentsController } from './payments/payments.controller';
import { StaffController } from './staff/staff.controller';
import { OtherController } from './other/other.controller';
import { HistoryController } from './history/history.controller';
import { SettingsController } from './settings/settings.controller';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { FooterDirective } from '../app/components/footer/footer.directive';
import { MenuDocumentsDirective } from '../app/components/menuDocuments/menuDocuments.directive';
import { TypeClientDirective } from '../app/components/typeClient/typeClient.directive';
import { DynamicTextArea } from '../app/components/dynamicTextArea/dynamicTextArea.directive';

import { MenuService } from '../app/components/menuService/menuService.service';
import { CheckAuthService } from '../app/components/checkAuth/checkAuth.service';
import { NewTaskController } from './newTask/newTask.controller';
import {  TasksController } from './tasks/tasks.controller';
import {  MyTasksController } from './myTasks/myTasks.controller';
import {  CommonTasksController } from './commonTasks/commonTasks.controller';
import {  AllTasksController } from './allTasks/allTasks.controller';
import {  TaskInfoController } from './taskInfo/taskInfo.controller';




angular.module('taskMirusDesk', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource',
  'ui.router', 'ngMaterial', 'toastr', 'lfNgMdFileInput', 'ui.mask','mgcrea.ngStrap','monospaced.elastic',
  '720kb.datepicker', 'tmh.dynamicLocale', 'ngStorage', 'naif.base64', 'environment'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('RegisterController', RegisterController)
  .controller('DocumentsController', DocumentsController)
  .controller('SellingController', SellingController)
  .controller('SupplyController', SupplyController)
  .controller('PaymentsController', PaymentsController)
  .controller('StaffController', StaffController)
  .controller('OtherController', OtherController)
  .controller('HistoryController', HistoryController)
  .controller('SettingsController', SettingsController)
    .controller('NewTaskController', NewTaskController)
    .controller('TasksController',  TasksController)
    .controller('MyTasksController',  MyTasksController)
    .controller('AllTasksController', AllTasksController)
    .controller('CommonTasksController', CommonTasksController)
    .controller('TaskInfoController', TaskInfoController)


  .directive('acmeNavbar', NavbarDirective)
  .directive('mFooter', FooterDirective)
  .directive('mMenuDocuments', MenuDocumentsDirective)
  .directive('mTypeClient', TypeClientDirective)
  .directive('dynamicTextArea', DynamicTextArea)

  .service('MenuService', MenuService)
  .service('CheckAuthService', CheckAuthService);

