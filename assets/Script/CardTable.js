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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    DanhBai(){
        cc.find("Canvas").getComponent("InitGame").playBtnS();
        var getCardPlayer = this.node.getChildByName(player0123[window.Global.PlayerSelect].name);
        for (let i = 0; i < getCardPlayer.children.length; i++) {
            let getSelectCard = getCardPlayer.children[i];
            if(getSelectCard.getComponent("card").cardStatus == 1){
                console.log("doanh");
                getSelectCard.getComponent("card").danhBai();
                return;
            } 
            
        }
        console.log("Meo chon la bai nao de doanh ca");

    },

    DanhBai2x(_type,_value,idPlayer){
        cc.find("Canvas").getComponent("InitGame").playBtnS();
       // var getCardPlayer = this.node.getChildByName(player0123[_MyRoom.vtDoiThu.viTriTrenBan].name);
        let _idPlayer = 1;
        var self = this;
        let toadoX = player0123[_idPlayer].posiCard[0];

        let toadoy =  player0123[_idPlayer].posiCard[1];


            var _cardNumber =_type* 100 +_value;
            console.log(" doi thu danh bai _cardNumber = "+_cardNumber);
            
            var _GamePlayNode= cc.find("Canvas/GamePlay");
            _GamePlayNode.getChildByName("Button").getChildByName("danhbai").active = false;

            var arrCardTable = _GamePlayNode.getComponent("GamePlayCtrl").addCardOnTable2(_cardNumber, _idPlayer);

            var cardTBlength = arrCardTable.length

            var PlayerM = _GamePlayNode.getChildByName("CardTable").getChildByName("PlayerM" + _idPlayer);
            var userIcon = cc.instantiate(_GamePlayNode.getComponent("GamePlayCtrl").card);
            userIcon.setPosition(toadoX, toadoy);
            var obj = new Object();
            obj.type = _type;
            obj.value = _value;
            obj.idCard = _cardNumber;
            obj.idPlayer = _idPlayer;

            userIcon.getComponent("card").DanhLabai(obj)
            PlayerM.addChild(userIcon);


            self.scheduleOnce(function () {
                userIcon.setScale(0.7);
                var actionBy = cc.moveTo(0.5, cc.v2(player0123[_idPlayer].posiCardM[0] + cardTBlength*25, player0123[_idPlayer].posiCardM[1]));
                userIcon.runAction(actionBy);
            }, 0.1);
    


    },

    XepBai(){

    }

    // update (dt) {},
});
