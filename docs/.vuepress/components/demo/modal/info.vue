<template>
  <section>
    <NovaButton @click="info">Info</NovaButton>
    <NovaButton @click="success">Success</NovaButton>
    <NovaButton @click="error">Error</NovaButton>
    <NovaButton @click="warning">Warning</NovaButton>
  </section>
</template>

<script>
import { createElement } from '@vue/composition-api';
import { NovaConfirm } from 'nova-vue';

const h = createElement;

export default {
  setup() {
    function info() {
      NovaConfirm.info({
        title: 'This is a notification message',
        content: () =>
          h('div', [
            h('p', ['some messages...some messages...']),
            h('p', ['some messages...some messages...'])
          ])
      });
    }

    function success() {
      NovaConfirm.success({
        content: 'some messages...some messages...'
      });
    }

    function error() {
      NovaConfirm.error({
        title: 'This is a error message',
        content: 'some messages...some messages...'
      });
    }

    function warning() {
      NovaConfirm.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...'
      });
    }

    return {
      info,
      success,
      error,
      warning
    };
  }
};
</script>
