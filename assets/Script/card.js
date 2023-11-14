// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

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
        cardStatus: 0, // 0 dang tren tay, 1 san sang , 2 danh bai , 3 bai tren ban
        idCard: 0,
        type: 1, // tuong ung ro co tep bich
        value: 1, /// 0 --> 9 and  10 11 12 tuong ung J Q K AT
        idPlayer: 0,// 0,1,2,3
       // vitriLabai : 0// 0 tren tay //  1 la bai tren ban /// 2 bi an 


    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
       //this.VeLaBai();
    },
    VeLaBai(_valueAll,_idx,_idPlayer){
        var valueAll = _valueAll;
        this.type = Math.floor(valueAll/100);
        this.value = valueAll%100;
        this.cardStatus = 0;
        this.idCard = _idx;
        this.idPlayer = _idPlayer;
        //this.vitriLabai = 0;// la bai tren tay
        this.showImgLabai(this.type ,this.value);
    },
    DanhLabai(selfx){

        this.type = selfx.type;
        this.value = selfx.value;
        this.cardStatus = 3; // la bai tren ban
        this.idCard = selfx.idCard;
        this.idPlayer = selfx.idPlayer;
        
        //this.vitriLabai = 1;// la bai tren ban
        this.showImgLabai(this.type ,this.value);
    },

    showImgLabai(type, value){
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 14; j++) {
                if(type == (i+1) && value == j) this.node.children[i+1].children[j].active = true;
                else this.node.children[i+1].children[j].active = false;

            }
            
        }
    },
    cardBtn() {
        console.log(this.cardStatus);
     //   if(this.idPlayer == 0){\
     if(this.cardStatus < 2){
        this.checkOtherCard();
     }
        //}

    },
    checkOtherCard() {
        // check xem cac la bai khac co bi select khong
        const thisIDx = this.idCard;
        var listCard = this.node.parent.children;
        for (let i = 0; i < listCard.length; i++) {
            if (listCard[i].getComponent("card").idCard != thisIDx) {
                listCard[i].getComponent("card").cardStatus0();
                //  console.log(listCard[i].getComponent("card").idCard);
            } else {
                if (this.cardStatus == 1) this.cardStatus0();
                else this.cardStatus1();
                //  console.log(listCard[i].getComponent("card").idCard);
            }

        }
    },
    //ChonLaBai(){

    cardStatus0() { // card notselect


        this.cardStatus = 0;
        var posix = player0123[this.idPlayer].posiCard[0];
        var posiy = player0123[this.idPlayer].posiCard[1];

        if (posix == 0) {
            this.node.y = posiy ;
        }else{
            if(posiy==0){
                this.node.x = posix;
            }
        }
    },
    cardStatus1() { // card sellect
        // console.log("select" + this.idCard);
        window.Global.PlayerSelect = this.idPlayer;
        this.cardStatus = 1;
        var posix = player0123[this.idPlayer].posiCard[0];
        var posiy = player0123[this.idPlayer].posiCard[1];
        var phuongHuong = 1;
        if (posix == 0) {
            if (posiy <= 0) phuongHuong = 1;
            else phuongHuong = -1;

            this.node.y = posiy + 40 * phuongHuong;

        }else{
            if(posiy==0){
                if (posix <= 0) phuongHuong = 1;
                else phuongHuong = -1;
    
                this.node.x = posix + 40 * phuongHuong;
            }
        }

    },

    // danh la bai nay
    danhBai() {
        var self = this;
        let toadoX = self.node.x;
        let toadoy = self.node.y;

        if (this.cardStatus == 1) {
           // this.type = Math.floor(valueAll/100);
           // this.value = valueAll%100;
            var _cardNumber = this.type * 100 + this.value;
            cc.find("Canvas/GamePlay").getComponent("GamePlayCtrl").addCardOnTable(_cardNumber, this.idPlayer);
            this.cardStatus = 2;
            var PlayerM = this.node.parent.parent.getChildByName("PlayerM" + this.idPlayer);
            var userIcon = cc.instantiate(this.node.parent.parent.parent.getComponent("GamePlayCtrl").card);
            userIcon.setPosition(toadoX, toadoy);
            var self = this;
            userIcon.getComponent("card").DanhLabai(self)
            PlayerM.addChild(userIcon);
            this.node.active = false;
            self.scheduleOnce(function () {
                var actionBy = cc.moveTo(2, cc.v2(player0123[this.idPlayer].posiCardM[0], player0123[this.idPlayer].posiCardM[1]));
                userIcon.runAction(actionBy);
            }, 0.1);
        }
    }
    // update (dt) {},
});
