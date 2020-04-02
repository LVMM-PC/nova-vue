<template>
  <section>
    <div class="box">
      <NovaButton @click="handleOpen">Open</NovaButton>
      <NovaModal v-model="visible" title="标题文本">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fuga
          ipsam nesciunt porro praesentium sed tenetur. Beatae deserunt,
          laboriosam molestias nam nulla numquam qui? Ad, alias, beatae. Aut,
          incidunt sunt!
        </div>
      </NovaModal>
    </div>
    <div class="box">
      <NovaButton @click="handleOpenBigHeight">Open big height</NovaButton>
      <NovaModal
        v-model="bigHeightVisible"
        title="标题文本"
        wrap-class="big-height-modal"
      >
        <div class="big-height-modal-container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fuga
          ipsam nesciunt porro praesentium sed tenetur. Beatae deserunt,
          laboriosam molestias nam nulla numquam qui? Ad, alias, beatae. Aut,
          incidunt sunt!
        </div>
      </NovaModal>
    </div>
    <div class="box">
      <NovaButton @click="handleOpenBigWidth">Open big width</NovaButton>
      <NovaModal v-model="bigWidthVisible" title="标题文本" :width="1000">
        <div class="big-width-modal-container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fuga
          ipsam nesciunt porro praesentium sed tenetur. Beatae deserunt,
          laboriosam molestias nam nulla numquam qui? Ad, alias, beatae. Aut,
          incidunt sunt!
        </div>
      </NovaModal>
    </div>
  </section>
</template>

<script>
import NovaModal from '@/components/modal/NovaModal';
import NovaButton from '@/components/button/NovaButton';

export default {
  name: 'ModalDemo',
  components: { NovaButton, NovaModal },
  data() {
    return {
      visible: false,
      bigHeightVisible: false,
      bigWidthVisible: false
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleOpenBigHeight() {
      this.bigHeightVisible = true;
    },
    handleOpenBigWidth() {
      this.bigWidthVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.big-height-modal-container {
  height: 1000px;
}
</style>
