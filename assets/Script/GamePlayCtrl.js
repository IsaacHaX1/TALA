// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

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

    },
    addCardList(){
        let arr = [];
        let pool = window._MyRoom.cardRoom.mess.pool;
        for (let i = 0; i < pool.length; i++) {
            let _type = pool[i].type;
            let _value = pool[i].value;
            arr.push(_type * 100 + _value);
            
        }
        return arr;
    },
    addAllPlayCard(){

        let _users = window._MyRoom.cardRoom.mess.users;


        let vitri = window._MyRoom.viTriNguoiChoi;
        for (let i = 0; i < vitri.length; i++) {
            this.allPlayerCard[i] = [];
            let arrvt = vitri[i].idTrongArr;
            for (let j = 0; j < _users[arrvt].cards.length; j++) {
                let _type = _users[arrvt].cards[j].type;
                let _value = _users[arrvt].cards[j].value;

                var cardObj = new Object();
                cardObj.id = _type * 100 + _value;
                cardObj.cardStatus = 0;
                this.allPlayerCard[i].push(cardObj)

            }
            
        }



    },

    TraoBai() {
        this.cardOnTable0 = [];
        this.cardOnTable1 = [];
        this.cardOnTable2 = [];
        this.cardOnTable3 = [];

        // Bo bai
        // for (let i = 1; i < 5; i++) {
        //     for (let j = 0; j < 13; j++) {
        //         _cardlist.push(i * 100 + j);
        //     }
        // }

        this.cardList = this.addCardList();

        // chia bai
        let SoNguoiChoi = window._MyRoom.soNguoiChoi;
        let _addAllPlayCard = this.addAllPlayCard();
        console.log(this.allPlayerCard);
        console.log(this.cardList);
        this.ChiaBaiLanDau(true);

    },
    ChiaBaiLanDau(){
        var self = this;
        var CardTable = this.node.getChildByName("CardTable");
        // xóa hết bài trên bàn
        for (let i = 0; i < 8; i++) {
            var playerx = CardTable.children[i];
            playerx.removeAllChildren(true);
        }

        for (let i = 0; i < this.allPlayerCard.length; i++) {
            var playerx = CardTable.children[i * 2];

            var cardOf1Player = this.allPlayerCard[i];

            for (let j = 0; j < cardOf1Player.length; j++) {
                var posix = player0123[i].posiCard[0];
                var posiy = player0123[i].posiCard[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy);
                var _cardx = this.allPlayerCard[i][j];
                cardpf.getComponent("card").VeLaBai(_cardx.id, _cardx.id, i);
                cardpf.getComponent("card").hieuUngChiaBai1();

                playerx.addChild(cardpf);
            }

        }

        self.scheduleOnce(function() {
            var set = this.node.getChildByName("CardTable").getChildByName("set");
            set.getComponent("set").startAnimationChiabai();

        },1)
    },
    LatBaiVuaChia(){
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

        for (let i = 0; i < this.allPlayerCard.length; i++) {
            var playerx = CardTable.children[i * 2];

            var cardOf1Player = this.allPlayerCard[i];

            for (let j = 0; j < cardOf1Player.length; j++) {
                var posix = player0123[i].posiCard[0];
                var posiy = player0123[i].posiCard[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy);
                var _cardx = this.allPlayerCard[i][j];
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

            var cardOf1Player = this.cardOnTable0;
            if (i1 == 1) cardOf1Player = this.cardOnTable1;
            if (i1 == 2) cardOf1Player = this.cardOnTable2;
            if (i1 == 3) cardOf1Player = this.cardOnTable3;
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
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        if (this.allPlayerCard.length == 4) {
            var lengthx = this.cardOnTable3.length;
            if (lengthx > 0) {
                var cardObj = new Object();
                cardObj.id = this.cardOnTable3[lengthx - 1];
                cardObj.cardStatus = 1000;

                this.allPlayerCard[0].push(cardObj);
                this.cardOnTable3.splice(lengthx - 1, 1);
                this.ChiaBai(false);
            }

        }

        if (this.allPlayerCard.length == 3) {
            var lengthx = this.cardOnTable2.length;
            if (lengthx > 0) {
                var cardObj = new Object();
                cardObj.id = this.cardOnTable2[lengthx - 1];
                cardObj.cardStatus = 1000;

                this.allPlayerCard[0].push(cardObj);
                this.cardOnTable2.splice(lengthx - 1, 1);
                this.ChiaBai(false);
            }

        }

        if (this.allPlayerCard.length == 2) {
            var lengthx = this.cardOnTable1.length;
            if (lengthx > 0) {
                var cardObj = new Object();
                cardObj.id = this.cardOnTable1[lengthx - 1];
                cardObj.cardStatus = 1000;

                this.allPlayerCard[0].push(cardObj);
                this.cardOnTable1.splice(lengthx - 1, 1);
                this.ChiaBai(false);
            }

        }
        console.log(this.cardOnTable0 + "|" + this.cardOnTable1 + "|" + this.cardOnTable2 + "|" + this.cardOnTable3);

    },
    addCardOnTable(_cardNumber, _idplayer) {
        if (_idplayer == 0) {
            this.cardOnTable0.push(_cardNumber);

        }
        if (_idplayer == 1) {
            this.cardOnTable1.push(_cardNumber);
            if (this.allPlayerCard.length == 2) {
                this.checkBaiCungSo(_cardNumber);
                this.checkBaiCungChat(_cardNumber);

            }
        }
        if (_idplayer == 2) {
            this.cardOnTable2.push(_cardNumber);
            if (this.allPlayerCard.length == 3) {
                this.checkBaiCungSo(_cardNumber);
                this.checkBaiCungChat(_cardNumber);

            }
        }
        if (_idplayer == 3) {
            this.cardOnTable3.push(_cardNumber);
            if (this.allPlayerCard.length == 4) {
                this.checkBaiCungSo(_cardNumber);
                this.checkBaiCungChat(_cardNumber);
            }
        }
        // xóa bài trên tay
        for (let i = 0; i < this.allPlayerCard[_idplayer].length; i++) {
            if (this.allPlayerCard[_idplayer][i].id == _cardNumber) this.allPlayerCard[_idplayer].splice(i, 1);

        }
        //
        if (_idplayer == 0) {
            return this.cardOnTable0;

        }
        if (_idplayer == 1) {
            return this.cardOnTable1;

        }
        if (_idplayer == 2) {
            return this.cardOnTable2;

        }
        if (_idplayer == 3) {
            return this.cardOnTable3;

        }
    },

    cardSort() {
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        var array = this.allPlayerCard[0];
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
        //console.log(this.allPlayerCard);
        let vitri0 = 0;
        var arrSort2 = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].cardStatus == 100) {
                arrSort2.push(array[i]);

            }
        }

        this.ChiaBai(false);
    },
    BocBai() { /// BTN
        console.log("BocBai");
        let socardconlai = this.cardList.length;
        let randomx = Math.floor(Math.random() * socardconlai);
        this.AddLaBaiBocDuocVaoBoBai(randomx);

    },
    AddLaBaiBocDuocVaoBoBai(randomx) {
        var cardObj = new Object();
        cardObj.id = this.cardList[randomx];
        cardObj.cardStatus = 0;

        this.allPlayerCard[0].push(cardObj)
        this.cardList.splice(randomx, 1);
        this.ChiaBai(false);
    },
    SoLaBaiCuaNguoiChoi() {

    },
    CheckLaBaiCoAnDuocKhong(_cardid) {
        var cardid = _cardid;
        if (this.allPlayerCard[0].length < 10) {

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
        var listPlaycard = this.allPlayerCard[0];
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
        var listPlaycard = this.allPlayerCard[0];

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
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        var Player0 = this.node.getChildByName("CardTable").getChildByName("Player0");
        var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM0");

        let iAr = 0;

        for (let i = 0; i < this.phom0.length; i++) {
            for (let j = 0; j < this.phom0[i].length; j++) {
                var userIcon = cc.instantiate(this.card);
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] -i*50); 
                var OneCard= this.phom0[i][j];
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
                let y = oneItem.y + 200; 
                var actionBy = cc.moveTo(0.5, cc.v2(x, y));
                oneItem.runAction(actionBy);
            }

        }, 0.1);
        this.HaPhom1();
        this.HaPhom2();
        this.HaPhom3();


    },
    HaPhom1() {
        var PlayerM0 = this.node.getChildByName("CardTable").getChildByName("PlayerM1");
        let iAr = 1;
        for (let i = 0; i < this.phom1.length; i++) {
            for (let j = 0; j < this.phom1[i].length; j++) {
                var userIcon = cc.instantiate(this.card);
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] -i*50); 
                var OneCard= this.phom1[i][j];
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

                let x = oneItem.x -150;
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
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] -i*50); 
                var OneCard= this.phom2[i][j];
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
                let y = oneItem.y-150; 
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
                userIcon.setPosition(player0123[iAr].posiCard[0] + j * 50, player0123[iAr].posiCard[1] -i*50); 
                var OneCard= this.phom3[i][j];
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

                let x = oneItem.x +150;
                let y = oneItem.y; 
                var actionBy = cc.moveTo(0.5, cc.v2(x, y));
                oneItem.runAction(actionBy);
            }

        }, 0.1);
    }
    // update (dt) {},
});
