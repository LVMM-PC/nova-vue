<template>
  <section>
    <NovaButton type="secondary">
      <NovaIconSearch slot="icon" />
    </NovaButton>
    <NovaButton type="secondary">
      <span slot="icon" class="font-icon">A</span>
    </NovaButton>
    <NovaButton type="secondary">
      <NovaIconSearch slot="icon" />
      Search
    </NovaButton>
    <NovaButton>
      <NovaIconSearch slot="icon" />
    </NovaButton>
    <NovaButton>
      <NovaIconSearch slot="icon" />
      Search
    </NovaButton>
  </section>
</template>

<script>
import { NovaIconSearch } from 'nova-vue';

export default {
  components: { NovaIconSearch }
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
