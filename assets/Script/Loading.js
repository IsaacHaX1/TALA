// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { log } = require("console");

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
        chuPhong: false,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.ShowLoading();
    },
    ShowLoading() {
        //  this.node.getChildByName("loadingpro").active = true;
        this.node.getChildByName("Ready").active = true;

        this.node.getChildByName("JoinRoom").active = false;
        this.node.getChildByName("loadingpro").active = false;
        this.node.getChildByName("btn_play").active = false;
        window._MyRoom.isGamePlay = null;


    },
    btnReady() {
        var self = this;
        // this.getLobby(function(res){
        //     console.log("roomx ",res);
        //     self.JoinOppoX();

        // })
        _WSL.getLobby(function (params) {
            //console.log("roomx2 ",params);
            if (params.length <= 0) _WSL.JoinOppo(function (res) {
                console.log(res);
                if (res.hasJoined) {
                    _MyRoom.room = res;
                    console.log("My room");
                    console.log(_MyRoom.room);
                    self.chuPhong = true;
                    self.nguoiChoiCheck();
                    self.soNguoi(1);
                    //self.node.getChildByName("btn_play").active = true;
                }
            });
            else self.node.getChildByName("JoinRoom").active = true;
        });
        self.node.getChildByName("Ready").active = false;
        self.node.getChildByName("loadingpro").active = true;

    },
    btnJoinRoom() {
        var self = this;
        _WSL.JoinOppo(function (res) {
            console.log(res);
            if (res.hasJoined) {
                _MyRoom.room = res;
                console.log("join to room");
                console.log(_MyRoom.room);
                self.node.getChildByName("JoinRoom").active = false;
                self.nguoiChoiCheck();
                self.txtKhach();
            }
        });
    },
    btnPlay() {
        _WS.start();
        
    },
    nguoiChoiCheck() {
        var self = this;
        //
        self.schedule(function () {
            var sng = _WS.users.length;
            self.soNguoi(sng);
            if (self.chuPhong) {
                // chu phong
                if (!self.node.getChildByName("btn_play").active) {
                    if (sng >= 2) {
                        self.playbtnActive();
                    }
                }

                if(window._MyRoom.isGamePlay == "start"){
                   if( window._MyRoom.cardRoom != null){
                    self.StartGame();
                   }

                }
            }else{
                // may khach
                
                if(window._MyRoom.isGamePlay == "start"){
                    if( window._MyRoom.cardRoom != null){
                        self.StartGame();
                   }
                }
            }
        }, 2)

    },


    StartGame(){
        this.isStartGame();
        this.node.parent.getChildByName("GamePlay").active = true;
        this.node.active = false;
    },


    playbtnActive() {
        var self = this;
        self.node.getChildByName("btn_play").active = true;
        self.node.getChildByName("Ready").active = false;

        self.node.getChildByName("JoinRoom").active = false;
        self.node.getChildByName("loadingpro").active = false;

    },

    soNguoi(num) {
        var txt = "Số Người trong phòng : ";
        this.node.getChildByName("SoNguoi").getComponent(cc.Label).string = txt + num;


    },
    txtKhach() {
        var txt = "Chờ chủ phòng sẵn sàng";
        this.node.getChildByName("SoNguoi").getComponent(cc.Label).string = txt;

    }



    // update (dt) {},
});
