<template>
  <section>
    <NovaButton @click="showConfirm">Confirm</NovaButton>
  </section>
</template>

<script>
import { createElement } from '@vue/composition-api';
import { NovaConfirm, NovaIconHelp } from 'nova-vue';

const h = createElement;

export default {
  setup() {
    function showConfirm() {
      const confirmInstance = NovaConfirm.confirm({
        title: 'Do you want to delete these items?',
        icon: () => h(NovaIconHelp),
        content:
          'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          confirmInstance.update({
            confirmLoading: true
          });

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              confirmInstance.update({
                confirmLoading: false
              });
              Math.random() > 0.5 ? resolve() : reject();
            }, 1000);
          }).catch(() => {
            console.log('Oops errors!');
          });
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }

    return {
      showConfirm
    };
  }
};
</script>
