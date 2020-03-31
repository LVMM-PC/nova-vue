<template>
  <section>
    <NovaButton>Primary</NovaButton>
    <NovaButton disabled>Primary</NovaButton>
    <NovaButton loading>Primary</NovaButton>
  </section>
</template>

<script>
import NovaButton from '@/components/button/NovaButton';
export default {
  name: 'ButtonDemo',
  components: { NovaButton }
};
</script>

<style scoped></style>
