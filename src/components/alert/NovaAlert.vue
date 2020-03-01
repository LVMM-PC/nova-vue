<template>
  <div
    v-show="visible"
    class="nova-ui-alert"
    :class="classNameList"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <NovaAlertIcon :type="type"></NovaAlertIcon>
    <div
      class="nova-ui-alert-close"
      @click="handleCloseClick"
      v-if="border && closable"
    >
      <div class="nova-ui-alert-close-icon"></div>
    </div>
    <slot></slot>
    <div class="nova-ui-alert-arrow"></div>
  </div>
</template>

<script>
import NovaAlertIcon from '@/components/alert/NovaAlertIcon';

export default {
  name: 'NovaAlert',
  components: { NovaAlertIcon },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    classNameList() {
      let border = this.border;
      let type = this.type;
      let block = this.block;
      let closable = this.closable;
      let visibleArrow = this.visibleArrow;
      let placement = this.placement;
      return [
        `nova-ui-alert-${type}`,
        `nova-ui-alert-placement-${placement}`,
        {
          'nova-ui-alert-border': border,
          'nova-ui-alert-block': block,
          'nova-ui-alert-closable': border && closable,
          'nova-ui-alert-has-arrow': border && visibleArrow
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
    },
    handleCloseClick() {
      this.close();
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
@success-background-color: #f8fff2;

@error-border-color: #ff8888;
@error-background-color: #fff2f2;

@warning-border-color: #ffaa00;
@warning-background-color: #fffaee;

@info-border-color: #88bbee;
@info-background-color: #f0f5fc;

.@{alert} {
  padding: 6px 0 6px 0;
  font-family: @font-family;
  vertical-align: top;
  display: inline-block;
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

  &.@{alert}-success {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent @success-border-color transparent;
      }

      &:after {
        border-color: transparent transparent @success-background-color
          transparent;
      }
    }
  }

  &.@{alert}-error {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent @error-border-color transparent;
      }

      &:after {
        border-color: transparent transparent @error-background-color
          transparent;
      }
    }
  }

  &.@{alert}-warning {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent @warning-border-color transparent;
      }

      &:after {
        border-color: transparent transparent @warning-background-color
          transparent;
      }
    }
  }

  &.@{alert}-info,
  &.@{alert}-help {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent @info-border-color transparent;
      }

      &:after {
        border-color: transparent transparent @info-background-color transparent;
      }
    }
  }

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

  &.@{alert}-success {
    .@{alert}-arrow {
      &:before {
        border-color: @success-border-color transparent transparent transparent;
      }

      &:after {
        border-color: @success-background-color transparent transparent
          transparent;
      }
    }
  }

  &.@{alert}-error {
    .@{alert}-arrow {
      &:before {
        border-color: @error-border-color transparent transparent transparent;
      }

      &:after {
        border-color: @error-background-color transparent transparent
          transparent;
      }
    }
  }

  &.@{alert}-warning {
    .@{alert}-arrow {
      &:before {
        border-color: @warning-border-color transparent transparent transparent;
      }

      &:after {
        border-color: @warning-background-color transparent transparent
          transparent;
      }
    }
  }

  &.@{alert}-info,
  &.@{alert}-help {
    .@{alert}-arrow {
      &:before {
        border-color: @info-border-color transparent transparent transparent;
      }

      &:after {
        border-color: @info-background-color transparent transparent transparent;
      }
    }
  }

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

  &.@{alert}-success {
    .@{alert}-arrow {
      &:before {
        border-color: transparent @success-border-color transparent transparent;
      }

      &:after {
        border-color: transparent @success-background-color transparent
          transparent;
      }
    }
  }

  &.@{alert}-error {
    .@{alert}-arrow {
      &:before {
        border-color: transparent @error-border-color transparent transparent;
      }

      &:after {
        border-color: transparent @error-background-color transparent
          transparent;
      }
    }
  }

  &.@{alert}-warning {
    .@{alert}-arrow {
      &:before {
        border-color: transparent @warning-border-color transparent transparent;
      }

      &:after {
        border-color: transparent @warning-background-color transparent
          transparent;
      }
    }
  }

  &.@{alert}-info,
  &.@{alert}-help {
    .@{alert}-arrow {
      &:before {
        border-color: transparent @info-border-color transparent transparent;
      }

      &:after {
        border-color: transparent @info-background-color transparent transparent;
      }
    }
  }

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

  &.@{alert}-success {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent transparent @success-border-color;
      }

      &:after {
        border-color: transparent transparent transparent
          @success-background-color;
      }
    }
  }

  &.@{alert}-error {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent transparent @error-border-color;
      }

      &:after {
        border-color: transparent transparent transparent
          @error-background-color;
      }
    }
  }

  &.@{alert}-warning {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent transparent @warning-border-color;
      }

      &:after {
        border-color: transparent transparent transparent
          @warning-background-color;
      }
    }
  }

  &.@{alert}-info,
  &.@{alert}-help {
    .@{alert}-arrow {
      &:before {
        border-color: transparent transparent transparent @info-border-color;
      }

      &:after {
        border-color: transparent transparent transparent @info-background-color;
      }
    }
  }

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

  &.@{alert}-success {
    background-color: @success-background-color;
    border: 1px solid @success-border-color;

    .@{alert}-close-icon {
      &:before,
      &:after {
        background-color: #ade392;
      }

      &:hover {
        &:before,
        &:after {
          background-color: @success-border-color;
        }
      }
    }
  }

  &.@{alert}-error {
    background-color: @error-background-color;
    border: 1px solid @error-border-color;

    .@{alert}-close-icon {
      &:before,
      &:after {
        background-color: #feac97;
      }

      &:hover {
        &:before,
        &:after {
          background-color: @error-border-color;
        }
      }
    }
  }

  &.@{alert}-warning {
    background-color: @warning-background-color;
    border: 1px solid @warning-border-color;

    .@{alert}-close-icon {
      &:before,
      &:after {
        background-color: #ffda8f;
      }

      &:hover {
        &:before,
        &:after {
          background-color: @warning-border-color;
        }
      }
    }
  }

  &.@{alert}-info,
  &.@{alert}-help {
    background-color: @info-background-color;
    border: 1px solid @info-border-color;

    .@{alert}-close-icon {
      &:before,
      &:after {
        background-color: #96cff5;
      }

      &:hover {
        &:before,
        &:after {
          background-color: @info-border-color;
        }
      }
    }
  }
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
