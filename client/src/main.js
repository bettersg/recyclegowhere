import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store' 
import router from '@/router'

// Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
