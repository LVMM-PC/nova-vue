import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () =>
      import(/* webpackChunkName: "icon" */ '../views/demos/IconDemo.vue')
  },
  {
    path: '/select',
    name: 'Select',
    component: () =>
      import(/* webpackChunkName: "select" */ '../views/demos/SelectDemo.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () =>
      import(/* webpackChunkName: "radio" */ '../views/demos/RadioDemo.vue')
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () =>
      import(
        /* webpackChunkName: "checkbox" */ '../views/demos/CheckboxDemo.vue'
      )
  },
  {
    path: '/date-picker',
    name: 'DatePicker',
    component: () =>
      import(
        /* webpackChunkName: "date-picker" */ '../views/demos/DatePickerDemo.vue'
      )
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () =>
      import(
        /* webpackChunkName: "calendar" */ '../views/demos/CalendarDemo.vue'
      )
  },
  {
    path: '/auto-complete',
    name: 'Autocomplete',
    component: () =>
      import(
        /* webpackChunkName: "auto-complete" */ '../views/demos/AutoCompleteDemo.vue'
      )
  },
  {
    path: '/alert',
    name: 'Alert',
    component: () =>
      import(/* webpackChunkName: "alert" */ '../views/demos/AlertDemo.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
