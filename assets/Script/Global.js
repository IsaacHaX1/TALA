// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
window.Global = {

  // vị trí đánh bài trên bàn
  PlayerSelect: 0,
  TestGame: false,

}

window._MyRoom = {
  allPlayerCard: [],
  cardOnTable0: [],
  cardOnTable1: [],
  cardOnTable2: [],
  cardOnTable3: [],
  room: null,
  moveRoom(rooms) {
    this.room = rooms;
  },
  cardRoom: null,
  isGamePlay: null,
  soNguoiChoi: 0,
  curUser: '',
  curAction: '',
  isStartGame() {
    this.soNguoiChoi = window._MyRoom.cardRoom.mess.users.length;
    this.XepVitriNguoiChoi();

  },
  viTriNguoiChoi: null,
  vtDoiThu: null,
  XepVitriNguoiChoi() {
    // can sua lai truong hop 3 -4 nguoi choi
    let MyID = _WS.ID;
    let _users = window._MyRoom.cardRoom.mess.users;
    this.viTriNguoiChoi = [];
    this.vtDoiThu = [];

    let vitriUser = _MyRoom.nguoiChoiViTriSoMayTrongData(MyID, _users);
    console.log(vitriUser);
    obj = new Object();
    obj.id = MyID;
    obj.idTrongArr = vitriUser;
    obj.viTriTrenBan = 0;

    this.viTriNguoiChoi.push(obj);

    if (_users.length == 2) {
      for (let i = 0; i < _users.length; i++) {
        if (i != vitriUser) {
          obj = new Object();
          obj.id = _users[i].id;
          obj.idTrongArr = i;
          obj.viTriTrenBan = 1;

          this.vtDoiThu.push(obj);
          this.viTriNguoiChoi.push(obj);
        }

      }
    }

    if (_users.length == 3) {
      for (let i3 = 0; i3 < 2; i3++) {
        for (let i = 0; i < _users.length; i++) {
          //if (i3 == 0) {
          let vitriplayer1 = vitriUser + i + 1;
          if (vitriUser + i + 1 > 2) vitriplayer1 = 0;
          if (i == vitriplayer1) {
            obj = new Object();
            obj.id = _users[i].id;
            obj.idTrongArr = i;
            obj.viTriTrenBan = i + 1;

            this.viTriNguoiChoi.push(obj);
          }
          //      }
        }

      }

    }

    if (_users.length == 4) {
      for (let i3 = 0; i3 < 3; i3++) {
        for (let i = 0; i < _users.length; i++) {
          //if (i3 == 0) {
          let vitriplayer1 = vitriUser + i + 1;
          if (vitriUser + i + 1 > _users.length - 1) vitriplayer1 = 0;
          if (i == vitriplayer1) {
            obj = new Object();
            obj.id = _users[i].id;
            obj.idTrongArr = i;
            obj.viTriTrenBan = i + 1;

            this.viTriNguoiChoi.push(obj);
          }
          //      }
        }

      }

    }

    return this.viTriNguoiChoi;

  },
  idlocal(_id, _idsv) { /// ID // _WS.ID id người chơi
    obj = new Object();
    obj.info = "id người chơi trên bàn, user id 0";
    for (let i = 0; i < window._MyRoom.viTriNguoiChoi.length; i++) {
      if (_id != null) {
        if (window._MyRoom.viTriNguoiChoi[i].id == _id) {
          obj.id = window._MyRoom.viTriNguoiChoi[i].viTriTrenBan;
          return obj;
        }
      }
      if (_idsv != null) {
        if (window._MyRoom.viTriNguoiChoi[i].idTrongArr == _idsv) {
          obj.id = window._MyRoom.viTriNguoiChoi[i].viTriTrenBan;
          return obj;
        }
      }
    }

  },
  idsv(_id, _idlocal) { /// id trong array
    obj = new Object();
    obj.info = "id người chơi trong array users";
    for (let i = 0; i < window._MyRoom.viTriNguoiChoi.length; i++) {
      if (_id != null) {
        if (window._MyRoom.viTriNguoiChoi[i].id == _id) {
          obj.id = window._MyRoom.viTriNguoiChoi[i].idTrongArr;
          return obj;
        }
      }
      if (_idlocal != null) {
        if (window._MyRoom.viTriNguoiChoi[i].viTriTrenBan == _idlocal) {
          obj.id = window._MyRoom.viTriNguoiChoi[i].idTrongArr;
          return obj;
        }
      }
    }

  },

  nguoiChoiViTriSoMayTrongData(xid, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == xid) return i;
      //  id
    }
  },

}

window._WSL = {
  getLobby(callback) {
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
  JoinOppo(callback) {
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

  fnRoom(room) {
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
      //console.log(message);
      var callGP = cc.find("Canvas/GamePlay");
      callGP.getComponent("GamePlayCtrl").checkMessGlobal(message);

    });
    _WS.room.onMessage("start", (message) => {
      _WS.state = "start";
      window._MyRoom.curUser = message.mess.userID;
      window._MyRoom.curAction = message.mess.action;
      console.log(message);
    });

    _WS.room.onMessage("startRoom", (message) => {
      console.log("## startRoom");
      _WS.state = "start";
      window._MyRoom.isGamePlay = "start";
      window._MyRoom.cardRoom = message;
      window._MyRoom.curUser = message.userID;
      window._MyRoom.curAction = message.mess.action;
      console.log(message);
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

  start() {

  },

  // update (dt) {},
});
