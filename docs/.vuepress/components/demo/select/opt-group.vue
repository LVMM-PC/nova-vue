<template>
  <NovaSelect v-model="selectedItem">
    <NovaOptGroup label="Municipality directly under the Central Government">
      <NovaOption label="Beijing" value="beijing"></NovaOption>
      <NovaOption label="Shanghai" value="shanghai"></NovaOption>
    </NovaOptGroup>
    <NovaOptGroup label="Special Administrative Region">
      <NovaOption label="Hong Kong" value="hongkong"></NovaOption>
      <NovaOption label="Macao" value="macao"></NovaOption>
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
