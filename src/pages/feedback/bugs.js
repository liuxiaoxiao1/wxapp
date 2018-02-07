// src/pages/bugs/bugs.js
var app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonSize: 'mini',
    plain: 'true',
    type:0,
    userId: '',
    page:0,
    size:20,
    hasNext: true,
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app.appData', app.appData)
    // if (app.appData.userInfo == null) {
    //   console.log(88888);
    //   // wx.navigateTo({url:"../login/login"})

    //   wx.redirectTo({ url: "../login/login" })
    // } else {
    //   this._getLogList();
    // }

    if (!util.validLogin()) {
      wx.redirectTo({ url: "../login/login" })
    } else {
      this._getLogList();
    }
  },
  /**
   * 获取错误日志信息
   */
  _getLogList: function () {
    var me = this;
    wx.request({
      url: 'https://500px.me/back/feedback/listFeedback', //仅为示例，并非真实的接口地址
      data: {
        type: me.data.type,
        page: ++me.data.page,
        size: me.data.size
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data;
        if(resData.data.length) {
          resData.data.map((item, index) => {
            resData.data[index].createTime = util.formatTimeByFormat(item.createTime, 'Y/M/D h:m');
            resData.data[index].content = resData.data[index].content.replace(/access_token=(.){10}/g, 'access_token=**********')
          })

          me.setData(
            {
              items: [...me.data.items, ...resData.data]
            }
          )
        }else {
          me.setData(
            {
              hasNext: false
            }
          )
        }
        
        console.log(me.data.items);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面滚动事件
   */
  scroll: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新吧');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getLogList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 滚动到顶部
   */
  toTop: function() {
    console.log('到底了');//啥也不需要干
  },

  /**
   * 滚动到底部
   */
  toBottom: function () {
    this._getLogList();
  },

  /**
   * 按钮点击事件
   */
  typeAction: function (event) {
    console.log(event);
    var _type = event.target.dataset.value;
    this.setData({
      type:_type,
      page: 0,
      items:[]
    })
    this._getLogList();

  },

  /**
   * 设置粘贴板内容
   */
  setClipboardData: function (event) {
    console.log(event);
    var _userId = event.target.dataset.userid;
    wx.setClipboardData({
      data: 'https://500px.me/community/user-details/' + _userId,
      success: function (res) {
        wx.showToast({
          title: '已复制到粘贴板',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }


})