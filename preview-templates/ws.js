var _WS = {
    client: null,
    room: null,
    ID: null,
    enable: false,
    users: [],
    state: "",
  };
  
  _WS.init = function () {
    _WS.client = new Colyseus.Client("ws://206.189.146.52:2567/");
    //_WS.client = new Colyseus.Client("ws://localhost:2567");
    _WS.room = null;
    _WS.roomID = "";
    _WS.ID = null;
    _WS.enable = false;
    _WS.users = [];
    _WS.state = "";
    setInterval(() => {
      _WS.getLobby();
    }, 10000);
  };
  
  _WS.getLobby = function () {
    _WS.client
      .getAvailableRooms("cardGame")
      .then((rooms) => {
       // console.log("rooms", rooms);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  
  _WS.fnRoom = function (room) {
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
     // if (message.clientID != _WS.ID) {
      console.log("action x1");
        console.log(message);
     // }
    });
    _WS.room.onMessage("start", (message) => {
      _WS.state = "start";
    });
  
    _WS.room.onMessage("startRoom", (message) => {
      console.log("## startRoom");
      console.log(message);
      _WS.state = "start";
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
  };
  var _mess = function (_obj) {
    /*
      {
          type :
          mess : {
              clientID : ..
              mess : ...
          }
      }
      */
    //console.log(_obj); // mess
    var _id = _WS.client.sessionId; //
    if (_id == _obj.clientID) {
      //
      console.log("no");
    } else {
      console.log(_obj);
    }
  };
  _WS.JoinOppo = function () {
    if (_WS.enable) return;
    _WS.client
      .joinOrCreate("cardGame", { user: {}, lock: true })
      .then(function (room) {
        _WS.fnRoom(room);
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  };
  
  _WS.Create = function () {
    if (_WS.enable) return;
    _WS.client
      .create("cardGame", { user: _user.info, lock: false })
      .then(function (room) {
        _WS.fnRoom(room);
        console.log("### START ROOM " + _WS.ID);
        window.location.hash = _WS.roomID;
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  };
  
  _WS.Join = function (_roomID) {
    if (_WS.enable) return;
    _WS.client
      .joinById(_roomID, { user: _user.info, lock: false })
      .then(function (room) {
        _WS.fnRoom(room);
        _GAME.mode = "join";
        console.log("JOIN !!!");
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
        window.location.hash = "";
      });
  };
  
  _WS.getPool = function () {
    const mess = {
      mess: "getPool",
      type: 1,
      value: 1,
    };
    if (_WS.enable) _WS.room.send("action", mess);
  };
  _WS.sendCard = function (_mess) {
    console.log(_mess);
    if (_WS.enable) _WS.room.send("action", _mess);
  };

  _WS.getMatch = function (mess) {
    // const mess = {
    //   mess: "getMatch",
    //   type: 1,
    //   value: 1,
    // };
    if (_WS.enable) _WS.room.send("action", mess);
  };
  
  _WS.start = function (_mess) {
    if (_WS.ID == _WS.users[0].id) {
      if (_WS.enable) _WS.room.send("start", {});
    } else {
      console.log("not host!!!");
    }
    //_WS.users
  };

  
  