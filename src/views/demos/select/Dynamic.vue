<template>
  <div>
    <div class="box">
      <NovaSelect ref="select" v-model="valueGroup" :append-to-body="true">
        <NovaOptGroup v-for="i in n" :key="i" :label="i.toString()">
          <NovaOption
            v-for="(option, optionIndex) in options"
            :key="optionIndex"
            :disabled="option.disabled"
            :label="`${i}-${option.label}`"
            :value="`${i}-${option.value}`"
          >
          </NovaOption>
        </NovaOptGroup>
      </NovaSelect>
      <NovaSelect v-model="listGroup" :append-to-body="true" multiple>
        <NovaOptGroup v-for="i in n" :key="i" :label="i.toString()">
          <NovaOption
            v-for="option in options"
            :key="option.value"
            :disabled="option.disabled"
            :label="`${i}-${option.label}`"
            :value="`${i}-${option.value}`"
          >
          </NovaOption>
        </NovaOptGroup>
      </NovaSelect>
    </div>
    <div class="box">
      <NovaSelect ref="select" v-model="value" :append-to-body="true">
        <NovaOption
          v-for="(option, optionIndex) in options"
          :key="optionIndex"
          :disabled="option.disabled"
          :label="`${option.label}`"
          :value="`${option.value}`"
        >
        </NovaOption>
      </NovaSelect>
      <NovaSelect v-model="list" :append-to-body="true" multiple>
        <NovaOption
          v-for="option in options"
          :key="option.value"
          :disabled="option.disabled"
          :label="`${option.label}`"
          :value="`${option.value}`"
        >
        </NovaOption>
      </NovaSelect>
    </div>
    <div class="box">
      <button @click="handleAddOption">Add option</button>
      <button @click="handleDeleteOption">Delete option</button>
      <button @click="handleTest">TEST</button>
    </div>
  </div>
</template>

<script>
import NovaSelect from '@/components/select/NovaSelect';
import NovaOptGroup from '@/components/select/NovaOptGroup';
import NovaOption from '@/components/select/NovaOption';
import Utils from '@/utils/utils';

export default {
  name: 'Dynamic',
  components: {
    NovaSelect,
    NovaOptGroup,
    NovaOption
  },
  data() {
    return {
      n: 5,
      valueGroup: '',
      listGroup: [],
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
      const endInt = Utils.getRandomInt(1, 1000);
      this.options.push({
        value: `peach ${endInt}`,
        label: `Peach ${endInt}`,
        disabled: false
      });

      this.$nextTick(() => {
        const startInt = Utils.getRandomInt(1, 1000);
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
      this.n = Utils.getRandomInt(2, 10);
    }
  }
};
</script>
