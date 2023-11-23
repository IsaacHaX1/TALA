// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const   player0123 = [
    {
        name:"Player0",
        posiCard :[0,-280],
        rotation:0,
        posiCardM:[150,-140]
    },
    {
        name:"Player1",
        posiCard :[400,0],
        rotation:90,
        posiCardM:[320,130]
    },
    {
        name:"Player2",
        posiCard :[0,260],
        rotation:180,
        posiCardM:[-150,135]
    },
    {
        name:"Player3",
        posiCard :[-400,0],
        rotation:-90,
        posiCardM:[-320,-140]
    }
    // {
    //     name:"Player0",
    //     posiCard :[0,-260],
    //     rotation:0,
    //     posiCardM:[150,0]
    // },
    // {
    //     name:"Player1",
    //     posiCard :[450,0],
    //     rotation:90,
    //     posiCardM:[0,130]
    // },
    // {
    //     name:"Player2",
    //     posiCard :[0,260],
    //     rotation:180,
    //     posiCardM:[-150,0]
    // },
    // {
    //     name:"Player3",
    //     posiCard :[-450,0],
    //     rotation:-90,
    //     posiCardM:[0,-130]
    // },

]

var playerX = {
    phom0 :[[101,102,103,104],[201,202,203],[301,302,303]],
    phom1:[[101,102,103,104],[201,202,203],[301,302,303]],
    phom2:[[101,102,103,104],[201,202,203],[301,302,303]],
    phom3 :[[101,102,103,104],[201,202,203],[301,302,303]],
}

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

    // update (dt) {},
});
