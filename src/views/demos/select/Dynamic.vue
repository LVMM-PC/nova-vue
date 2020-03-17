<template>
  <div>
    <NovaSelect v-model="value" :append-to-body="true">
      <NovaOptGroup v-for="i in 3" :key="i">
        <NovaOption
          v-for="option in options"
          :key="option.value"
          :value="`${i}-${option.value}`"
          :label="option.label"
        >
        </NovaOption>
      </NovaOptGroup>
    </NovaSelect>
    <button @click="handleAddOption">Add option</button>
    <button @click="handleDeleteOption">Delete option</button>
  </div>
</template>

<script>
import NovaSelect from '@/components/select/NovaSelect';
import NovaOptGroup from '@/components/select/NovaOptGroup';
import NovaOption from '@/components/select/NovaOption';

function getRandomInt(low, high) {
  return Math.floor(low + Math.random() * (high - low));
}

export default {
  name: 'Dynamic',
  components: {
    NovaSelect,
    NovaOptGroup,
    NovaOption
  },
  data() {
    return {
      value: '',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' }
      ]
    };
  },
  methods: {
    handleAddOption() {
      const endInt = getRandomInt(1, 1000);
      this.options.push({
        value: `peach ${endInt}`,
        label: `Peach ${endInt}`
      });

      this.$nextTick(() => {
        const startInt = getRandomInt(1, 1000);
        this.options.unshift({
          value: `peach ${startInt}`,
          label: `Peach ${startInt}`
        });
      });
    },
    handleDeleteOption() {
      this.options.pop();
      this.options.shift();
    }
  }
};
</script>

<style scoped>
.nova-select /deep/ .nova-select-dropdown {
  /*position: static;*/
  display: block !important;
}
</style>
