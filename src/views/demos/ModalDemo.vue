<template>
  <div>
    <NovaButton @click="handleOpen">Open</NovaButton>
    <NovaModal v-model="visible" width="50%">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fuga ipsam
        nesciunt porro praesentium sed tenetur. Beatae deserunt, laboriosam
        molestias nam nulla numquam qui? Ad, alias, beatae. Aut, incidunt sunt!
      </div>
    </NovaModal>
  </div>
</template>

<script>
import NovaModal from '@/components/modal/NovaModal';
import NovaButton from '@/components/button/NovaButton';

export default {
  name: 'ModalDemo',
  components: { NovaButton, NovaModal },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    }
  }
};
</script>

<style scoped></style>
