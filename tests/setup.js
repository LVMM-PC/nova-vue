import Vue from 'vue';
import ClientOnly from './__mocks__/lib/ClientOnly';
import MountingPortal from './__mocks__/lib/MountingPortal';
import nova from '@/index';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.component('ClientOnly', ClientOnly);
Vue.component('MountingPortal', MountingPortal);

global.nova = nova;
