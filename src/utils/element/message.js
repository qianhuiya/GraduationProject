import { 
    ElMessageBox,
    ElMessage
   } from 'element-plus'

let messageFunction = {
  me, // 错误(MessageError)
  mi, // 取消(MessageInfo)
  ms, // 成功(MessageSuccess)
  mw, // 警告(MessageWarning)
  mbs // 多选(MessageBoxSuccess)
}

export default messageFunction

export function me (text = '错误') {
    ElMessage({
    message: text,
    type: 'error',
    duration: 3 * 1000
  })
}
export function mi (text = '取消') {
    ElMessage({
    message: text,
    type: 'info',
    duration: 3 * 1000
  })
}
export function ms (text = '成功') {
    ElMessage({
    message: text,
    type: 'success',
    duration: 3 * 1000
  })
}

export function mw (text = '警告') {
    ElMessage({
    message: text,
    type: 'warning',
    duration: 3 * 1000
  })
}

export function mbs (text1 = '标题',text2="提示内容", text3 = '成功消息的提示', text4 = '取消消息的提示', others) {
  return ElMessageBox.confirm(text2, text1, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    Message({
      message: text3,
      type: 'success',
      showClose: true,
      duration: 3 * 1000
    });
    others()
  }).catch(() => {
    Message({
      message: text4,
      type: 'warning',
      showClose: true,
      duration: 3 * 1000
    })
  });
}