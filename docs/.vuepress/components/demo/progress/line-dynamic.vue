<template>
  <section>
    <NovaProgress type="line" :percent="state.percent"></NovaProgress>
    <NovaButton @click="increase">
      <NovaIconAddCircle slot="icon" />
    </NovaButton>
    <NovaButton @click="decrease">
      <NovaIconRemoveCircle slot="icon" />
    </NovaButton>
  </section>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { NovaIconAddCircle, NovaIconRemoveCircle } from 'nova-vue';

export default {
  components: {
    NovaIconRemoveCircle,
    NovaIconAddCircle
  },
  setup() {
    const state = reactive({
      percent: 0.2
    });

    function increase() {
      let percent = state.percent + 0.1;
      if (percent > 1) {
        percent = 1;
      }
      state.percent = percent;
    }

    function decrease() {
      let percent = state.percent - 0.1;
      if (percent < 0) {
        percent = 0;
      }
      state.percent = percent;
    }

    return {
      state,
      increase,
      decrease
    };
  }
};
</script>
