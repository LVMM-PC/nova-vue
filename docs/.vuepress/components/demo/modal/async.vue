<template>
  <section>
    <NovaButton @click="showModal">
      Open Modal with async logic
    </NovaButton>
    <NovaModal
      title="Title"
      v-model="state.visible"
      :confirm-loading="state.confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ state.modalText }}</p>
    </NovaModal>
  </section>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
  setup() {
    const defaultText = 'Content of the modal';
    const state = reactive({
      modalText: defaultText,
      visible: false,
      confirmLoading: false
    });

    function showModal() {
      state.modalText = defaultText;
      state.visible = true;
    }

    function handleOk() {
      state.modalText = 'The modal will be closed after two seconds';
      state.confirmLoading = true;
      setTimeout(() => {
        state.visible = false;
        state.confirmLoading = false;
      }, 2000);
    }

    function handleCancel() {
      console.log('Clicked cancel button');
      state.visible = false;
    }

    return {
      state,
      showModal,
      handleOk,
      handleCancel
    };
  }
};
</script>
