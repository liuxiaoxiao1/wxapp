// src/pages/personalCenter/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonSize: 'mini',
    plain: false,
    userId: '2b7a049f642b9b8d9b115e0ab59ec4284',
    page: 0,
    size: 20,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this._getLogList();
  },
  /**
   * 获取错误日志信息
   */
  _getLogList: function () {
    var me = this;
    wx.request({
      url: 'https://500px.me/back/feedback/getFeedback', //仅为示例，并非真实的接口地址
      data: {
        page: ++me.data.page,
        size: me.data.size,
        userId: me.data.userId
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data;
        resData.data.map((item, index) => {
          resData.data[index].createTime = util.formatTimeByFormat(item.createTime, 'Y/M/D h:m');
        })
        me.setData(
          {
            items: [...me.data.items, ...resData.data]
          }
        )
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
  toTop: function () {
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
  queryAction: function (event) {
    // console.log(event);
    // var _type = event.target.dataset.value;
    // this.setData({
    //   type: _type,
    //   page: 0,
    //   items: []
    // })
    this._getLogList();

  },

  /**
   * 搜索值变化
   */
  searchValueChange: function (event) {
    var _curInput = event.detail.value;
    var _curUserIdOrShortName = '';
    console.log(_curInput);
    if(~_curInput.indexOf('http')) {
      _curUserIdOrShortName = _curInput.split('?')[0].split('/').pop();
    }else {
      _curUserIdOrShortName = _curInput;
    }

    this.setData({
      page: 0,
      userId: _curUserIdOrShortName
    })
  }
})