<template>
  <section>
    <NovaSelect v-model="selectedItem">
      <NovaOption value="beijing" label="Beijing"></NovaOption>
      <NovaOption value="shanghai" label="Shanghai"></NovaOption>
      <NovaOption value="disabled" label="Disabled" disabled></NovaOption>
    </NovaSelect>
    <NovaSelect value="shanghai" disabled>
      <NovaOption value="shanghai" label="Shanghai"></NovaOption>
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
