// pages/addPlan/addPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_from:'2019-11-11',
    time_from:'00:00',
    date_to:'2019-11-11',
    time_to:'23:59',
    repeat: '每天',
    alarm: '任务开始前5分钟',
    goal: '无',
    type: '工作',
    icon: 'plan_work.png',
    planTypes:['工作','学习','娱乐','运动','休息','其他']
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

  bindPlanTypeChange:function(e){
    switch (e.detail.value){
      case '0':
        this.setData({
          type: '工作',
          icon: 'plan_work.png'
        });
        break;
      case '1':
        this.setData({
          type: '学习',
          icon: 'plan_study.png'
        });
        break;
      case '2':
        this.setData({
          type: '娱乐',
          icon: 'plan_recreation.png'
        });
        break;
      case '3':
        this.setData({
          type: '运动',
          icon: 'plan_exercise.png'
        });
        break;
      case '4':
        this.setData({
          type: '休息',
          icon: 'plan_rest.png'
        });
        break;
      case '5':
        this.setData({
          type: '其他',
          icon: 'plan_others.png'
        });
        break;
      default:
        break;
    }
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