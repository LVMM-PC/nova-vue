import Vue from 'vue';
import App from './App.vue';
import router from './router';

//region vue-client-only
import ClientOnly from 'vue-client-only';

Vue.component('ClientOnly', ClientOnly);
//endregion

//region portal-vue
import PortalVue from 'portal-vue';

Vue.use(PortalVue);
//endregion

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
