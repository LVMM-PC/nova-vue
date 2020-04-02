import {
  computed,
  createElement,
  reactive,
  watchEffect
} from '@vue/composition-api';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaButton from '@/components/button/NovaButton';
import NovaIconClose from '@/icons/NovaIconClose';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaModal',
  model: {
    prop: 'visible',
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-modal`
    },
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: 400
    },
    wrapClass: {
      type: String,
      default: null
    }
  },
  setup: (props, context) => {
    const { attrs, listeners, slots, emit, refs } = context;

    const state = reactive({
      loaded: false
    });

    watchEffect(() => {
      if (props.visible) {
        state.loaded = true;
      }
    });

    function close() {
      emit('update', false);
    }

    function handleClose() {
      close();
    }

    function handleCancel() {
      close();
    }

    function handleOk() {
      close();
    }

    const modalClassList = computed(() => {
      return [props.prefixedClass];
    });

    const modalStyle = reactive({
      width: typeof props.width === 'string' ? props.width : `${props.width}px`
    });

    function handleWrapClick(e) {
      const target = e.target;

      const isClickInModal = Utils.isParentsOrSelf(target, refs['modal']);
      if (!isClickInModal) {
        close();
      }
    }

    return () => {
      if (!state.loaded) {
        return null;
      }

      const modalProps = {
        ref: 'modal',
        on: listeners,
        attrs
      };

      let children;
      if (slots && slots.default) {
        const slotDefault = slots.default();
        children = slotDefault;
      }

      const modalNode = (
        <div class={modalClassList.value} style={modalStyle} {...modalProps}>
          <div class={`${props.prefixedClass}-content`}>
            <div
              class={`${props.prefixedClass}-close`}
              tabIndex="0"
              onClick={handleClose}
            >
              <NovaIconClose />
            </div>
            <div class={`${props.prefixedClass}-header`}>
              <div class={`${props.prefixedClass}-title`}>{props.title}</div>
            </div>
            <div class={`${props.prefixedClass}-body`}>{children}</div>
            <div class={`${props.prefixedClass}-footer`}>
              <NovaButton onClick={handleCancel}>Cancel</NovaButton>
              <NovaButton onClick={handleOk} type="secondary">
                Ok
              </NovaButton>
            </div>
          </div>
        </div>
      );

      const rootClassList = computed(() => {
        return [
          `${props.prefixedClass}-root`,
          {
            [`${props.prefixedClass}-root-hidden`]: !props.visible
          }
        ];
      });

      const wrapClassList = computed(() => {
        return [`${props.prefixedClass}-wrap`, props.wrapClass];
      });

      const rootNode = (
        <div class={rootClassList.value}>
          <div class={`${props.prefixedClass}-mask`}></div>
          <div class={wrapClassList.value} onClick={handleWrapClick}>
            {modalNode}
          </div>
        </div>
      );

      if (props.appendToBody) {
        return (
          <ClientOnly>
            <MountingPortal
              mountTo="body"
              append={true}
              disabled={!props.appendToBody}
            >
              {rootNode}
            </MountingPortal>
          </ClientOnly>
        );
      }

      return rootNode;
    };
  }
};
