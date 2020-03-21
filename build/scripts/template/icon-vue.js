import { camelCaseToParamCase } from '../../utils';

export default function iconVue(iconName, componentName) {
  const iconNameCamelCase = camelCaseToParamCase(iconName);

  return `import ${iconName} from '../../icons/entities/${iconNameCamelCase}.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: '${componentName}',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
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
