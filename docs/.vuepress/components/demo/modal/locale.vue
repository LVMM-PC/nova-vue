<template>
  <section>
    <div>
      <NovaButton @click="showModal">
        Open Modal
      </NovaButton>
      <NovaModal
        title="Modal"
        v-model="state.visible"
        @ok="hideModal"
        @cancel="hideModal"
        ok-text="OK"
        cancel-text="Cancel"
      >
        <p>bla bla ...</p>
        <p>bla bla ...</p>
        <p>bla bla ...</p>
      </NovaModal>
    </div>
    <br />
    <NovaButton @click="showConfirm">Confirm</NovaButton>
  </section>
</template>

<script>
import { reactive, createElement } from '@vue/composition-api';
import { NovaConfirm, NovaIconHelp } from 'nova-vue';

const h = createElement;

export default {
  setup() {
    const state = reactive({
      visible: false
    });

    function showModal() {
      state.visible = true;
    }

    function hideModal() {
      state.visible = false;
    }

    function showConfirm() {
      NovaConfirm.confirm({
        title: 'Confirm?',
        icon: () => h(NovaIconHelp),
        content: 'bla bla ...',
        okText: 'OK',
        cancelText: 'Cancel'
      });
    }

    return {
      state,
      showModal,
      hideModal,
      showConfirm
    };
  }
};
</script>
