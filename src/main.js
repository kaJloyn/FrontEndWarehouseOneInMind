import Vue from 'vue'
import App from './App.vue'
import locale from "element-ui/lib/locale/lang/en";




import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router/index";
import store from "./store"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueQrcodeReader from "vue-qrcode-reader";


Vue.use(VueQrcodeReader);
library.add(faUserSecret, faInfo)
Vue.component('fa-icon', FontAwesomeIcon)



Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(ElementUI, { locale });


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')


