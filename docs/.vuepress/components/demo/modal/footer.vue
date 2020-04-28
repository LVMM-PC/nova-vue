<template>
  <section>
    <NovaButton @click="showModal">
      Open Modal with customized footer
    </NovaButton>
    <NovaModal
      title="Title"
      v-model="state.visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template v-slot:footer>
        <NovaButton @click="handleCancel">Return</NovaButton>
        <NovaButton type="secondary" :loading="state.loading" @click="handleOk">
          Submit
        </NovaButton>
      </template>
    </NovaModal>
  </section>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
  setup() {
    const state = reactive({
      visible: false,
      loading: false
    });

    function showModal() {
      state.visible = true;
    }

    function handleOk() {
      state.loading = true;
      setTimeout(() => {
        state.visible = false;
        state.loading = false;
      }, 2000);
    }

    function handleCancel() {
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
