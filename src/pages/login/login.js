
var app = getApp();
const util = require('../../utils/util.js')
Page({
  data:{
    userName:null,
    password:null,
    access_token: ''
  },
  onLoad:function(options){
   
  },
  onReady:function(){
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  loginBtnClick:function (){
    // 用户名和密码验证的过程
    var me = this;
    wx.request({
      url: 'https://500px.me/user/v2/tologin', 
      data: {
        userName: me.data.userName,
        password: me.data.password
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data;
        if(resData.status == '200') {
          me.setData({
            access_token: resData.userAccountInfo.access_token
          });
          console.log(resData.userAccountInfo.access_token);
          me._validUser500px(resData.userAccountInfo);
        }else {
          wx.showToast({
            title: '用户名或者密码错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
  })
    // app.appData.userinfo = { username: this.data.username, password: this.data.password }
    // wx.redirectTo({ url: "../user/user" })
  },

  /**
   * 本地生成session 保存在storage中 供以后使用
   */

  _setLoginState: function () {
    wx.setStorageSync('islogin', true);

    //设定有效期
    wx.setStorageSync('expire-date', new Date().getTime() + app.validDate);
  },

  /**
   * 校验是不是社区用户
   */

  _validUser500px: function(userInfo) {
    var me = this;
    console.log('userInfo', userInfo);
    console.log('me.data.access_token', me.data.access_token);
    wx.request({
      url: 'https://500px.me/community/tribe/admin/back/inVisualchinaTribe',
      data: {
        access_token: me.data.access_token,
        
      },
      method: 'get',
      header: {
        'PF500MClient': 'ios',
        'PF500MClientVersion': '3.5.2 (71210.1)',
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data;
        if (resData.status == '200' && resData.inTribe) {
          console.log(777);
          app.appData.userInfo = userInfo

          //本地存储一下用户信息
          wx.setStorageSync('userInfo', userInfo);

          //本地生成session 保存在storage中 供以后使用
          me._setLoginState();

          wx.switchTab({url: "../feedback/bugs" })
        } else {
          wx.showToast({
            title: '你没有权限',
            icon: 'none',
            duration: 2000
          })
        }
      }



      })
  },

  usernameInput : function (event){
    this.setData({ userName:util.trim(event.detail.value)})
  },

  passwordInput : function (event){
    this.setData({ password: util.trim(event.detail.value)})
  },
  /**
   *  
   */
  _getOpenidAndSessionKey: function (code) {
    var appid = 'wxabc9a297cb447907';
    var appsecret = '15fb537eb72baead01e4ac10b59e25a6';

    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxabc9a297cb447907&secret=15fb537eb72baead01e4ac10b59e25a6&js_code=081msGBz04flwg1OweCz0e2CBz0msGBw&grant_type=authorization_code',
      data: {
        appid: appid,
        secret: appsecret,
        js_code: code,
        grant_type: 'authorization_code'

      },
      method: 'get',
      header: {
        
      },
      success: function (res) {
        console.log('openid', res.data)
        
      }



    })
  },
  /**
   * 微信登录
   */
  wxLogin: function () {
    // 登录
    var me = this;
    wx.login({
      success: res => {
        console.log('login res', res);
        app.globalData.wxRes = res
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        me._getOpenidAndSessionKey(res.code)


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('setting', res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('userInfo res', res);
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }




})