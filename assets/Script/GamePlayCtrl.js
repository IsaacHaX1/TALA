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
        cardOnTable1: [],
        cardOnTable2: [],
        cardOnTable3: [],

        idNguoiChoi: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    TraoBai() {
        this.cardOnTable0= [];
        this.cardOnTable1= [];
        this.cardOnTable2= [];
        this.cardOnTable3= [];
        const _cardlist = [];

        // Bo bai
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < 13; j++) {
                _cardlist.push(i * 100 + j);
            }
        }

        this.cardList = _cardlist;

        // chia bai
        let SoNguoiChoi = 4;
        let Nguoi10Con = 0;
        for (let m = 0; m < SoNguoiChoi; m++) {
            this.allPlayerCard[m] = [];
            for (let m1 = 0; m1 < 10; m1++) {
                let socardconlai = this.cardList.length;
                let randomx = Math.floor(Math.random() * socardconlai);
                if (m != Nguoi10Con) {
                    if (m1 < 9) {
                        this.allPlayerCard[m].push(this.cardList[randomx])
                        this.cardList.splice(randomx, 1);
                    }
                } else {
                    this.allPlayerCard[m].push(this.cardList[randomx])
                    this.cardList.splice(randomx, 1);
                }
            }

        }
        console.log(this.allPlayerCard);
        console.log(this.cardList);
        this.ChiaBai(true);

    },
    ChiaBai(deleteall) {
        var CardTable = this.node.getChildByName("CardTable");
        // xóa hết bài trên bàn
      // if (deleteall) {
            for (let i = 0; i < 8; i++) {
                var playerx = CardTable.children[i];
                playerx.removeAllChildren(true);
            }
        // }else{
        //     for (let i = 0; i < 4; i++) {
        //         var playerx = CardTable.children[i *2];
        //         playerx.removeAllChildren(true);
        //     }
        // }
        //chia bai
        for (let i = 0; i < 4; i++) {
            var playerx = CardTable.children[i * 2];

            var cardOf1Player = this.allPlayerCard[i];
            for (let j = 0; j < cardOf1Player.length; j++) {
                var posix = player0123[i].posiCard[0];
                var posiy = player0123[i].posiCard[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy)
                cardpf.getComponent("card").VeLaBai(this.allPlayerCard[i][j], j, i);
                playerx.addChild(cardpf);

            }



        }

        this.VeLaiBaiTrenBan();


    },
    VeLaiBaiTrenBan(){
        var CardTable = this.node.getChildByName("CardTable");
        for (let i1 = 0; i1 < 4; i1++) {
            var playerM = CardTable.children[i1 * 2 + 1];

            var cardOf1Player = this.cardOnTable0;
            if(i1 == 1 )cardOf1Player = this.cardOnTable1;
            if(i1 == 2 )cardOf1Player = this.cardOnTable2;
            if(i1 == 3 )cardOf1Player = this.cardOnTable3;
            for (let j1 = 0; j1 < cardOf1Player.length; j1++) {
                var posix = player0123[i1].posiCardM[0];
                var posiy = player0123[i1].posiCardM[1];

                var cardpf = cc.instantiate(this.card);
                cardpf.setPosition(posix, posiy)
                cardpf.getComponent("card").VeLaBai(this.cardOnTable0[j1], j1, i1);
                playerM.addChild(cardpf);

            }


        }
    },

    AnPhom() {
        if (this.allPlayerCard.length == 4) {
            var lengthx = this.cardOnTable3.length;
            if (lengthx > 0) {
                this.allPlayerCard[0].push(this.cardOnTable3[lengthx - 1]);
                this.cardOnTable3.splice(lengthx - 1, 1);
                this.ChiaBai(false);
            }

        }

        if (this.allPlayerCard.length == 3) {
            var lengthx = this.cardOnTable2.length;
            if (lengthx > 0) {
                this.allPlayerCard[0].push(this.cardOnTable2[lengthx - 1]);
                this.cardOnTable2.splice(lengthx - 1, 1);
                this.ChiaBai(false);
            }

        }

        if (this.allPlayerCard.length == 2) {
            var lengthx = this.cardOnTable1.length;
            if (lengthx > 0) {
                this.allPlayerCard[0].push(this.cardOnTable1[lengthx - 1]);
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
        }
        if (_idplayer == 2) {
            this.cardOnTable2.push(_cardNumber);
        }
        if (_idplayer == 3) {
            this.cardOnTable3.push(_cardNumber);
        }
        for (let i = 0; i < this.allPlayerCard[_idplayer].length; i++) {
            if (this.allPlayerCard[_idplayer][i] == _cardNumber) this.allPlayerCard[_idplayer].splice(i, 1);

        }
        console.log(this.cardOnTable0 + "|" + this.cardOnTable1 + "|" + this.cardOnTable2 + "|" + this.cardOnTable3);
    }
    // update (dt) {},
});
