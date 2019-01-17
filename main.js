import app from './app.ui'

let options = {
  app: app
}
ui.extend({
  http(obj){
    let that = this;
    let a = ui.getApp().globalData.token;
    ui.showLoading();
    ui.request({
      url: `${obj.url}`, //仅为示例，并非真实接口地址。
      method:obj.method || "POST",
      data: obj.params,
      header: {
        "token": ui.getApp().globalData.token || "",
        "content-type" : obj.contentType || "application/json"
      },
      success: (res) => {
        // prompt("成功----",JSON.stringify(res))
        ui.hideLoading()
        if( res.data.code == 203 ){//token失效....
          ui.navigateTo({
            url:`/pages/login`
          })
        }else if( res.data.code == 200 ){//成功......
          obj.scb(res)
        }else if( res.data.code == 401 || res.data.code == 501){//返回提示.....
          ui.showToast({ title: res.data.msg, icon: 'none' ,duration:2000})
        }
      },
      fail(res){
        ui.hideLoading()
        // prompt("失败----",JSON.stringify(res))
        obj.fcb(res)
      }
    });
  }
})
ui.start(options)