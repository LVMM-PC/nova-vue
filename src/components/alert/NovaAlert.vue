<template>
  <transition name="nova-alert-slide-up" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="nova-alert"
      :class="classNameList"
      v-bind="$attrs"
      v-on="$listeners"
      ref="alert"
    >
      <Icon :type="type"></Icon>
      <div
        class="nova-alert-close"
        @click="handleCloseClick"
        v-if="border && closable"
      >
        <div class="nova-alert-close-icon"></div>
      </div>
      <slot></slot>
      <div v-if="visibleArrow" class="nova-alert-arrow"></div>
    </div>
  </transition>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'NovaAlert',
  components: { Icon },
  data() {
    return {
      visible: true,
      closing: false
    };
  },
  computed: {
    classNameList() {
      let border = this.border;
      let type = this.type || 'normal';
      let block = this.block;
      let closable = this.closable;
      let visibleArrow = this.visibleArrow;
      let placement = this.placement;
      let closing = this.closing;
      return [
        `nova-alert-${type}`,
        `nova-alert-placement-${placement}`,
        {
          'nova-alert-border': border,
          'nova-alert-block': block,
          'nova-alert-closing': closing,
          'nova-alert-closable': border && closable,
          'nova-alert-has-arrow': border && visibleArrow
        }
      ];
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    visibleArrow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return (
          [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end'
          ].indexOf(value) !== -1
        );
      }
    }
  },
  methods: {
    open() {
      this.visible = true;
      this.$emit('open');
    },
    close() {
      this.visible = false;
      this.$emit('close');

      let $alert = this.$refs['alert'];

      $alert.style.height = `${$alert.offsetHeight}px`;
      // Magic code
      // We can only set twice that the height can right
      $alert.style.height = `${$alert.offsetHeight}px`;

      this.closing = true;
    },
    handleCloseClick() {
      this.close();
    },
    handleAfterLeave() {
      this.closing = false;
      let $alert = this.$refs['alert'];
      $alert.style.height = null;
      this.$emit('afterClose');
    }
  }
};
</script>
