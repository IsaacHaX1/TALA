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
    this.svThangVuaDanhBai = -1;// chua thang nao danh bai ca
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

  /////
  svBocBai: 0,
  svThangVuaDanhBai: -1,// khoi tao = -1 chua thang nao danh bai 
  CheckTaoBocBai(svdanhbai) {
    //window._MyRoom.CheckTaoBocBai(null);
    
      if(svdanhbai != null) this.svThangVuaDanhBai = svdanhbai;

      if ( this.svThangVuaDanhBai >= (this.soNguoiChoi - 1)) {
        this.svBocBai = 0;
      } else {
        this.svBocBai =  this.svThangVuaDanhBai  + 1;
      }

      let idlocal = this.idlocal(null,this.svBocBai);
    if(idlocal.id == 0){
      console.log("tao dc boc bai ne");
      return true;

    }else{
      return false;

    }

  },
  ThangDauTienBocBai() {

  }
  ////

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

window._Glb = {
  checkMatch(card, arr) {
    console.log(card);
    console.log(arr);

    const checkByValue = function () {
      let newArr = [...arr];
      let sorted = newArr.sort((a, b) => a.value - b.value);
      sorted.push(card);
      let match = 0;
      let matchArr = [];
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].value == card.value) {
          match += 1;
          matchArr.push(sorted[i]);
        }
      }
      if (match >= 3) {
        console.log("checkByValue passed");
        return {
          check: true,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      } else {
        console.log("checkByValue failed");
        return {
          check: false,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      }
    };
    const checkByType = function () {
      let newArr = [];
      const getArrByType = function () {
        let _newArr = [];
        for (var idx in arr) {
          if (arr[idx].type == card.type) {
            _newArr.push(arr[idx]);
          }
        }
        return _newArr;
      };
      newArr = getArrByType();
      newArr.push(card);
      let sorted = newArr.sort((a, b) => a.value - b.value);
      console.log(sorted);
      const getIndexOfCard = function () {
        let indexCard = -1;
        for (let idx in sorted) {
          if (sorted[idx].value == card.value) {
            indexCard = idx;
          }
        }
        return indexCard;
      };
      let matchArr = [];
      const indexCard = parseInt(getIndexOfCard());
      matchArr.push({ index: indexCard, type: card.type, value: card.value });
      const getPrev = function () {
        const lastOne = matchArr[0];
        console.log("lastOne ", lastOne);
        if (lastOne.index <= 0) {
          return;
        }
        const prevOne = sorted[lastOne.index - 1];
        if (prevOne.value == lastOne.value - 1) {
          matchArr.unshift({
            index: lastOne.index - 1,
            type: card.type,
            value: prevOne.value,
          });
          getPrev();
        }
      };
      const getNext = function () {
        const lastOne = matchArr[matchArr.length - 1];
        if (lastOne.index >= sorted.length - 1) {
          return;
        }
        const nextOne = sorted[lastOne.index + 1];
        if (nextOne.value == lastOne.value + 1) {
          matchArr.push({
            index: lastOne.index + 1,
            type: card.type,
            value: nextOne.value,
          });
          getNext();
        }
      };
      getNext();
      getPrev();
      console.log("matchArr ", matchArr);
      console.log("index ", indexCard);
      if (matchArr.length >= 3) {
        return {
          check: true,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      } else {
        return {
          check: false,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      }
    };
    const _checkbyValue = checkByValue();
    const _checkByType = checkByType();
    if (_checkbyValue.check) {
      return _checkbyValue;
    }

    if (_checkByType.check) {
      return _checkByType;
    }

    return {
      check: false,
      card: {
        type: card.type,
        value: card.value,
      },
      pair: [],
    };
  },
  cardObj(_cardNumber) {
    obj = new Object();
    obj.type = Math.floor(_cardNumber / 100);
    obj.value = _cardNumber % 100;
    return obj;
  },
  arrObj(arr) {
    let arrx = [];
    for (let i = 0; i < arr.length; i++) {
      let cardObj = _Glb.cardObj(arr[i].id);
      arrx.push(cardObj);
    }

    return arrx;
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
