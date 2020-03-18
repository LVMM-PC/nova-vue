<template>
  <div>
    <NovaSelect ref="select" v-model="value" :append-to-body="true">
      <NovaOptGroup v-for="i in 5" :key="i" :label="i.toString()">
        <NovaOption
          v-for="(option, optionIndex) in options"
          :key="optionIndex"
          :value="`${i}-${option.value}`"
          :label="`${i}-${option.label}`"
          :disabled="option.disabled"
        >
        </NovaOption>
      </NovaOptGroup>
    </NovaSelect>
    <NovaSelect v-model="list" :append-to-body="true" multiple>
      <NovaOptGroup v-for="i in 5" :key="i" :label="i.toString()">
        <NovaOption
          v-for="option in options"
          :key="option.value"
          :value="`${i}-${option.value}`"
          :label="`${i}-${option.label}`"
          :disabled="option.disabled"
        >
        </NovaOption>
      </NovaOptGroup>
    </NovaSelect>
    <button @click="handleAddOption">Add option</button>
    <button @click="handleDeleteOption">Delete option</button>
    <button @click="handleTest">TEST</button>
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
      list: [],
      options: [
        { value: 'apple', label: 'Apple', disabled: false },
        { value: 'banana', label: 'Banana', disabled: false },
        { value: 'cherry', label: 'Cherry', disabled: false }
      ]
    };
  },
  methods: {
    handleAddOption() {
      const endInt = getRandomInt(1, 1000);
      this.options.push({
        value: `peach ${endInt}`,
        label: `Peach ${endInt}`,
        disabled: false
      });

      this.$nextTick(() => {
        const startInt = getRandomInt(1, 1000);
        this.options.unshift({
          value: `peach ${startInt}`,
          label: `Peach ${startInt}`,
          disabled: false
        });
      });
    },
    handleDeleteOption() {
      this.options.pop();
      this.options.shift();
    },
    handleTest() {
      const options = this.$refs['select'].getOptions();
      console.log(options);
    }
  }
};
</script>
