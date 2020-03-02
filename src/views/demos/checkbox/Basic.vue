<script lang="jsx">
import NovaCheckboxGroup from '@/components/checkbox/NovaCheckboxGroup';
import NovaCheckbox from '@/components/checkbox/NovaCheckbox';

function onChange(value) {
  console.log(value);
}

export default {
  name: 'Basic',
  data() {
    return {
      value: []
    };
  },
  methods: {
    onUpdate(value) {
      console.log(value);
      this.value = value;
    }
  },
  render() {
    let items = ['Apple', 'Pear', 'Orange'].map((item) => {
      return <NovaCheckbox value={item.toLowerCase()}>{item}</NovaCheckbox>;
    });

    return (
      <NovaCheckboxGroup value={this.value} onUpdate={this.onUpdate} onChange={onChange}>
        {items}
      </NovaCheckboxGroup>
    );
  }
};
</script>

<style scoped></style>
