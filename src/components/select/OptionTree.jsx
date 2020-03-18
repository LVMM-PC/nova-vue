import Storage from '@/utils/storage';

export default {
  name: 'OptionTree',
  inject: ['NovaSelect'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-select`
    }
  },
  methods: {
    getOptionDomOfIndex(index) {
      return this.$refs['optionTree'].querySelectorAll(
        `.${this.prefixedClass}-option`
      )[index];
    }
  },
  render() {
    const { prefixedClass } = this;

    const renderOption = instance => {
      const {
        $attrs,
        $listeners,
        $slots,
        classList,
        handleClick,
        handleMouseenter,
        label,
        value
      } = instance;
      const children = $slots.default || label || value?.toString();

      const optionProps = {
        class: classList,
        attrs: {
          ...$attrs
        },
        on: {
          ...$listeners,
          click: handleClick,
          mouseenter: handleMouseenter
        }
      };
      return <div {...optionProps}>{children}</div>;
    };

    const renderOptGroup = (node, instance) => {
      const {
        $attrs,
        $listeners,
        $slots,
        label,
        NovaSelect,
        prefixedClass
      } = instance;

      const slotLabel = $slots.label || label;

      const optionGroupProps = {
        class: `${prefixedClass}-option-group`,
        attrs: {
          ...$attrs
        },
        on: {
          ...$listeners
        }
      };

      let labelNode;
      if (NovaSelect.dropdownLoaded) {
        labelNode = (
          <div class={`${prefixedClass}-option-group-label`}>{slotLabel}</div>
        );
      }

      let optionsNode = renderTree(node.children);

      return (
        <div {...optionGroupProps}>
          {labelNode}
          <div class={`${prefixedClass}-option-group-content`}>
            {optionsNode}
          </div>
        </div>
      );
    };

    const renderTree = tree => {
      if (!tree) {
        return;
      }

      return tree.map(node => {
        const instance = node.VNode.componentInstance;
        if (!instance) {
          return;
        }

        if (node.isOptGroup) {
          return renderOptGroup(node, instance);
        } else if (node.isOption) {
          return renderOption(instance);
        }
      });
    };

    const optionTree = this.NovaSelect.getOptionTree();
    const treeNode = renderTree(optionTree);

    return (
      <div ref="optionTree" class={`${prefixedClass}-option-tree`}>
        {treeNode}
      </div>
    );
  }
};
