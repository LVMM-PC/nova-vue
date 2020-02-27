<template>
  <div class="post">
    <Normal></Normal>
    <Group></Group>
  </div>
</template>

<script>
import Normal from '@/views/demos/autocomplete/Normal';
import Group from './autocomplete/Group';

export default {
  name: 'AutocompleteDemo',
  components: { Group, Normal }
};
</script>
