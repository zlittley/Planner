Page({
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
      workTime: wx.getStorageSync('workTime'),
      restTime: wx.getStorageSync('restTime')
    })
  },
  changeWorkTime: function (e) {
    wx.setStorage({
      key: 'workTime',
      data: e.detail.value
    })
  },
  changeRestTime: function (e) {
    wx.setStorage({
      key: 'restTime',
      data: e.detail.value
    })
  },
  
  completeSetting: function(e){
    //要跳转的页面在tabBar中，此处用switchTab实现跳转
    wx.switchTab({
      url: '../me/me',
    })
  }
})
