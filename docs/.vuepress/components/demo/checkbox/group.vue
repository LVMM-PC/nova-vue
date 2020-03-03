<template>
  <section>
    <NovaCheckboxGroup v-model="someValue">
      <NovaCheckbox v-for="option in options" :value="option.value">
        {{ option.label }}
      </NovaCheckbox>
    </NovaCheckboxGroup>

    <NovaCheckboxGroup v-model="anotherValue">
      <NovaCheckbox v-for="option in options" :value="option.value">
        {{ option.label }}
      </NovaCheckbox>
    </NovaCheckboxGroup>

    <NovaCheckboxGroup v-model="thirdValue" disabled>
      <NovaCheckbox v-for="option in options" :value="option.value">
        {{ option.label }}
      </NovaCheckbox>
    </NovaCheckboxGroup>
  </section>
</template>

<script>
export default {
  data() {
    return {
      someValue: [],
      anotherValue: [],
      thirdValue: ['apple'],
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Peach', value: 'peach' },
        { label: 'Orange', value: 'orange' },
        { label: 'Cherry', value: 'cherry' }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.nova-checkbox-group {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
