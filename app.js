//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    //校验登录状态
    //this._validLogin();

  
    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res);
    //     this.globalData.wxRes = res
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 本地校验登录状态
   */
  _validLogin: function () {
    var _isLogin = wx.getStorageSync('islogin') || false;
    if (_isLogin) {
      wx.switchTab({
        url: 'src/pages/feedback/bugs'
      });

    }else {
      wx.redirectTo({ url: "src/login/login" })
    }

  },

  globalData: {
    userInfo: null
  },
  appData: {
    userInfo: null
  },
  validDate: 7 * 24 * 60 * 60 * 1000 //毫秒
})