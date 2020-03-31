import { camelCaseToParamCase } from '../../utils';

export default function iconVue(iconName, componentName, iconClassName) {
  const iconNameCamelCase = camelCaseToParamCase(iconName);

  return `// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY
 
import ${iconName} from '../../icons/entities/${iconNameCamelCase}.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: '${componentName}',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['${iconClassName}', data.class],
      props: {
        ...data.props,
        ...props,
        src: ${iconName}
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
`;
}
