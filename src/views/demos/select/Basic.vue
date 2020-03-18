<template>
  <section>
    <NovaSelect v-model="selectedItem">
      <NovaOption label="Beijing" value="beijing"></NovaOption>
      <NovaOption label="Shanghai" value="shanghai"></NovaOption>
      <NovaOption disabled label="Disabled" value="disabled"></NovaOption>
    </NovaSelect>
    <NovaSelect disabled value="shanghai">
      <NovaOption label="Shanghai" value="shanghai"></NovaOption>
    </NovaSelect>
    <NovaSelect disabled value="shanghai">
      <NovaOptGroup>
        <NovaOption label="Shanghai" value="shanghai"></NovaOption>
      </NovaOptGroup>
    </NovaSelect>
    <select>
      <option disabled>1</option>
      <option disabled="">2</option>
      <option disabled="disabled">3</option>
      <option disabled="true">4</option>
      <option disabled="false">5</option>
    </select>
  </section>
</template>

<script>
import NovaSelect from '@/components/select/NovaSelect';
import NovaOptGroup from '@/components/select/NovaOptGroup';
import NovaOption from '@/components/select/NovaOption';

export default {
  components: {
    NovaSelect,
    NovaOptGroup,
    NovaOption
  },
  data() {
    return {
      selectedItem: 'shanghai'
    };
  }
};
</script>
