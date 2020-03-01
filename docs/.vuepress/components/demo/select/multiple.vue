<template>
  <NovaSelect v-model="selectedItems" multiple>
    <NovaOption
      v-for="option in options"
      :value="option.value"
      :label="option.label"
    ></NovaOption>
  </NovaSelect>
</template>

<script>
export default {
  data() {
    return {
      selectedItems: ['beijing', 'shanghai'],
      options: [
        { value: 'beijing', label: 'Beijing' },
        { value: 'shanghai', label: 'Shanghai' },
        { value: 'shenzhen', label: 'Shenzhen' }
      ]
    };
  }
};
</script>
