<template>
  <div class="post">
    <Normal></Normal>
    <Group></Group>
  </div>
</template>

<script>
import Normal from '@/views/demos/auto-complete/Normal';
import Group from './auto-complete/Group';

export default {
  name: 'AutoCompleteDemo',
  components: { Group, Normal }
};
</script>
