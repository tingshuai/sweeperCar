import app from './app.ui'

let options = {
  app: app
}
ui.extend({
  http(obj){
    let that = this;
    ui.request({
      url: `${obj.url}`, //仅为示例，并非真实接口地址。
      method:obj.method || "POST",
      data: obj.params,
      header: {
        "token": ui.getApp().globalData.token || "",
        "content-type" : obj.contentType || "application/json"
      },
      success: (res) => {
        obj.scb(res)
        if(res.data.code == 401 || res.data.code == 203 ){//token失效....
          debugger;
          ui.navigateTo({
            url:`/pages/login`
          })
        }
      },
      fail(res){
        obj.fcb(res)
      }
    });
  }
})
ui.start(options)