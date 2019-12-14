import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
// import '@/static/plugins/echarts-3.8.5/echarts.common.min.js'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    this.$store.dispatch('Authenticate',{}).then(resp => {
      if (!resp.data) {
        window.location.href = 'http://localhost:9999'
      }
      this.listLoading = false
    }).catch(() => {
      this.listLoading = false
    })
  },
  render: h => h(App)
})
