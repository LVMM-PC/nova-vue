<template>
  <div
    v-if="NovaSelect.dropdownLoaded"
    class="nova-select-option"
    :class="optionClasses"
    v-bind="$attrs"
    @click="handleClick"
    v-on="$listeners"
  >
    <slot>
      {{ label || value }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'NovaOption',
  inject: ['NovaSelect'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  computed: {
    optionClasses() {
      return {
        'is-selected': this.isSelected(),
        'is-disabled': this.disabled
      };
    }
  },
  created() {
    this.NovaSelect.addMultipleOption({
      label: this.label,
      value: this.value
    });
  },
  methods: {
    handleClick(...args) {
      if (this.disabled) {
        return;
      }

      this.$emit('click', ...args);
      this.NovaSelect.setSelected(this.value);

      if (!this.NovaSelect.multiple) {
        this.NovaSelect.close();
      }
    },
    isSelected() {
      let NovaSelect = this.NovaSelect;
      let selected = NovaSelect.getValue();
      let isSelected = false;
      let value = this.value;
      if (NovaSelect.multiple) {
        let found = selected.find(v => {
          return v === value;
        });
        if (found) {
          isSelected = true;
        }
      } else {
        if (selected === value) {
          isSelected = true;
        }
      }
      return isSelected;
    }
  }
};
</script>
