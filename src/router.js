import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('./views/demos/SelectDemo.vue')
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('./views/demos/RadioDemo.vue')
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: () => import('./views/demos/CheckboxDemo.vue')
    },
    {
      path: '/date-picker',
      name: 'date-picker',
      component: () => import('./views/demos/DatePickerDemo.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./views/demos/CalendarDemo.vue')
    },
    {
      path: '/autocomplete',
      name: 'autocomplete',
      component: () => import('./views/demos/AutocompleteDemo.vue')
    },
    {
      path: '/alert',
      name: 'alert',
      component: () => import('./views/demos/AlertDemo.vue')
    }
  ]
});
