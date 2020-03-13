<template>
  <div class="matrix">
    <div class="top">
      <NovaAlert :type="type" border placement="top-start" visible-arrow>
        <span>上左</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="top" visible-arrow>
        <span>上</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="top-end" visible-arrow>
        <span>上右</span>
      </NovaAlert>
    </div>
    <div class="left">
      <NovaAlert :type="type" border placement="left-start" visible-arrow>
        <span>左上</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="left" visible-arrow>
        <span>左</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="left-end" visible-arrow>
        <span>左下</span>
      </NovaAlert>
    </div>
    <div class="right">
      <NovaAlert :type="type" border placement="right-start" visible-arrow>
        <span>右上</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="right" visible-arrow>
        <span>右</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="right-end" visible-arrow>
        <span>右下</span>
      </NovaAlert>
    </div>
    <div class="bottom">
      <NovaAlert :type="type" border placement="bottom-start" visible-arrow>
        <span>下左</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="bottom" visible-arrow>
        <span>下</span>
      </NovaAlert>
      <NovaAlert :type="type" border placement="bottom-end" visible-arrow>
        <span>下右</span>
      </NovaAlert>
    </div>
  </div>
</template>

<script>
import NovaAlert from '@/components/alert/NovaAlert';

export default {
  name: 'Matrix',
  components: { NovaAlert },
  props: {
    type: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="less" scoped>
.nova-alert {
  margin-bottom: 10px;
  margin-right: 10px;
}

.matrix {
  display: inline-block;
  vertical-align: top;
  width: 400px;
  margin-bottom: 10px;
  margin-right: 10px;

  .top,
  .bottom {
    display: flex;
    justify-content: center;
  }

  .top {
  }

  .left {
    width: 100px;
    float: left;
  }

  .right {
    width: 80px;
    float: right;
  }

  .bottom {
    clear: both;
  }
}
</style>
