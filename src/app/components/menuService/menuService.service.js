export  class MenuService{
  constructor (){
    var self = this;

    self.menuItems = [
      {
        title : 'Заявки',
        state : 'selling',
        src : '../assets/images/menu_icons/shopping-cart.svg',
        srcRevers : '../assets/images/menu_icons/shopping-cart-revers.svg'
      },
      {
        title : 'Задачи',
        state : 'tasks',
        src : '../assets/images/menu_icons/letter.svg',
        srcRevers : '../assets/images/menu_icons/letter-revers.svg'
      },
      {
        title : 'Обсуждение',
        state : 'payments',
        src : '../assets/images/menu_icons/paper-plane.svg',
        srcRevers : '../assets/images/menu_icons/paper-plane-revers.svg'
      },
      {
        title : 'Сотрудники',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Дела',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Клиенты',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Сделки',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Счета',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Документы',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Отчеты',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Письма',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      }
    ];

    self.menuObject = {
      'selling': 'Реализация',
      'supply': 'Поступление',
      'payments': 'Платежи',
      'staff': 'Кадры',
      'other': 'Прочее'
    };

  }
}
