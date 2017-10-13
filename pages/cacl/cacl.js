// pages/cacl/cacl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn1: "CE",
    btn2: "C",
    btn3: "history",
    btn4: "/",
    btn5: "7",
    btn6: "8",
    btn7: "9",
    btn8: "*",
    btn9: "4",
    btn10: "5",
    btn11: "6",
    btn12: "-",
    btn13: "1",
    btn14: "2",
    btn15: "3",
    btn16: "+",
    btn17: ".",
    btn18: "0",
    btn19: "±",
    btn20: "=",
    caclData: "0",
    lastSymbol: false,
    arr: [],
    logs: []
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

  },
  history: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  btnClick: function (event) {
    console.log(event.target.id);
    var id = event.target.id;
    var cd = this.data.caclData;

    if (this.data.btn1 == id) {
      // CE键 退格
      if (cd == 0) {
        return;
      }
      cd = cd.substring(0, cd.length - 1);
      if (cd == '' || cd == '-') {
        cd = 0;
      }
      this.setData({ caclData: cd })
      // 退格去掉一个
      this.data.arr.pop();

    } else if (this.data.btn2 == id) {
      //C键 清屏
      this.setData({ caclData: '0' });
      //清屏的时候，数组设置长的为0
      this.data.arr.length = 0;

    } else if (this.data.btn19 == id) {
      //±号
      if (cd == 0) {
        return;
      }
      //bug--在输入第二位数之后还能继续改变正负号，
      var fristWord = cd.substring(0, 1);
      if (fristWord == '-') {
        cd = cd.substring(1, cd.length);
        //如果是‘-’去掉第一个元素
        this.data.arr.shift();
      } else {
        cd = '-' + cd;
        this.data.arr.unshift('-');
      }
      this.setData({ caclData: cd });
    } else if (this.data.btn20 == id) {

      if (cd == 0) {
        return;
      }

      var lastWord = cd.substring(cd.length - 1, cd.length);
      console.log('最后一位' + lastWord);
      if (isNaN(lastWord)) {
        return;
      }
      var num = "";
      var lastOperator;
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.btn17 || arr[i] == this.data.btn19) {
          num = num + arr[i];
        } else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0]) * 1.0;
      console.log('result:' + result);
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          //加减乘除运算
          if (optarr[1] == this.data.btn16) {
            result = result + Number(optarr[i + 1])
          } else if (optarr[1] == this.data.btn12) {
            result = result - Number(optarr[i + 1])
          } else if (optarr[1] == this.data.btn8) {
            result = result * Number(optarr[i + 1])
          } else if (optarr[1] == this.data.btn4) {
            result = result / Number(optarr[i + 1])
          }
        }
      }
      //保存结果值
      this.data.logs.push(cd+"="+result);
      wx.setStorageSync('Storagelogs',this.data.logs);
      //取出来看看
      console.log('取出来看看:' + wx.getStorageSync('Storagelogs'));
      //算完清空数组
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({ caclData: result + "" })

    } else {
      //判断加减乘除输入是否合法
      if (id == this.data.btn4 || id == this.data.btn8 || id == this.data.btn12 || id == this.data.btn16) {
        if (this.data.lastSymbol == true || this.data.caclData == 0) {
          return;
        }
      }
      //数据添加
      if (cd == 0) {
        cd = id;
      } else {
        cd = cd + id;
      }
      this.setData({ caclData: cd });

      this.data.arr.push(id);
      //判断加减乘除输入是否合法
      if (id == this.data.btn4 || id == this.data.btn8 || id == this.data.btn12 || id == this.data.btn16) {
        this.setData({ lastSymbol: true });
      } else {
        this.setData({ lastSymbol: false });
      }

    }



  }
})