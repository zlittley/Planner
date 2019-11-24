// pages/addGoal/addGoal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curId: 0,
    goalCountTypes: [
      { name: '数量', checked: true },
      { name: '时间', checked: false },
      { name: '百分比', checked: false }
    ]
  },

  // radio-group绑定的事件，实现tab标签效果
  radioChange: function (res) {
    // console.log("选中的标签：" + res.detail.value);
    var arrs = this.data.goalCountTypes;
    var that = this;
    for (const i in arrs) {
      if (arrs[i].name == res.detail.value) {
        arrs[i].checked = true;
      } else {
        arrs[i].checked = false;
      }
    }
    that.setData({
      goalCountTypes: arrs
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})