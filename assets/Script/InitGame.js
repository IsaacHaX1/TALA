// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ShowLoading();
    },
    ShowLoading(){
        this.node.getChildByName("Loading").active = true;
        this.node.getChildByName("GamePlay").active = false;
        this.node.getChildByName("Finish").active = false;
        this.node.getChildByName("Loading").getComponent("Loading").ShowLoading();

    },

    
    playBtnS(){
       // if (Global.isSoundOn) {
            cc.audioEngine.playEffect(this.buttonSound, false);
        //}
      //  cc.find("Canvas").getComponent("InitGame").playBtnS();
    }

    // update (dt) {},
});
