import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { ElLoading } from 'element-plus';
import axios from "axios"

import config from "./assets/js/config"
import conmon from "./utils/conmon"
import api from "./utils/axios/index"
import notify from "./utils/element/notify"
import message from "./utils/element/message"

const app = createApp(App)
let loadingInstance ;
app.config.globalProperties.$config = config;
app.config.globalProperties.$n = notify;
app.config.globalProperties.$mb = message;
app.config.globalProperties.$conmon = conmon;
app.config.globalProperties.$api = api;
// app.config.globalProperties.$utils = utils;
app.config.globalProperties.$axios = axios;

installElementPlus(app)
app.use(store).use(router).mount('#app')

axios.interceptors.request.use(
    config => {
      loadingInstance = ElLoading .service({ // 服务式调用
        lock: true,
        text: '臣妾做不到啊...  ',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)', 
        lock:true
      })
      if (JSON.parse(window.sessionStorage.getItem("users"))) {
        config.headers.Authorization = JSON.parse(window.sessionStorage.getItem("users")).token
      }else if(window.sessionStorage.getItem("users")==null){ 
        config.headers.Authorization =""
      }  
      return config
    },
    error => {
      return Promise.error(error)
    }
  )
  axios.interceptors.response.use(res => {
    if (res.status === 200) {
      setTimeout(() => {
        loadingInstance.close()
      }, 300)
      return res.data
    } else {
      return Promise.reject(res)
    }
  })