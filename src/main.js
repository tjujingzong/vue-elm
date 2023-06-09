import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import qs from 'qs'
import {
  getCurDate,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from './common.js'

Vue.config.productionTip = false

// 设置axios的基础URL部分
// 服务器是8080，前端是8081
// axios.defaults.baseURL = 'http://localhost:8080/elm/';
axios.defaults.baseURL = 'http://localhost:14000/';
// axios.defaults.baseURL = 'http://121.36.109.247:8080/elm/';

//响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code == 403) {
    router.push('/error403') // 使用 router.push 方法进行页面跳转
  }
  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});
//项目三用上面的
// axios.defaults.baseURL = 'http://localhost:8080/elm_servlet_war_exploded/';
//项目四用这个
// 将axios挂载到vue实例上，使用时可以用this.$axios
Vue.prototype.$axios = axios;

Vue.prototype.$qs = qs;

Vue.prototype.$getCurDate = getCurDate;
Vue.prototype.$setSessionStorage = setSessionStorage;
Vue.prototype.$getSessionStorage = getSessionStorage;
Vue.prototype.$removeSessionStorage = removeSessionStorage;
Vue.prototype.$setLocalStorage = setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$removeLocalStorage = removeLocalStorage;

// 路由守卫，权限认证
router.beforeEach(function (to, from, next) {
  let user = sessionStorage.getItem('user');
  // 除了这些都要判断是否登录
  if (!(to.path == '/' || to.path == '/index' || to.path == '/businessList' || to.path == '/businessInfo' ||
    to.path == '/login' || to.path == '/register' || to.path == '/error403')) {
    if (user == null) {
      router.push('/login');
      location.reload();
    }
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
