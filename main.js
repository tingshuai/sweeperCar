import app from './app.ui'

let options = {
  app: app
}
ui.extend({
  http(obj){
    let that = this;
    let a = ui.getApp().globalData.token;
    debugger;
    ui.request({
      url: `${obj.url}`, //仅为示例，并非真实接口地址。
      method:obj.method || "POST",
      data: obj.params,
      header: {
        "token": ui.getApp().globalData.token || "",
        "content-type" : obj.contentType || "application/json"
      },
      success: (res) => {
        if( res.data.code == 203 ){//token失效....
          debugger;
          ui.navigateTo({
            url:`/pages/login`
          })
        }else if( res.data.code == 200 ){//成功......
          obj.scb(res)
        }else if( res.data.code == 401 ){//返回提示.....
          ui.showToast({ title: res.data.msg, icon: 'none' ,duration:2000})
        }
      },
      fail(res){
        obj.fcb(res)
      }
    });
  }
})
ui.start(options)