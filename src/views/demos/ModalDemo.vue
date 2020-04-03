<template>
  <section>
    <div class="box">
      <NovaButton @click="handleOpen">Open</NovaButton>
      <NovaModal
        v-model="visible"
        title="标题文本"
        :closable="closable"
        :mask-closable="maskClosable"
        :mask="mask"
        :confirm-loading="confirmLoading"
        ok-text="确定"
        ok-type="default"
        :ok-button-props="okButtonProps"
        cancel-text="取消"
        cancel-type="link"
        :cancel-button-props="cancelButtonProps"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div>
          {{ modalText }}
        </div>
      </NovaModal>
    </div>
    <div class="blank"></div>
    <div class="box">
      <dl>
        <dt>Closable:</dt>
        <dd>
          {{ closable }}
          <NovaButton @click="toggleClosable">Toggle closable</NovaButton>
        </dd>
      </dl>
      <dl>
        <dt>Mask closable:</dt>
        <dd>
          {{ maskClosable }}
          <NovaButton @click="toggleMaskClosable"
            >Toggle maskClosable
          </NovaButton>
        </dd>
      </dl>
      <dl>
        <dt>Mask:</dt>
        <dd>
          {{ mask }}
          <NovaButton @click="toggleMask">Toggle mask</NovaButton>
        </dd>
      </dl>
    </div>
    <div class="blank"></div>
    <div class="box">
      <NovaButton @click="handleFooterOpen">Footer</NovaButton>
      <NovaModal v-model="footerVisible" @cancel="handleFooterCancel">
        <template slot="footer">{{ null }}</template>
        提示文本
      </NovaModal>
    </div>
    <div class="blank"></div>
    <div class="box">
      <NovaButton @click="handleBigHeightOpen">Open big height</NovaButton>
      <NovaModal
        v-model="bigHeightVisible"
        title="标题文本"
        wrap-class="big-height-modal"
        @cancel="handleBigHeightCancel"
      >
        <div class="big-height-modal-container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fuga
          ipsam nesciunt porro praesentium sed tenetur. Beatae deserunt,
          laboriosam molestias nam nulla numquam qui? Ad, alias, beatae. Aut,
          incidunt sunt!
        </div>
      </NovaModal>
    </div>
    <div class="blank"></div>
    <div class="box">
      <NovaButton @click="handleBigWidthOpen">Open big width</NovaButton>
      <NovaModal
        v-model="bigWidthVisible"
        title="标题文本"
        :width="1000"
        @cancel="handleBigWidthCancel"
      >
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

const modalDefaultText = '模态框文本内容。';

export default {
  name: 'ModalDemo',
  components: { NovaButton, NovaModal },
  data() {
    return {
      modalText: modalDefaultText,
      closable: true,
      mask: true,
      maskClosable: true,
      visible: false,
      confirmLoading: false,
      okButtonProps: {
        props: {
          htmlType: 'submit'
        }
      },
      cancelButtonProps: {
        attrs: {
          href: 'http://nova-vue.em2046.com/',
          target: '_blank'
        }
      },
      bigHeightVisible: false,
      bigWidthVisible: false,
      footerVisible: false
    };
  },
  methods: {
    toggleClosable() {
      this.closable = !this.closable;
    },
    toggleMaskClosable() {
      this.maskClosable = !this.maskClosable;
    },
    toggleMask() {
      this.mask = !this.mask;
    },
    handleOpen() {
      this.modalText = modalDefaultText;
      this.visible = true;
    },
    handleFooterOpen() {
      this.footerVisible = true;
    },
    handleFooterCancel() {
      this.footerVisible = false;
    },
    handleOk(e) {
      console.log(e);
      this.modalText = '模态框将在 2 秒后关闭。';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log(e);
      this.visible = false;
    },
    handleBigHeightOpen() {
      this.bigHeightVisible = true;
    },
    handleBigHeightCancel() {
      this.bigHeightVisible = false;
    },
    handleBigWidthOpen() {
      this.bigWidthVisible = true;
    },
    handleBigWidthCancel() {
      this.bigWidthVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.big-height-modal-container {
  height: 1000px;
}

.box > .nova-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.blank {
  height: 200px;
}

.box > dl {
  display: flex;

  dt {
    width: 100px;
    padding: 5px;
  }

  dd {
    margin: 0;
    display: flex;
    align-items: center;

    .nova-button {
      margin-left: 10px;
    }
  }
}
</style>
