const app = getApp();
const db = wx.cloud.database()
// pages/plan/plan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    showDialog: false,
    currI: 0, //弹窗操作删除的是哪一天
    currIndex: 0, //用来记录弹窗操作的是哪一条计划
    tabbar:{},
    array_date:[],
    array_plan: [],
    // 工作	蓝色 #17abe3
    // 学习	红色 #d81e06
    // 娱乐	紫色 #a80c70
    // 运动	黄色 #fa8707
    // 休息	绿色 #12c151
    // 其他	灰色 #8a8a8a
    array_color: ['#17abe3', '#d81e06', '#a80c70', '#fa8707', '#12c151', '#8a8a8a']
  },

  toggleDialog(e) {
    let index = e.currentTarget.dataset.index;
    let i = e.currentTarget.dataset.i;
    //最好是在弹框出现是设置currIndex，弹框消失时不设置
    this.setData({
      showDialog: !this.data.showDialog,
      currIndex: index,
      currI: i
    });
  },

  /**
   * 点击单选框改变状态
   */
  checkboxChange: function(e){
    let index = e.currentTarget.dataset.index;
    //console.log(index);
    let that = this;
    let temp = 'array_plan[' + index + '].isCompleted';
    this.setData({
      [temp]: !(this.data.array_plan[index].isCompleted)
    });
    //console.log(this.data.array_plan[index].isCompleted)
    //更新数据库信息
    let id = this.data.array_plan[index]._id;
    db.collection('plan').doc(id).update({
      data:{
        is_completed: !(this.data.array_plan[index].is_completed)
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    //更新目标统计
    //完成时增加目标进度，取消完成时减少目标进度
  },

  /**
   * 修改计划
   */
  modifyPlan: function(e){
    //把数据传到修改页面进行修改
  },


  /**
   * 删除计划
   */
  deletePlan:function(e){
    let that = this;
    let index = this.data.currIndex;
    let i = this.data.currI;
    //从数据库删除这条记录
    //如果是这天的最后一个计划，则把date中这天的记录也删除
    let id = this.data.array_plan[index]._id;
    let date_id = this.data.array_plan[index].dateid;
    db.collection('plan').where({
      _openid: that.data.openid,
      dateid: date_id
    })
    .get({
      success: function(res){
        if(res.data.length === 1){
          db.collection('date').doc(date_id).remove({
            success: function (res) {
              console.log(res.data)
            }
          })  
          //从data中删除
          //这里删除date要注意this的指代，所以此处用that
          that.data.array_date.splice(i, 1);
          that.setData({
            array_date: that.data.array_date,
          }); 
        }

        //防止查询延迟，再上次查询成功后再进行删除操作
        db.collection('plan').doc(id).remove({
          success: function (res) {
            console.log(res.data)
          }
        })    
      }
    })
    
    //从data中删除这条记录
    this.data.array_plan.splice(index, 1);
    this.setData({
      array_plan: this.data.array_plan,
      //关闭弹窗
      showDialog: !this.data.showDialog
    });
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
    let that = this;
    const dates = db.collection('date').where({
      _openid: that.data.openid
    })
      .get({
        success: function (res) {
          that.setData({
            array_date: res.data
          })
        }
      })
    //读入计划列表
    const plans = db.collection('plan').where({
      _openid: that.data.openid
    })
    .get({
      success: function (res) {
        that.setData({
          array_plan: res.data
        })
      }
    })
    console.log(that.data.array_date)
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