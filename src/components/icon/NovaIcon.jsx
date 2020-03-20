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
    src: {
      type: Object,
      default: null
    }
  },
  render(h, context) {
    const {
      data: { attrs, ...restData } = {},
      props = {},
      listeners
    } = context;
    const { src, ...restProps } = {
      ...attrs,
      ...props
    };
    const iconProps = {
      ...restData,
      class: `nova-icon`,
      attrs: restProps,
      on: listeners
    };
    return (
      <div {...iconProps}>
        {generate(h, src, {
          attrs: {
            fill: 'currentColor',
            width: '1em',
            height: '1em',
            ...restProps
          }
        })}
      </div>
    );
  }
};
