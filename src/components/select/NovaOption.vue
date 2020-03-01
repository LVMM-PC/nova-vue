<template>
  <div
    class="nova-ui-select-option"
    :class="optionClasses"
    @click="handleClick"
    v-bind="$attrs"
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
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number],
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
  mounted() {
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
      this.NovaSelect.setValue(this.value);
      this.NovaSelect.close();
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

<style lang="less">
.nova-ui-select-option {
  cursor: pointer;
  padding: 5px 10px;

  &:hover:not(.is-disabled) {
    color: #ee3388;
    background-color: #fef2f9;
  }

  &.is-selected {
    color: #ee3388;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
