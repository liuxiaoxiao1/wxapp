const util = require('../../utils/util.js')

var app = getApp();
var userInfo = wx.getStorageSync('userInfo') || {}


Page({
  data:{
    userInfo: userInfo
  },
  onLoad:function(options){
    if (this.data.userInfo == null ){
     // wx.navigateTo({url:"../login/login"})
        wx.redirectTo({url:"../login/login"})
    }

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})