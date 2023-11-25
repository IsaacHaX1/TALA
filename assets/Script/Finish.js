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
        this.Nhi();
    },
    finish(){

    },

    Nhat(){
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = "NHẤT";
        //this.node.getChildByName("popup_frame").getComponent(cc.Button).interactable = true;
      //  .interactable = true;

    },
    Nhi(){
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = "NHÌ";
       // this.node.getChildByName("popup_frame").getComponent(cc.Button).interactable = false;

    },
    Ba(){
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = "BA";
     //   this.node.getChildByName("popup_frame").getComponent(cc.Button).interactable = false;


    },
    Bet(){
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = "BÉT";
     //   this.node.getChildByName("popup_frame").getComponent(cc.Button).interactable = false;


    },

    Close(){
        this.node.parent.getComponent("InitGame").start();
        cc.find("Canvas").getComponent("InitGame").playBtnS();
    },
    Take(){
        this.node.parent.getComponent("InitGame").start();
        cc.find("Canvas").getComponent("InitGame").playBtnS();

    }

    // update (dt) {},
});
