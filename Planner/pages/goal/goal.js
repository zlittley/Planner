const app = getApp();
// pages/goal/goal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goals:[
      {
        id: 1,
        title: '读书7本书',
        done: 1,
        total: 7
      },
      {
        id: 2,
        title: '读书7本书',
        done: 1,
        total: 7
      },
      {
        id: 3,
        title: '读书7本书',
        done: 1,
        total: 7
      }
    ],
    tabbar:{}
  },

  navigateToAddGoal:function(){
    wx.navigateTo({
      url: '../addGoal/addGoal',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.hidetabbar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.hidetabbar();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})