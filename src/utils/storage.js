const localeDescription = 'nova-locale';

export default class Storage {
  static localeSymbol = Symbol?.(localeDescription) ?? localeDescription;

  static prefix = 'nova';

  static placement = [
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
  ];
}
