const app = getApp();
// pages/plan/plan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    array_plan: [
      {
        name: '写代码',
        date_from: '2019-11-11',
        time_from: '00:00',
        date_to: '2019-11-11',
        time_to: '23:59',
        repeat: '每天',
        alarm: '任务开始前5分钟',
        goal: '无',
        type: '工作',
        isCompleted: false
      },
      {
        name: '读书啊读书，我爱读书，读书爱我，嘿嘿嘿',
        date_from: '2019-11-11',
        time_from: '00:00',
        date_to: '2019-11-11',
        time_to: '23:59',
        repeat: '每天',
        alarm: '任务开始前5分钟',
        goal: '无',
        type: '学习',
        isCompleted: false
      },
      {
        name: '读书',
        date_from: '2019-11-11',
        time_from: '00:00',
        date_to: '2019-11-11',
        time_to: '23:59',
        repeat: '每天',
        alarm: '任务开始前5分钟',
        goal: '无',
        type: '学习',
        isCompleted: false
      },
      {
        name: '看电影',
        date_from: '2019-11-11',
        time_from: '10:00',
        date_to: '2019-11-11',
        time_to: '11:00',
        repeat: '每天',
        alarm: '任务开始前5分钟',
        goal: '无',
        type: '娱乐',
        isCompleted: false
      },
      {
        name: '打篮球',
        date_from: '2019-11-11',
        time_from: '11:11',
        date_to: '2019-11-11',
        time_to: '23:59',
        repeat: '每天',
        alarm: '任务开始前5分钟',
        goal: '无',
        type: '运动',
        isCompleted: false
      }
    ],
    // 工作	蓝色 #17abe3
    // 学习	红色 #d81e06
    // 娱乐	紫色 #a80c70
    // 运动	黄色 #fa8707
    // 休息	绿色 #12c151
    // 其他	灰色 #8a8a8a
    array_color: ['#17abe3', '#d81e06', '#a80c70', '#fa8707', '#12c151', '#8a8a8a']
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