import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import PortalVue from 'portal-vue';
import ClientOnly from 'vue-client-only';
import './styles/index.less';

Vue.use(VueCompositionApi);
Vue.use(PortalVue);
Vue.component('ClientOnly', ClientOnly);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
