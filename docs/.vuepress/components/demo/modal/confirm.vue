<template>
  <section>
    <NovaButton @click="showConfirm">Confirm</NovaButton>
    <NovaButton @click="showDeleteConfirm">Delete</NovaButton>
    <NovaButton @click="showPropsConfirm">With extra props</NovaButton>
  </section>
</template>

<script>
import { createElement } from '@vue/composition-api';
import { NovaConfirm, NovaIconHelp } from 'nova-vue';

const { confirm } = NovaConfirm;
const h = createElement;

export default {
  setup() {
    function showConfirm() {
      confirm({
        title: 'Do you want to delete these items?',
        icon: () => h(NovaIconHelp),
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }

    function showDeleteConfirm() {
      confirm({
        title: 'Are you sure delete this task?',
        icon: () => h(NovaIconHelp),
        content: 'Some descriptions',
        okText: 'Yes',
        okButtonProps: {
          props: {
            danger: true
          }
        },
        cancelText: 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }

    function showPropsConfirm() {
      confirm({
        title: 'Are you sure delete this task?',
        icon: () => h(NovaIconHelp),
        content: 'Some descriptions',
        okText: 'Yes',
        okButtonProps: {
          props: {
            danger: true,
            disabled: true
          }
        },
        cancelText: 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }

    return {
      showConfirm,
      showDeleteConfirm,
      showPropsConfirm
    };
  }
};
</script>
