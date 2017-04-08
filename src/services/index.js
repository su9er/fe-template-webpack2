import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.usse(VueResource);

Vue.http.interceptors.push((req, next) => {
  next(res => {
    if (res.status === 200) {
      if (res.data && response.data.code === 1) {
        return res;
      } else {
        if (res.data.code === 2) {
          // 未登陆,跳转回登陆页
          setTimeout(() => {
            location.href = '/login';
          }, 2000);
        }
        res.ok = false;
      }
    } else {
      res.ok = false;
    }
  })
});
