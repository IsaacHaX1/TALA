// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
window.Global = {

    // vị trí đánh bài trên bàn
    PlayerSelect: 0,
    TestGame :false,
    
}

window._MyRoom ={
    room : null,
    moveRoom(rooms){
        this.room = rooms;
    },
    cardRoom : null,
    isGamePlay: null,
    soNguoiChoi : 0,
    isStartGame(){
        this.soNguoiChoi =window._MyRoom.cardRoom.mess.users.length;

    },
    ViTriNguoiChoi: null,
    XepVitriNguoiChoi(){
        let MyID = _WS.ID;
        let _users = window._MyRoom.cardRoom.mess.users;
        for (let i = 0; i < _users.length; i++) {
            
            
        }

    },
    nguoiChoiViTriSoMayTrongData(id,data){
        for (let i = 0; i < data.length; i++) {
            
          //  id
        }
    }
}

window._WSL = {
    getLobby(callback){
        _WS.client
        .getAvailableRooms("cardGame")
        .then((rooms) => {
          console.log("rooms xx", rooms);
          callback(rooms);

        })
        .catch((e) => {
          console.error(e);
        });
    },
    JoinOppo(callback){
        if (_WS.enable) return;
        _WS.client
          .joinOrCreate("cardGame", { user: {}, lock: true })
          .then(function (room) {
            _WSL.fnRoom(room);
            callback(room);
          })
          .catch((e) => {
            console.log("JOIN ERROR", e);
          });
    },

    fnRoom(room){
        _WS.enable = true;
        console.log(room.sessionId, "joined", room.name);
        console.log(room);
        _WS.roomID = room.id;
        _WS.ID = room.sessionId;
        _WS.room = room;
        _WS.room.onMessage("join", (message) => {
          _WS.users = message.mess;
          console.log(message.mess);

        });
        _WS.room.onMessage("info", (message) => {
          if (message.clientID != _WS.ID) {
            console.log(message);
          }
        });
        _WS.room.onMessage("mess", (message) => {
          if (message.clientID != _WS.ID) {
            console.log(message.mess.mess);
            var _user = message.mess.mess.user;
            _user.name = _user.firstName + " " + _user.lastName;
            var _context = message.mess.mess.mess;
            _message.send(_user, _context);
          }
        });
        _WS.room.onMessage("action", (message) => {
          if (message.clientID != _WS.ID) {
            console.log(message);
          }
        });
        _WS.room.onMessage("start", (message) => {
          _WS.state = "start";
          console.log(message);
        });
      
        _WS.room.onMessage("startRoom", (message) => {
          console.log("## startRoom");
          console.log(message);
          _WS.state = "start";
          window._MyRoom.isGamePlay = "start";
          window._MyRoom.cardRoom = message;
        });
      
        _WS.room.onMessage("result", (message) => {
          _sound.game_win();
          clearInterval(_GAME.timer);
          $(".progress").hide();
          _WS.state = "result";
        });
        _WS.room.onJoin(function (data) {
          console.log(data);
        });
    }
}


cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
