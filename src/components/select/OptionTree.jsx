import Storage from '@/utils/storage';
import Props from '@/utils/props';
import NovaAlert from '@/components/alert/NovaAlert.jsx';

export default {
  name: 'SelectOptionTree',
  inject: ['NovaSelect'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-select`
    },
    novaLocale: {
      type: Object,
      default: null
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

      return tree.map(treeNode => {
        const instance = Props.getVNodeInstance(treeNode.vNode);
        if (!instance) {
          return;
        }

        if (treeNode.isOptGroup) {
          return renderOptGroup(treeNode, instance);
        } else if (treeNode.isOption) {
          return renderOption(instance);
        }
      });
    };

    let treeNode;
    const optionTree = this.NovaSelect.getOptionVNodeTree();
    if (optionTree?.length) {
      treeNode = renderTree(optionTree);
    } else {
      treeNode = (
        <div class={`${prefixedClass}-option-empty`}>
          <NovaAlert type="info">{this.novaLocale.empty.description}</NovaAlert>
        </div>
      );
    }

    return (
      <div ref="optionTree" class={`${prefixedClass}-option-tree`}>
        {treeNode}
      </div>
    );
  }
};
