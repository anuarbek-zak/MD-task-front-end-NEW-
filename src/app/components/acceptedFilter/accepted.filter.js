export function AcceptedFilter(){
        'ngInject';
        return function(status,bool){
          if(status.accepted===bool) return status.user.name;
    }
}
