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
        solabai: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    chiamotlabai(){
        this.solabai++;
        console.log(this.solabai);
        var Player0 = this.node.parent.getChildByName("Player0");
        Player0.children[this.solabai - 1].active = true;
        if(this.solabai >=  Player0.children.length) this.stopAnimationChiabai();

    },
    player1(){
        var Player1 = this.node.parent.getChildByName("Player1");
        if(Player1.children.length > 0) Player1.children[0].active = true;

    },
    player2(){
        var Player1 = this.node.parent.getChildByName("Player2");
        if(Player1.children.length > 0) Player1.children[0].active = true;
    },
    player3(){
        var Player1 = this.node.parent.getChildByName("Player3");
        if(Player1.children.length > 0) Player1.children[0].active = true;

    },
    startAnimationChiabai(){
        this.node.active = true;

        this.solabai =0;
        if(_MyRoom.soNguoiChoi == 4)this.node.getComponent(cc.Animation).play("chiabai");
        else if(_MyRoom.soNguoiChoi == 3)this.node.getComponent(cc.Animation).play("chiabai3");
        else if(_MyRoom.soNguoiChoi == 2)this.node.getComponent(cc.Animation).play("chiabai2");
    },
    stopAnimationChiabai(){
        this.node.getComponent(cc.Animation).stop();
        this.node.parent.parent.getComponent("GamePlayCtrl").LatBaiVuaChia();
        this.node.active = false;
    }


    // update (dt) {},
});
