<template>
  <section>
    <NovaButton type="primary" loading>Loading</NovaButton>
    <NovaButton type="secondary" loading>
      <NovaIconCheckCircle slot="icon" />
      Loading
    </NovaButton>
    <NovaButton loading>
      <NovaIconCheckCircle slot="icon" />
    </NovaButton>
    <br />
    <NovaButton
      type="primary"
      :loading="state.primaryLoading"
      @click="enterPrimary"
      >Loading
    </NovaButton>
    <NovaButton
      type="secondary"
      :loading="state.secondaryLoading"
      @click="enterSecondary"
    >
      <NovaIconCheckCircle slot="icon" />
      Loading
    </NovaButton>
    <NovaButton :loading="state.iconLoading" @click="enterIcon">
      <NovaIconCheckCircle slot="icon" />
    </NovaButton>
  </section>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { NovaIconCheckCircle } from 'nova-vue';

export default {
  name: 'loading',
  components: { NovaIconCheckCircle },
  setup() {
    const state = reactive({
      primaryLoading: false,
      secondaryLoading: false,
      iconLoading: false
    });

    function enterPrimary() {
      state.primaryLoading = true;
      setTimeout(() => {
        state.primaryLoading = false;
      }, 2000);
    }

    function enterSecondary() {
      state.secondaryLoading = true;
      setTimeout(() => {
        state.secondaryLoading = false;
      }, 2000);
    }

    function enterIcon() {
      state.iconLoading = true;
      setTimeout(() => {
        state.iconLoading = false;
      }, 2000);
    }

    return {
      state,
      enterPrimary,
      enterSecondary,
      enterIcon
    };
  }
};
</script>
