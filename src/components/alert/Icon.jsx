export default {
  name: 'Icon',
  props: {
    type: String
  },
  render() {
    let { type, $listeners, $attrs } = this;
    let classList = ['nova-alert-icon', `nova-alert-icon-${type}`];

    return <div class={classList} props={$attrs} on={$listeners}></div>;
  }
};
