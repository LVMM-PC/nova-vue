<template>
  <NovaSelect v-model="selectedItem">
    <NovaOptGroup label="Municipality directly under the Central Government">
      <NovaOption value="beijing" label="Beijing"></NovaOption>
      <NovaOption value="shanghai" label="Shanghai"></NovaOption>
    </NovaOptGroup>
    <NovaOptGroup label="Special Administrative Region">
      <NovaOption value="hongkong" label="Hong Kong"></NovaOption>
      <NovaOption value="macao" label="Macao"></NovaOption>
    </NovaOptGroup>
  </NovaSelect>
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
