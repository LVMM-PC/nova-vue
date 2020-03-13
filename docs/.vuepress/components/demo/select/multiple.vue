<template>
  <NovaSelect multiple v-model="selectedItems">
    <NovaOption
      :label="option.label"
      :value="option.value"
      v-for="option in options"
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
