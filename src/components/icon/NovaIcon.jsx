import Inventory from '@/utils/inventory';

function generate(h, node, data = {}) {
  return h(
    node.tag,
    {
      ...data,
      attrs: {
        ...node.attrs,
        ...data.attrs
      }
    },
    node.children?.map(child => {
      return generate(h, child);
    })
  );
}

export default {
  name: 'NovaIcon',
  functional: true,
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-icon`
    },
    src: {
      type: Object,
      default: null
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const {
      data: { attrs, ...restData } = {},
      props = {},
      listeners
    } = context;

    const { src, spin, prefixedClass, ...restProps } = {
      ...attrs,
      ...props
    };

    const iconClassList = [
      prefixedClass,
      restData.class,
      {
        [`${prefixedClass}-spin`]: spin
      }
    ];

    const iconProps = {
      ...restData,
      class: iconClassList,
      attrs: restProps,
      on: listeners
    };
    return (
      <span {...iconProps}>
        {generate(h, src, {
          attrs: {
            fill: 'currentColor',
            width: '1em',
            height: '1em',
            ...restProps
          }
        })}
      </span>
    );
  }
};
