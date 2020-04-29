<template>
  <section>
    <NovaProgress
      :stroke-linecap="state.linecap"
      type="circle"
      :percent="0.25"
    ></NovaProgress>
    <p>Linecap: {{ state.linecap }}</p>
    <NovaButton @click="switchLinecap">Switch Linecap</NovaButton>
  </section>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
  setup() {
    const state = reactive({
      linecap: 'butt'
    });

    function switchLinecap() {
      switch (state.linecap) {
        case 'butt':
          state.linecap = 'round';
          break;
        case 'round':
          state.linecap = 'square';
          break;
        case 'square':
        default:
          state.linecap = 'butt';
          break;
      }
    }

    return {
      state,
      switchLinecap
    };
  }
};
</script>
