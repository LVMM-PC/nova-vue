<template>
  <section>
    <NovaSelect v-model="selectedItem">
      <NovaOption label="Beijing" value="beijing"></NovaOption>
      <NovaOption label="Shanghai" value="shanghai"></NovaOption>
      <NovaOption disabled label="Disabled" value="disabled"></NovaOption>
    </NovaSelect>
    <NovaSelect disabled value="shanghai">
      <NovaOption label="Shanghai" value="shanghai"></NovaOption>
    </NovaSelect>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 'shanghai'
    };
  }
};
</script>

<style scoped>
.nova-select {
  width: 120px;
}
</style>
