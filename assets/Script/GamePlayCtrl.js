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
        card: cc.Prefab,
        cardList: null,
        allPlayerCard: [],
        cardOnTable0: [],
        phom0: [],
        phom1: [],
        phom2: [],
        phom3: [],
        cardOnTable1: [],
        cardOnTable2: [],
        cardOnTable3: [],

        idNguoiChoi: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.phom0 = playerX.phom0;
        this.phom1 = playerX.phom1;
        this.phom2 = playerX.phom2;
        this.phom3 = playerX.phom3;
    },

    start() {
        this.needUpdate = false;
        //this.checkMess();
        // Open the collision manager, without this part statement you will not detect any collision.
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.CheckBocBai();

    },
    backToLoading() {
        cc.find("Canvas").getComponent("InitGame").ShowLoading();
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        //ShowLoading()
    },
    addCardList() {
        let arr = [];
        let pool = window._MyRoom.cardRoom.mess.pool;
        for (let i = 0; i < pool.length; i++) {
            let _type = pool[i].type;
            let _value = pool[i].value;
            arr.push(_type * 100 + _value);

        }
        return arr;
    },

    addAllPlayCard() {

        let _users = window._MyRoom.cardRoom.mess.users;


        let vitri = window._MyRoom.viTriNguoiChoi;
        for (let i = 0; i < vitri.length; i++) {
            _MyRoom.allPlayerCard[i] = [];
            let arrvt = vitri[i].idTrongArr;
            for (let j = 0; j < _users[arrvt].cards.length; j++) {
                let _type = _users[arrvt].cards[j].type;
                let _value = _users[arrvt].cards[j].value;

                var cardObj = new Object();
                cardObj.id = _type * 100 + _value;
                cardObj.cardStatus = 0;
                _MyRoom.allPlayerCard[i].push(cardObj)

            }

        }



    },

    TraoBai() {
        _MyRoom.cardOnTable0 = [];
        _MyRoom.cardOnTable1 = [];
        _MyRoom.cardOnTable2 = [];
        _MyRoom.cardOnTable3 = [];
        let SoNguoiChoi = window._MyRoom.soNguoiChoi;

        // an hien avata nguoi choi tren ban
        let _user = this.node.getChildByName("Hud").getChildByName("user");
        for (let i = 0; i < _user.children.length; i++) {
            if ((i + 1) > SoNguoiChoi) _user.children[i].active = false;
            else _user.children[i].active = true;

        }

        // Bo bai
        // for (let i = 1; i < 5; i++) {
        //     for (let j = 0; j < 13; j++) {
        //         _cardlist.push(i * 100 + j);
        //     }
        // }

        this.cardList = this.addCardList();

        // chia bai
        let _addAllPlayCard = this.addAllPlayCard();
        console.log(_MyRoom.allPlayerCard);
        console.log(this.cardList);
        this.ChiaBaiLanDau(true);

    },
    ChiaBaiLanDau() {
        var self = this;
        var CardTable = this.node.getChildByName("CardTable");
        // xóa hết bài trên bàn
        for (let i = 0; i < 8; i++) {
            var playerx = CardTable.children[i];
            playerx.removeAllChildren(true);
        }

        for (let i = 0; i < _MyRoom.allPlayerCard.length; i++) {
            var playerx = CardTable.children[i * 2];

            var cardOf1Player = _MyRoom.allPlayerCard[i];

            for (let j = 0; j < cardOf1Player.length; j++) {
                var posix = player0123[i].posiCard[0];
                var posiy = player0123[i].posiCard[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy);
                var _cardx = _MyRoom.allPlayerCard[i][j];
                cardpf.getComponent("card").VeLaBai(_cardx.id, _cardx.id, i);
                cardpf.getComponent("card").hieuUngChiaBai1();

                playerx.addChild(cardpf);
            }

        }

        self.scheduleOnce(function () {
            var set = this.node.getChildByName("CardTable").getChildByName("set");
            set.getComponent("set").startAnimationChiabai();

        }, 1)
    },
    LatBaiVuaChia() {
        var Player0 = this.node.getChildByName("CardTable").getChildByName("Player0");
        for (let i = 0; i < Player0.children.length; i++) {
            Player0.children[i].getComponent("card").latlabai();
        }

    },
    ChiaBai() {
        var CardTable = this.node.getChildByName("CardTable");
        // xóa hết bài trên bàn
        for (let i = 0; i < 8; i++) {
            var playerx = CardTable.children[i];
            playerx.removeAllChildren(true);
        }
        console.log(_MyRoom.allPlayerCard);
        for (let i = 0; i < _MyRoom.allPlayerCard.length; i++) {
            var playerx = CardTable.children[i * 2];

            var cardOf1Player = _MyRoom.allPlayerCard[i];

            for (let j = 0; j < cardOf1Player.length; j++) {
                var posix = player0123[i].posiCard[0];
                var posiy = player0123[i].posiCard[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy);
                var _cardx = _MyRoom.allPlayerCard[i][j];
                cardpf.getComponent("card").VeLaBai(_cardx.id, _cardx.id, i);
                // cardpf.getComponent("card").hieuUngChiaBai1();

                playerx.addChild(cardpf);
            }

        }

        this.VeLaiBaiTrenBan();


    },
    VeLaiBaiTrenBan() {
        var CardTable = this.node.getChildByName("CardTable");
        for (let i1 = 0; i1 < 4; i1++) {
            var playerM = CardTable.children[i1 * 2 + 1];

            var cardOf1Player = _MyRoom.cardOnTable0;
            if (i1 == 1) cardOf1Player = _MyRoom.cardOnTable1;
            if (i1 == 2) cardOf1Player = _MyRoom.cardOnTable2;
            if (i1 == 3) cardOf1Player = _MyRoom.cardOnTable3;
            for (let j1 = 0; j1 < cardOf1Player.length; j1++) {
                var posix = player0123[i1].posiCardM[0] + (j1 + 1) * 25;
                var posiy = player0123[i1].posiCardM[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy);
                cardpf.setScale(0.7);

                console.log(cardOf1Player[j1]);
                var obj = new Object();
                obj.type = Math.floor(cardOf1Player[j1] / 100);
                obj.value = cardOf1Player[j1] % 100;
                obj.idCard = cardOf1Player;
                obj.idPlayer = i1;

                cardpf.getComponent("card").DanhLabai(obj)
                playerM.addChild(cardpf);
                // this.type = selfx.type;
                // this.value = selfx.value;
                // this.idCard = selfx.idCard;
                // this.idPlayer = selfx.idPlayer;

            }


        }
    },

    AnPhom() {
        var self = this;
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        var tableCard = this.node.getChildByName("CardTable").getChildByName("PlayerM0");
        var handCard = this.node.getChildByName("CardTable").getChildByName("Player0");
        var cardObj = new Object();
        if (_MyRoom.allPlayerCard.length == 4) {
            var lengthx = _MyRoom.cardOnTable3.length;
            if (lengthx > 0) {
                //var cardObj = new Object();
                cardObj.id = _MyRoom.cardOnTable3[lengthx - 1];
                cardObj.cardStatus = 1000;

                _MyRoom.allPlayerCard[0].push(cardObj);
                _MyRoom.cardOnTable3.splice(lengthx - 1, 1);
                tableCard = this.node.getChildByName("CardTable").getChildByName("PlayerM3");
                //   this.ChiaBai(false);
            }

        }

        if (_MyRoom.allPlayerCard.length == 3) {
            var lengthx = _MyRoom.cardOnTable2.length;
            if (lengthx > 0) {
                //var cardObj = new Object();
                cardObj.id = _MyRoom.cardOnTable2[lengthx - 1];
                cardObj.cardStatus = 1000;

                _MyRoom.allPlayerCard[0].push(cardObj);
                _MyRoom.cardOnTable2.splice(lengthx - 1, 1);
                tableCard = this.node.getChildByName("CardTable").getChildByName("PlayerM2");

                // this.ChiaBai(false);
            }

        }

        if (_MyRoom.allPlayerCard.length == 2) {
            var lengthx = _MyRoom.cardOnTable1.length;
            if (lengthx > 0) {
                //var cardObj = new Object();
                cardObj.id = _MyRoom.cardOnTable1[lengthx - 1];
                cardObj.cardStatus = 1000;

                _MyRoom.allPlayerCard[0].push(cardObj);
                _MyRoom.cardOnTable1.splice(lengthx - 1, 1);
                tableCard = this.node.getChildByName("CardTable").getChildByName("PlayerM1");

                // this.ChiaBai(false);
            }

        }

        let xPos = tableCard.children[lengthx - 1].x;
        let yPos = tableCard.children[lengthx - 1].y;
        tableCard.children[lengthx - 1].destroy();

        var obj = new Object();
        obj.type = Math.floor(cardObj.id / 100);
        obj.value = cardObj.id % 100;
        obj.idCard = cardObj.id;
        obj.idPlayer = 0;
        obj.coc = 0;

        var userIcon = cc.instantiate(this.card);
        userIcon.setPosition(xPos, yPos);
        userIcon.getComponent("card").DanhLabai(obj)
        tableCard.addChild(userIcon);
        
        _WS.getMatch(_Glb.cardObj(cardObj.id));

        // an an phom
        this.node.getChildByName("Button").getChildByName("anphom").active = false;


        //showbt danh bai
        _MyRoom.curAction = 'after';
        _MyRoom.curUser = _WS.ID;
        this.checkMessX();
        //tao vua boc bai
        let idsv = _MyRoom.idsv(_WS.ID)
        window._MyRoom.CheckTaoBocBai(idsv.id);
        
        this.CheckBocBai();
        self.scheduleOnce(function () {
            userIcon.setScale(1);
            var actionBy = cc.moveTo(0.5, cc.v2(player0123[0].posiCard[0], player0123[0].posiCard[1]));
            userIcon.runAction(actionBy);
        }, 0.1);
        //console.log(tableCard);
        //this.node.getChildByName("CardTable").getChildByName("PlayerM0");
        //console.log(_MyRoom.cardOnTable0 + "|" + _MyRoom.cardOnTable1 + "|" + _MyRoom.cardOnTable2 + "|" + _MyRoom.cardOnTable3);

      

    },
    checkmatchx(_cardNumber){

        var checkm = window._Glb.checkMatch( _Glb.cardObj(_cardNumber) ,_Glb.arrObj(_MyRoom.allPlayerCard[0]));
        if(checkm.check){
            console.log(checkm);
            console.log(" an luon")
           this.node.getChildByName("Button").getChildByName("anphom").active = true;

        }else this.node.getChildByName("Button").getChildByName("anphom").active = false;
        return checkm;
    },
    addCardOnTable(_cardNumber, _idplayer) {
        if (_idplayer == 0) {
            _MyRoom.cardOnTable0.push(_cardNumber);

        }

        if (_idplayer == 1) {
            _MyRoom.cardOnTable1.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 2) {
                this.checkmatchx(_cardNumber);
            }
        }
        if (_idplayer == 2) {
            _MyRoom.cardOnTable2.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 3) {
                this.checkmatchx(_cardNumber);
            }
        }
        if (_idplayer == 3) {
            _MyRoom.cardOnTable3.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 4) {
                this.checkmatchx(_cardNumber);
            }
        }


        console.log(_cardNumber + "||" + _idplayer);
        // xóa bài trên tay
        for (let i = 0; i < _MyRoom.allPlayerCard[_idplayer].length; i++) {
            if (_MyRoom.allPlayerCard[_idplayer][i].id == _cardNumber) _MyRoom.allPlayerCard[_idplayer].splice(i, 1);

        }

        if (_idplayer == 0) {
            return _MyRoom.cardOnTable0;

        }
        if (_idplayer == 1) {
            return _MyRoom.cardOnTable1;

        }
        if (_idplayer == 2) {
            return _MyRoom.cardOnTable2;

        }
        if (_idplayer == 3) {
            return _MyRoom.cardOnTable3;

        }
    },

    addCardOnTable2(_cardNumber, _idplayer) {
        if (_idplayer == 0) {
            _MyRoom.cardOnTable0.push(_cardNumber);

        }
        if (_idplayer == 1) {
            _MyRoom.cardOnTable1.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 2) {
                this.checkmatchx(_cardNumber);


            }
        }
        if (_idplayer == 2) {
            _MyRoom.cardOnTable2.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 3) {
                this.checkmatchx(_cardNumber);
            }
        }
        if (_idplayer == 3) {
            _MyRoom.cardOnTable3.push(_cardNumber);
            if (_MyRoom.allPlayerCard.length == 4) {
                this.checkmatchx(_cardNumber);
            }
        }
        //  console.log(_cardNumber+"||"+ _idplayer);
        // xóa bài trên tay
        if (_idplayer == 0) {
            return _MyRoom.cardOnTable0;

        }
        if (_idplayer == 1) {
            return _MyRoom.cardOnTable1;

        }
        if (_idplayer == 2) {
            return _MyRoom.cardOnTable2;

        }
        if (_idplayer == 3) {
            return _MyRoom.cardOnTable3;

        }

    },

    cardSort() {
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        var array = _MyRoom.allPlayerCard[0];
        var size = array.length;
        for (var step = 1; step < size; step++) {
            var keyArr = array[step];
            var key = array[step].id % 100;
            var j = step - 1;
            while (j >= 0 && key > array[j].id % 100) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = keyArr;
        }
        //console.log(_MyRoom.allPlayerCard);
        let vitri0 = 0;
        var arrSort2 = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].cardStatus == 1000) {
                arrSort2.push(array[i]);

            }
        }

        this.ChiaBai(false);
    },
    CheckBocBai() {
        this.node.getChildByName("Game").getChildByName("bocbai2").active = false;
        this.node.getChildByName("Game").getChildByName("BocBai").getComponent(cc.Button).interactable = false;
        if (_MyRoom.curAction == 'before') {

            if(window._MyRoom.CheckTaoBocBai(null)){
                this.node.getChildByName("Game").getChildByName("bocbai2").active = true;
                this.node.getChildByName("Game").getChildByName("BocBai").getComponent(cc.Button).interactable = true;
            }
            //else this.needUpdate = true;
        }
    },

    BocBai() { /// BTN
        console.log("btn BocBai");

     //  if (this.node.getChildByName("Game").getChildByName("bocbai2").active == true) {
            // let socardconlai = this.cardList.length;
            //  let randomx = Math.floor(Math.random() * socardconlai);
            _WS.getPool();
            this.needUpdate = true;
     //}
    },
    thembaiduoc(listcard) {
        _MyRoom.allPlayerCard[0] = [];
        for (let j = 0; j < listcard.length; j++) {
            let _type = listcard[j].type;
            let _value = listcard[j].value;

            var cardObj = new Object();
            cardObj.id = _type * 100 + _value;
            cardObj.cardStatus = 0;
            _MyRoom.allPlayerCard[0].push(cardObj)

        }

        this.ChiaBai(false);

        //this.AddLaBaiBocDuocVaoBoBai(randomx);
    },
    AddLaBaiBocDuocVaoBoBai(randomx) {
        //  this.ChiaBai(false);
    },
    SoLaBaiCuaNguoiChoi() {

    },
    update() {
       

    },
    CheckLaBaiCoAnDuocKhong(_cardid) {
        var cardid = _cardid;
        if (_MyRoom.allPlayerCard[0].length < 10) {

        }

    },
    checkBaiCungSo(cardid) {
        //console.log(arr);
        var arr = this.LaBaiCungSo(cardid);
        if (arr.length >= 3) {
            console.log("ăn được phỏm cùng số " + arr.length);
            console.log(arr);
            this.NhapNhay(arr);
        }
    },

    LaBaiCungSo(cardid) {
        var arr = [];
        arr.push(cardid);
        var listPlaycard = _MyRoom.allPlayerCard[0];
        var typeCardId = cardid % 100;
        for (let i = 0; i < listPlaycard.length; i++) {
            let oneCardTrenTay = listPlaycard[i].id;
            var type1PlayCard = listPlaycard[i].id % 100;
            if (typeCardId == type1PlayCard) {
                arr.push(oneCardTrenTay);
            }
        }
        return arr;

    },
    checkBaiCungChat(cardid) {
        var arr = this.LaBaiCungChat(cardid);
        if (arr.length > 2) {
            console.log("ăn được phỏm cùng chất " + arr.length);
            this.NhapNhay(arr);
        }
    },
    NhapNhay(arrz) {
        var Player0 = this.node.getChildByName("CardTable").getChildByName("Player0");
        var PlayerM = this.node.getChildByName("CardTable").getChildByName("PlayerM3");
        for (let i = 0; i < Player0.children.length; i++) {
            for (let j = 0; j < arrz.length; j++) {
                if (Player0.children[i].getComponent("card").idCard == arrz[j]) Player0.children[i].getComponent("card").playAnimationPingpong();
            }

        }

        // var lengthM = PlayerM.length;
        // for (let i1 = 0; i1 < arrz.length; i1++) {
        //     if(PlayerM[lengthM-1].getComponent("card").idCard == arrz[i1]) PlayerM[lengthM-1].getComponent("card").playAnimationPingpong();

        // }
    },
    DungNhapNhay() {
        var Player0 = this.node.getChildByName("CardTable").getChildByName("Player0");
        var PlayerM = this.node.getChildByName("CardTable").getChildByName("PlayerM3");
        for (let i = 0; i < Player0.length; i++) {
            //   for (let j = 0; j < arrz.length; j++) {
            Player0[i].getComponent("card").stopAnimationPingpong();
            //  }

        }
        var lengthM = PlayerM.length;
        PlayerM[lengthM - 1].getComponent("card").stopAnimationPingpong();

    },
    LaBaiCungChat(cardid) {
        var arrTien = [];
        arrTien.push(cardid);

        var arrLui = [];
        var listPlaycard = _MyRoom.allPlayerCard[0];

        var typeCardId = Math.floor(cardid / 100);
        var valueCardId = cardid % 100;

        var value2 = 0;
        var valueAm2 = 0;

        var value3 = 0;
        var valueAm3 = 0;

        var value4 = 0;
        var valueAm4 = 0;

        var value5 = 0;
        var valueAm5 = 0;

        var value6 = 0;
        var valueAm6 = 0;

        for (let i = 0; i < listPlaycard.length; i++) {
            let type = Math.floor(listPlaycard[i].id / 100);
            let value = listPlaycard[i].id % 100;

            if (type == typeCardId) {

                if ((valueCardId + 2) == value) {
                    value2 = listPlaycard[i].id;
                };


                if ((valueCardId - 2) == value) {
                    valueAm2 = listPlaycard[i].id;
                };


                if ((valueCardId + 3) == value) {
                    value3 = listPlaycard[i].id;
                };

                if ((valueCardId - 3) == value) {
                    valueAm3 = listPlaycard[i].id;
                };

                if ((valueCardId + 4) == value) {
                    value4 = listPlaycard[i].id;
                };

                if ((valueCardId - 4) == value) {
                    valueAm4 = listPlaycard[i].id;
                };

                if ((valueCardId + 5) == value) {
                    value5 = listPlaycard[i].id;
                };

                if ((valueCardId - 5) == value) {
                    valueAm5 = listPlaycard[i].id;
                };

                if ((valueCardId + 6) == value) {
                    value6 = listPlaycard[i].id;
                };

                if ((valueCardId - 6) == value) {
                    valueAm6 = listPlaycard[i].id;
                };

                ///
                if ((valueCardId + 1) == value) {
                    arrTien.push(listPlaycard[i].id);

                };
                if ((valueCardId - 1) == value) {
                    arrLui.push(listPlaycard[i].id);
                };


            }

        }
        if (arrTien.length > 1) {
            if (value2 > 0) {
                arrTien.push(value2);
                if (value3 > 0) arrTien.push(value3);
                else if (value4 > 0) arrTien.push(value4);
                else if (value5 > 0) arrTien.push(value5);
                else if (value6 > 0) arrTien.push(value6);

            }
        }

        if (arrLui.length > 0) {
            if (valueAm2 > 0) {
                arrLui.push(valueAm2);
                if (valueAm3 > 0) arrLui.push(valueAm3);
                else if (valueAm4 > 0) arrLui.push(valueAm4);
                else if (valueAm5 > 0) arrLui.push(valueAm5);
                else if (valueAm6 > 0) arrLui.push(valueAm6);
            }

            for (let k = 0; k < arrLui.length; k++) {
                let arraylui1item = arrLui[k];
                arrTien.push(arraylui1item);

            }
        }
        //console.log(arrTien);
        return arrTien;





    },
    HaPhom0() {

        // cc.find("Canvas").getComponent("InitGame").playBtnS();
        // var Player0 = this.node.getChildByName("CardTable").getChildByName("Player0");
        // var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM0");

        // let iAr = 0;

        // for (let i = 0; i < this.phom0.length; i++) {
        //     for (let j = 0; j < this.phom0[i].length; j++) {
        //         var userIcon = cc.instantiate(this.card);
        //         userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] - i * 50);
        //         var OneCard = this.phom0[i][j];
        //         var obj = new Object();
        //         obj.type = Math.floor(OneCard / 100);
        //         obj.value = OneCard % 100;
        //         obj.idCard = OneCard;
        //         obj.idPlayer = 0;
        //         console.log(obj);
        //         userIcon.getComponent("card").DanhLabai(obj);
        //         PlayerM0.addChild(userIcon);

        //     }
        // }
        // this.scheduleOnce(function () {
        //     console.log(PlayerM0);
        //     for (let i = 0; i < PlayerM0.children.length; i++) {
        //         var oneItem = PlayerM0.children[i];
        //         oneItem.setScale(0.7);
        //         let x = oneItem.x;
        //         let y = oneItem.y + 200;
        //         var actionBy = cc.moveTo(0.5, cc.v2(x, y));
        //         oneItem.runAction(actionBy);
        //     }

        // }, 0.1);
        // this.HaPhom1();
        // this.HaPhom2();
        // this.HaPhom3();

        // var _CardTable= cc.find("Canvas/GamePlay/CardTable");
        // _CardTable.getComponent("CardTable").DanhBai2x(2,4,1);

    },
    HaPhom1() {
        var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM1");
        let iAr = 1;
        for (let i = 0; i < this.phom1.length; i++) {
            for (let j = 0; j < this.phom1[i].length; j++) {
                var userIcon = cc.instantiate(this.card);
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] - i * 50);
                var OneCard = this.phom1[i][j];
                var obj = new Object();
                obj.type = Math.floor(OneCard / 100);
                obj.value = OneCard % 100;
                obj.idCard = OneCard;
                obj.idPlayer = 0;
                console.log(obj);
                userIcon.getComponent("card").DanhLabai(obj);
                PlayerM0.addChild(userIcon);

            }
        }
        this.scheduleOnce(function () {
            console.log(PlayerM0);
            for (let i = 0; i < PlayerM0.children.length; i++) {
                var oneItem = PlayerM0.children[i];
                oneItem.setScale(0.7);

                let x = oneItem.x - 150;
                let y = oneItem.y;
                var actionBy = cc.moveTo(0.5, cc.v2(x, y));
                oneItem.runAction(actionBy);
            }

        }, 0.1);

    },
    HaPhom2() {
        var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM2");
        let iAr = 2;
        for (let i = 0; i < this.phom2.length; i++) {
            for (let j = 0; j < this.phom2[i].length; j++) {
                var userIcon = cc.instantiate(this.card);
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] - i * 50);
                var OneCard = this.phom2[i][j];
                var obj = new Object();
                obj.type = Math.floor(OneCard / 100);
                obj.value = OneCard % 100;
                obj.idCard = OneCard;
                obj.idPlayer = 0;
                console.log(obj);
                userIcon.getComponent("card").DanhLabai(obj);
                PlayerM0.addChild(userIcon);

            }
        }
        this.scheduleOnce(function () {
            console.log(PlayerM0);
            for (let i = 0; i < PlayerM0.children.length; i++) {
                var oneItem = PlayerM0.children[i];
                oneItem.setScale(0.7);

                let x = oneItem.x;
                let y = oneItem.y - 150;
                var actionBy = cc.moveTo(0.5, cc.v2(x, y));
                oneItem.runAction(actionBy);
            }

        }, 0.1);
    },
    HaPhom3() {
        var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM3");
        let iAr = 3;
        for (let i = 0; i < this.phom3.length; i++) {
            for (let j = 0; j < this.phom3[i].length; j++) {
                var userIcon = cc.instantiate(this.card);
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] - i * 50);
                var OneCard = this.phom3[i][j];
                var obj = new Object();
                obj.type = Math.floor(OneCard / 100);
                obj.value = OneCard % 100;
                obj.idCard = OneCard;
                obj.idPlayer = 0;
                console.log(obj);
                userIcon.getComponent("card").DanhLabai(obj);
                PlayerM0.addChild(userIcon);

            }
        }
        this.scheduleOnce(function () {
            console.log(PlayerM0);
            for (let i = 0; i < PlayerM0.children.length; i++) {
                var oneItem = PlayerM0.children[i];
                oneItem.setScale(0.7);

                let x = oneItem.x + 150;
                let y = oneItem.y;
                var actionBy = cc.moveTo(0.5, cc.v2(x, y));
                oneItem.runAction(actionBy);
            }

        }, 0.1);
    },
    checkMess() {
        let self = this;
        self.schedule(function () {
            if (this.needUpdate) {
                var self = this;
                this.needUpdate = false;
                console.log(this.needUpdate);
                _WS.room.onMessage("action", (message) => {
                    /// let listcard =  message.mess.users[_MyRoom.viTriNguoiChoi[0].idTrongArr].cards;
                    // self.thembaiduoc(listcard);
                });
            } else {
                // _WS.room.onMessage("action", (message) => {
                //         console.log(message);
                //  });
            }
        }, 1);

    },
    checkMessGlobal(mss) {
        console.log("mss gl >>");

        console.log(mss);
        console.log("mss gl <<");
        _MyRoom.curAction = mss.action;
        _MyRoom.curUser = mss.userID;
        // if(mss.userID == _WS.ID){
        //     action
        // }
        this.OtherPlayCard(mss);

    },
    OtherPlayCard(mss) {
        
        let self = this;

        if (mss.action == "before") {
            let _idsv = _MyRoom.idsv(mss.clientID, null);
            window._MyRoom.CheckTaoBocBai(_idsv.id, null);
            if (_WS.ID == mss.clientID) {
                console.log("Tao đánh bài");
                _MyRoom.LuotDanh ++;
            } else {
                _MyRoom.LuotDanh ++;
                let idlocal = _MyRoom.idlocal(mss.clientID, null);
                console.log(idlocal.id + " : đánh bài");
                var _CardTable = cc.find("Canvas/GamePlay/CardTable");
                _CardTable.getComponent("CardTable").DanhBai2x(mss.check.card.type, mss.check.card.value, idlocal.id);
            }
            // check 2 nguoi choi
            // let listcardTurn = mss.mess.users[_MyRoom.viTriNguoiChoi[0].idTrongArr].cardTurn;
            // this.checkListCardTurn(mss.mess.users);
            // if(_MyRoom.cardOnTable0.length < listcardTurn.length){
            //     let onecardTurn = listcardTurn[listcardTurn.length -1];
            //     console.log(onecardTurn);
            //     var _CardTable= cc.find("Canvas/GamePlay/CardTable");
            //     _CardTable.getComponent("CardTable").DanhBai2x(onecardTurn.type,onecardTurn.message,1);
            // }
        }
        if (mss.userID == _WS.ID) {
            if (mss.action == "after") {
                console.log(this.needUpdate);
                if (this.needUpdate) {
                    this.needUpdate = false;
                    let listcard = mss.mess.users[_MyRoom.viTriNguoiChoi[0].idTrongArr].cards;
                    self.thembaiduoc(listcard);
                    console.log("boc duoc bai");
                }
            }
        }

        if (mss.action == "after") {
            if (_WS.ID == mss.userID) {
                console.log("Tao bốc bài");
            } else {
                let idlocal = _MyRoom.idlocal(mss.userID, null);
                console.log(idlocal.id + " : bốc bài");
                let idsv = _MyRoom.idsv(mss.userID, null);
                console.log(_MyRoom.allPlayerCard[idlocal.id].length + "|" + mss.mess.users[idsv.id].cards.length);
            }
        }



        this.CheckBocBai();
        this.checkMessX();

    },
    checkMessX() {
        this.node.getChildByName("Button").getChildByName("danhbai").active = false;
        if (_MyRoom.curAction == 'after' && _MyRoom.curUser == _WS.ID) {
            //if (_MyRoom.curUser == _WS.ID) {
            this.node.getChildByName("Button").getChildByName("danhbai").active = true;
            //    }
            //else this.needUpdate = true;
        } else {

        }
    },
    checkListCardTurn(users) {
        let _users = users;
        var list0 = [];
        var list1 = [];
        var list2 = [];
        var list3 = [];
        let soNguoiChoiTrongRoom = _users.length;
        for (let i = 0; i < _users.length; i++) {
            let listCardTurn = _users[i].cardTurn;
            for (let j = 0; j < listCardTurn.length; j++) {
                if (i == 0) {
                    list0.push(listCardTurn[j]);
                }
                if (i == 1) {
                    list1.push(listCardTurn[j]);
                }
                if (i == 2) {
                    list2.push(listCardTurn[j]);
                }
                if (i == 3) {
                    list3.push(listCardTurn[j]);
                }
            }
        }

        // if(soNguoiChoiTrongRoom == 2){
        //     let length2_0 = list0.length;
        //     let length2_1 = list1.length;
        //     if(length2_1 > length2_0){
        //         console.log(" nguoi choi 0sv danh bai cho 1sv"); // 0sv danh sach theo server
        //     }else{
        //         if(length2_1 < length2_0){
        //             console.log(" nguoi choi 1sv danh bai cho 0sv"); // 0sv danh sach theo server

        //         }else{
        //             console.log(" nguoi choi 1sv 0sv chua danh bai"); // 0sv danh sach theo server
        //         }
        //     }
        // }

        // if(soNguoiChoiTrongRoom == 3){
        //     let length3_0 = list0.length;
        //     let length3_1 = list1.length;
        //     let length3_2 = list2.length;

        //     if(length3_1 > length3_0){
        //         console.log(" nguoi choi 0sv danh bai cho 1sv ",length2_1); // 0sv danh sach theo server
        //     }else{
        //         console.log("-0sv ",length2_1); // 0sv danh sach theo server
        //     }

        //     if(length3_2 > length3_1){
        //         console.log(" nguoi choi 1sv danh bai cho 2sv ",length3_1); 
        //     }else{
        //         console.log(" -1sv ",length3_1); // nguoi choi 1sv chua danh bai 
        //     }

        //     if(length3_2 > length3_1){
        //         console.log(" nguoi choi 1sv danh bai cho 2sv ",length3_1); 
        //     }else{
        //         console.log(" -1sv ",length3_1); // nguoi choi 1sv chua danh bai 
        //     }
        // }




    }
});
