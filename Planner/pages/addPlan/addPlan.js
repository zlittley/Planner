// pages/addPlan/addPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_from:'2019-11-11',
    time_from:'00:00',
    date_to:'2019-11-11',
    time_to:'23:59'
  },

  bindDateFromChange:function(e){
    this.setData({
      date_from:e.detail.value
    })
  },

  bindTimeFromChange: function (e) {
    this.setData({
      time_from: e.detail.value
    })
  },

  bindDateToChange: function (e) {
    this.setData({
      date_to: e.detail.value
    })
  },

  bindTimeToChange: function (e) {
    this.setData({
      time_to: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  confirmAdd: function (e) {
    wx.switchTab({
      url: '../plan/plan',
    })
  }
})