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

    }
    ,
    XepBai(){

    }

    // update (dt) {},
});
