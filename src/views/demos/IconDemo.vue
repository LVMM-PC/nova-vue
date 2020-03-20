<template>
  <section>
    <NovaIconBottom
      v-for="i in 100"
      :key="i"
      class="custom-class-name"
      @click="onClick"
    />
  </section>
</template>

<script>
import NovaIconBottom from '@/icons/NovaIconBottom';

export default {
  name: 'IconDemo',
  components: { NovaIconBottom },
  methods: {
    onClick(e) {
      console.log(e);
    }
  }
};
</script>
