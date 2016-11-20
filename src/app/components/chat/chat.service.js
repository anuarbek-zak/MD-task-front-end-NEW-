export class ChatService{
    constructor(socketFactory, envService){
        'ngInject';
        var vm = this;
        console.log("chat");
        return socketFactory();
    }
}
