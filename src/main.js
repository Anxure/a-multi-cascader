import Vue from 'vue'
import App from './App.vue'
import './plugins/useAntd'
import 'ant-design-vue/dist/antd.less'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
