<template>
  <section>
    <NovaCheckboxGroup v-model="someValue">
      <NovaCheckbox :value="option.value" v-for="option in options">
        {{ option.label }}
      </NovaCheckbox>
    </NovaCheckboxGroup>

    <NovaCheckboxGroup v-model="anotherValue">
      <NovaCheckbox :value="option.value" v-for="option in options">
        {{ option.label }}
      </NovaCheckbox>
    </NovaCheckboxGroup>

    <NovaCheckboxGroup disabled v-model="thirdValue">
      <NovaCheckbox :value="option.value" v-for="option in options">
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
