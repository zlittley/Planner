const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}
//app.js
App({
  onLaunch: function () {
    //影藏系统tabBar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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

    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  },

  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },

  //自己对wx.hideTabBar的一个封装
  hidetabbar() {
    wx.hideTabBar({
      fail: function() {
        setTimeout(function() { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
  },
  getSystemInfo: function() {
    let t = this;
    wx.getSystemInfo({
      success: function(res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    systemInfo: null, //客户端设备信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#8d8d8d",
      "selectedColor": "#2c2c2c",
      "list": [
        {
          "pagePath": "/pages/plan/plan",
          "iconPath": "icon/plan.png",
          "selectedIconPath": "icon/plan_active.png",
          "text": "计划"
        },
        {
          "pagePath": "/pages/goal/goal",
          "iconPath": "icon/goal.png",
          "selectedIconPath": "icon/goal_active.png",
          "text": "目标"
        },
        {
          "pagePath": "/pages/addPlan/addPlan",
          "iconPath": "icon/add_plan.png",
          "isSpecial": true
        },
        {
          "pagePath": "/pages/timer/timer",
          "iconPath": "icon/timer.png",
          "selectedIconPath": "icon/timer_active.png",
          "text": "番茄钟"
        },
        {
          "pagePath": "/pages/me/me",
          "iconPath": "icon/me.png",
          "selectedIconPath": "icon/me_active.png",
          "text": "我"
        }
      ]
    }
  }
})