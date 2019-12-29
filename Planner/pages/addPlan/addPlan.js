// pages/addPlan/addPlan.js
// let util = require('../../utils/util.js');
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    dateid: '',
    date_from:'2019-11-11',
    time_from:'00:00',
    date_to:'2019-11-11',
    time_to:'00:00',
    repeat: '每天',
    alarm: '任务开始前5分钟',
    goal: '无',
    type: 0,
    icon: 'plan_work.png',
    planTypes:['工作','学习','娱乐','运动','休息','其他'],
    array_goal:[]
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
          type: 0,
          icon: 'plan_work.png'
        });
        break;
      case '1':
        this.setData({
          type: 1,
          icon: 'plan_study.png'
        });
        break;
      case '2':
        this.setData({
          type: 2,
          icon: 'plan_recreation.png'
        });
        break;
      case '3':
        this.setData({
          type: 3,
          icon: 'plan_exercise.png'
        });
        break;
      case '4':
        this.setData({
          type: 4,
          icon: 'plan_rest.png'
        });
        break;
      case '5':
        this.setData({
          type: 5,
          icon: 'plan_others.png'
        });
        break;
      default:
        break;
    }
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        //console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()
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
    //从数据库读取goal
    let that = this;
    const goals = db.collection('goal').where({
      _openid: that.data.openid
    })
    .get({
      success: function(res){
        that.setData({
          array_goal: res.data
        })
      }
    })

    //获取当前时间并设置给timepicker
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    //获取年份  
    let year = date.getFullYear();
    //获取月份  
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    //获取当前小时
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    //获取当前分钟
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    this.setData({
      date_from: year + '-' + month + '-' + day,
      date_to: year + '-' + month + '-' + day,
      time_from: hour + ':' + minute,
      time_to: hour + ':' + minute
    })
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

  confirmSubmit: function (e) {
    let that = this;
    //添加计划
    //console.log(e.detail);


    ////////////////////////////////////////
    //我这么写是因为我吐了，等我冷静下来再修改吧


    db.collection('date').where({
      _openid: that.data._openid,
      date: e.detail.value.date_from
    })
    .get({
      success: function(res){
        //
        if (res.data.length === 0){
          db.collection('date').add({
            data:{
              _openid: that.data._openid,
              date: e.detail.value.date_from
            },
            success: function(res){ //查询存在延迟，不能直接用let定义一个dateid变量然后赋值给plan的dateid，必须等date查询出结果后再进行add plan的操作
              // that.setData({
              //   dateid: res._id
              // }) 

              db.collection('plan').add({
                data: {
                  _openid: that.data._openid, //？？？这里不应该是openid吗，为什么_openid才对？
                  dateid: res._id,
                  name: e.detail.value.name,
                  date_from: e.detail.value.date_from,
                  date_to: e.detail.value.date_to,
                  time_from: e.detail.value.time_from,
                  time_to: e.detail.value.time_to,
                  type: e.detail.value.type,
                  location: e.detail.value.location,
                  desc: e.detail.value.desc,
                  is_completed: false
                },
                success: function (res) {
                  console.log(res)
                  wx.showToast({
                    title: '添加成功',
                    icon: '',
                    duration: 1000,
                    success: function () {
                      setTimeout(function () {
                        wx.switchTab({
                          url: '../plan/plan',
                        });
                      }, 1000);
                    }
                  })
                }
              })          
            }
          })
        }else{
          // that.setData({
          //   dateid: res.data._id
          // }) 
          db.collection('plan').add({
            data: {
              _openid: that.data._openid, //？？？这里不应该是openid吗，为什么_openid才对？
              dateid: res.data[0]._id,
              name: e.detail.value.name,
              date_from: e.detail.value.date_from,
              date_to: e.detail.value.date_to,
              time_from: e.detail.value.time_from,
              time_to: e.detail.value.time_to,
              type: e.detail.value.type,
              location: e.detail.value.location,
              desc: e.detail.value.desc,
              is_completed: false
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '添加成功',
                icon: '',
                duration: 1000,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../plan/plan',
                    });
                  }, 1000);
                }
              })
            }
          })   
        }
      }
    })

    // let data_id = that.data.dateid;
    // console.log(data_id)

    // db.collection('plan').add({
    //   data:{
    //     _openid: that.data._openid, //？？？这里不应该是openid吗，为什么_openid才对？
    //     dateid: data_id,
    //     name: e.detail.value.name,
    //     date_from: e.detail.value.date_from,
    //     date_to: e.detail.value.date_to,
    //     time_from: e.detail.value.time_from,
    //     time_to: e.detail.value.time_to,
    //     type: e.detail.value.type,
    //     location: e.detail.value.location,
    //     desc: e.detail.value.desc
    //   },
    //   success:function(res){
    //     console.log(res)
    //     wx.showToast({
    //       title: '添加成功',
    //       icon: '',
    //       duration: 1000,
    //       success: function () {
    //         setTimeout(function () {
    //           wx.switchTab({
    //             url: '../plan/plan',
    //           });
    //         }, 1000);
    //       }
    //     })    
    //   }
    // })   
  }
})