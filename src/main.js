import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './plugins/vuex'
import vuetify from './plugins/vuetify'
import format from './lib/time'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.filter('format', format);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
