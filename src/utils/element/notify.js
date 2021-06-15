// mian.js添加
// import Notification from '@/' //引入通知消息封装
// Vue.prototype.$notify = Notification;
// 调用
// this.$notify.notify('标题 ','内容','success','bottom-right',0)

import { 
    ElNotification
   } from 'element-plus'

let notifys = {
  notify
}

export default notifys

export function notify (title = '标题', text = '内容', type = '类型', position = '消息位置', time = '自动关闭') {
    ElNotification({
    title: title,
    message: text,
    type: type, // success,warning,info,error
    position: position, // bottom-right/left,top-right/left
    duration: time // 0不自动关闭
  })
}