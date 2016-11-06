export  class MenuService{
  constructor (){
    var self = this;

    self.menuItems = [
      {
        title : 'Реализация',
        state : 'selling',
        src : '../assets/images/menu_icons/shopping-cart.svg',
        srcRevers : '../assets/images/menu_icons/shopping-cart-revers.svg'
      },
      {
        title : 'Поступление',
        state : 'supply',
        src : '../assets/images/menu_icons/letter.svg',
        srcRevers : '../assets/images/menu_icons/letter-revers.svg'
      },
      {
        title : 'Платежи',
        state : 'payments',
        src : '../assets/images/menu_icons/paper-plane.svg',
        srcRevers : '../assets/images/menu_icons/paper-plane-revers.svg'
      },
      {
        title : 'Кадры',
        state : 'staff',
        src : '../assets/images/menu_icons/staff-symbol.svg',
        srcRevers : '../assets/images/menu_icons/staff-symbol-revers.svg'
      },
      {
        title : 'Прочее',
        state : 'other',
        src : '../assets/images/menu_icons/bill.svg',
        srcRevers : '../assets/images/menu_icons/bill-revers.svg'
      }
      // ,
      //{
      //  title : 'История',
      //  state : 'history',
      //  src : '../assets/images/menu_icons/list.svg',
      //  srcRevers : '../assets/images/menu_icons/list-revers.svg'
      //}
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
