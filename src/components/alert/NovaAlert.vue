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
      <div class="nova-alert-arrow"></div>
    </div>
  </transition>
</template>

<script>
import Icon from './Icon';

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

<style lang="less">
@import '../../styles/var';

@alert: @{prefixed}-alert;

@default-border-color: #dddddd;
@default-background-color: #f6f6f6;

@success-border-color: #66cc33;
@success-close-color: #ade392;
@success-background-color: #f8fff2;

@error-border-color: #ff8888;
@error-close-color: #feac97;
@error-background-color: #fff2f2;

@warning-border-color: #ffaa00;
@warning-close-color: #ffda8f;
@warning-background-color: #fffaee;

@info-border-color: #88bbee;
@info-close-color: #96cff5;
@info-background-color: #f0f5fc;

.@{alert} {
  padding: 6px 0 6px 0;
  font-family: @font-family;
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
  font-size: 12px;
  color: #333333;
  line-height: 18px;

  &.@{alert}-success,
  &.@{alert}-error,
  &.@{alert}-warning,
  &.@{alert}-info,
  &.@{alert}-help {
    padding: 6px 0 6px 20px;

    .@{alert}-icon {
      margin: 2px 5px 0 -19px;
    }
  }

  &.@{alert}-weak {
    color: #999;
  }
}

.@{alert}-has-arrow {
  position: relative;

  .@{alert}-arrow {
    display: block;
  }
}

.@{alert}-arrow {
  display: none;

  &:before,
  &:after {
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
    display: block;
    position: absolute;
  }
}

.@{alert}-placement-top-start,
.@{alert}-placement-top,
.@{alert}-placement-top-end {
  .@{alert}-arrow {
    position: absolute;
    transform: translate(-50%, 0);

    &:before,
    &:after {
      left: 50%;
      transform: translate(-50%, 0);
    }

    &:before {
      top: -7px;
      border-width: 0 7px 7px 7px;
      border-color: transparent transparent @default-border-color transparent;
    }

    &:after {
      top: -5.5px;
      border-width: 0 5.5px 5.5px 5.5px;
      border-color: transparent transparent @default-background-color
        transparent;
    }
  }

  .arrow(@type; @border-color; @background-color) {
    &.@{alert}-@{type} {
      .@{alert}-arrow {
        &:before {
          border-color: transparent transparent @border-color transparent;
        }

        &:after {
          border-color: transparent transparent @background-color transparent;
        }
      }
    }
  }

  .arrow(success; @success-border-color; @success-background-color);
  .arrow(error; @error-border-color; @error-background-color);
  .arrow(warning; @warning-border-color; @warning-background-color);
  .arrow(info; @info-border-color; @info-background-color);
  .arrow(help; @info-border-color; @info-background-color);

  .@{alert}-arrow {
    top: 0;
  }
}

.@{alert}-placement-bottom-start,
.@{alert}-placement-bottom,
.@{alert}-placement-bottom-end {
  .@{alert}-arrow {
    position: absolute;
    transform: translate(-50%, 0);

    &:before,
    &:after {
      left: 50%;
      transform: translate(-50%, 0);
    }

    &:before {
      top: 0;
      border-width: 7px 7px 0 7px;
      border-color: @default-border-color transparent transparent transparent;
    }

    &:after {
      top: 0;
      border-width: 5.5px 5.5px 0 5.5px;
      border-color: @default-background-color transparent transparent
        transparent;
    }
  }

  .arrow(@type; @border-color; @background-color) {
    &.@{alert}-@{type} {
      .@{alert}-arrow {
        &:before {
          border-color: @border-color transparent transparent transparent;
        }

        &:after {
          border-color: @background-color transparent transparent transparent;
        }
      }
    }
  }

  .arrow(success; @success-border-color; @success-background-color);
  .arrow(error; @error-border-color; @error-background-color);
  .arrow(warning; @warning-border-color; @warning-background-color);
  .arrow(info; @info-border-color; @info-background-color);
  .arrow(help; @info-border-color; @info-background-color);

  .@{alert}-arrow {
    bottom: 0;
  }
}

.@{alert}-placement-left-start,
.@{alert}-placement-left,
.@{alert}-placement-left-end {
  .@{alert}-arrow {
    position: absolute;
    transform: translate(0, -50%);

    &:before,
    &:after {
      top: 50%;
      transform: translate(0, -50%);
    }

    &:before {
      left: -7px;
      border-width: 7px 7px 7px 0;
      border-color: transparent @default-border-color transparent transparent;
    }

    &:after {
      left: -5.5px;
      border-width: 5.5px 5.5px 5.5px 0;
      border-color: transparent @default-background-color transparent
        transparent;
    }
  }

  .arrow(@type; @border-color; @background-color) {
    &.@{alert}-@{type} {
      .@{alert}-arrow {
        &:before {
          border-color: transparent @border-color transparent transparent;
        }

        &:after {
          border-color: transparent @background-color transparent transparent;
        }
      }
    }
  }

  .arrow(success; @success-border-color; @success-background-color);
  .arrow(error; @error-border-color; @error-background-color);
  .arrow(warning; @warning-border-color; @warning-background-color);
  .arrow(info; @info-border-color; @info-background-color);
  .arrow(help; @info-border-color; @info-background-color);

  .@{alert}-arrow {
    left: 0;
  }
}

.@{alert}-placement-right-start,
.@{alert}-placement-right,
.@{alert}-placement-right-end {
  .@{alert}-arrow {
    position: absolute;
    transform: translate(0, -50%);

    &:before,
    &:after {
      top: 50%;
      transform: translate(0, -50%);
    }

    &:before {
      left: 0;
      border-width: 7px 0 7px 7px;
      border-color: transparent transparent transparent @default-border-color;
    }

    &:after {
      left: 0;
      border-width: 5.5px 0 5.5px 5.5px;
      border-color: transparent transparent transparent
        @default-background-color;
    }
  }

  .arrow(@type; @border-color; @background-color) {
    &.@{alert}-@{type} {
      .@{alert}-arrow {
        &:before {
          border-color: transparent transparent transparent @border-color;
        }

        &:after {
          border-color: transparent transparent transparent @background-color;
        }
      }
    }
  }

  .arrow(success; @success-border-color; @success-background-color);
  .arrow(error; @error-border-color; @error-background-color);
  .arrow(warning; @warning-border-color; @warning-background-color);
  .arrow(info; @info-border-color; @info-background-color);
  .arrow(help; @info-border-color; @info-background-color);

  .@{alert}-arrow {
    left: 100%;
  }
}

.@{alert}-placement-top-start,
.@{alert}-placement-bottom-start {
  .@{alert}-arrow {
    margin-left: 14px;
    left: 0;
  }
}

.@{alert}-placement-top,
.@{alert}-placement-bottom {
  .@{alert}-arrow {
    left: 50%;
  }
}

.@{alert}-placement-top-end,
.@{alert}-placement-bottom-end {
  .@{alert}-arrow {
    margin-left: -14px;
    left: 100%;
  }
}

.@{alert}-placement-left-start,
.@{alert}-placement-right-start {
  .@{alert}-arrow {
    margin-top: 14px;
    top: 0;
  }
}

.@{alert}-placement-left,
.@{alert}-placement-right {
  .@{alert}-arrow {
    top: 50%;
  }
}

.@{alert}-placement-left-end,
.@{alert}-placement-right-end {
  .@{alert}-arrow {
    margin-top: -14px;
    top: 100%;
  }
}

.@{alert}-block {
  display: block;
}

.@{alert}-closing {
  height: 0 !important;
}

.@{alert}-border {
  background-color: @default-background-color;
  border: 1px solid @default-border-color;
  padding: 5px 11px 5px 11px;

  &.@{alert}-success,
  &.@{alert}-error,
  &.@{alert}-warning,
  &.@{alert}-info,
  &.@{alert}-help {
    padding: 5px 6px 5px 26px;

    &.@{alert}-closable {
      padding: 5px 28px 5px 26px;
    }

    .@{alert}-icon {
      margin: 2px 5px 0 -19px;
    }
  }

  .border-and-close (@type; @background-color; @border-color; @close-color) {
    &.@{alert}-@{type} {
      background-color: @background-color;
      border: 1px solid @border-color;

      .@{alert}-close-icon {
        &:before,
        &:after {
          background-color: @close-color;
        }

        &:hover {
          &:before,
          &:after {
            background-color: @border-color;
          }
        }
      }
    }
  }

  .border-and-close
    (
      success; @success-background-color; @success-border-color;
        @success-close-color
    );
  .border-and-close
    (error; @error-background-color; @error-border-color; @error-close-color);
  .border-and-close
    (
      warning; @warning-background-color; @warning-border-color;
        @warning-close-color
    );
  .border-and-close
    (info; @info-background-color; @info-border-color; @info-close-color);
  .border-and-close
    (help; @info-background-color; @info-border-color; @info-close-color);
}

.@{alert}-close {
  width: 14px;
  height: 14px;
  float: right;
  right: 0;
  top: 0;
  margin: 2px -21px 0 0;
  display: block;
  cursor: pointer;

  &:after {
    margin-top: -17px;
    margin-left: -3px;
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
}

.@{alert}-close-icon {
  transform: rotate(45deg);
  width: 14px;
  height: 14px;

  &:after,
  &:before {
    display: block;
    content: '';
    background-color: #ccc;
  }

  &:after {
    width: 14px;
    height: 2px;
    margin-top: -8px;
  }

  &:before {
    width: 2px;
    height: 14px;
    margin-left: 6px;
  }
}
</style>
