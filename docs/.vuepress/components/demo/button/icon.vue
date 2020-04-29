<template>
  <section>
    <NovaButton type="secondary">
      <NovaIconCheckCircle slot="icon" />
    </NovaButton>
    <NovaButton type="secondary">
      <span slot="icon" class="font-icon">A</span>
    </NovaButton>
    <NovaButton type="secondary">
      <NovaIconCheckCircle slot="icon" />
      Finish
    </NovaButton>
    <NovaButton>
      <NovaIconCheckCircle slot="icon" />
    </NovaButton>
    <NovaButton>
      <NovaIconCheckCircle slot="icon" />
      Finish
    </NovaButton>
  </section>
</template>

<script>
import { NovaIconCheckCircle } from 'nova-vue';

export default {
  components: { NovaIconCheckCircle }
};
</script>

<style>
.font-icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  padding: 2px;
  vertical-align: top;
  line-height: 1em;
  margin-top: 1px;
}
</style>
