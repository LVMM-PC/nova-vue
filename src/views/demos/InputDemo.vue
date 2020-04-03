<template>
  <section>
    <div class="box">
      <NovaInput></NovaInput>
    </div>
    <div class="box">
      <NovaInput readonly value="Text"></NovaInput>
    </div>
    <div class="box">
      <NovaInput disabled value="Text"></NovaInput>
    </div>
    <div class="box">
      <NovaInput type="password"></NovaInput>
    </div>
  </section>
</template>

<script>
import NovaInput from '@/components/input/NovaInput';

export default {
  name: 'InputDemo',
  components: { NovaInput }
};
</script>

<style scoped></style>
