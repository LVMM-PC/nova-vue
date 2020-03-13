<template>
  <div class="matrix">
    <div class="top">
      <NovaAlert visible-arrow placement="top-start" border :type="type">
        <span>上左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="top" border :type="type">
        <span>上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="top-end" border :type="type">
        <span>上右</span>
      </NovaAlert>
    </div>
    <div class="left">
      <NovaAlert visible-arrow placement="left-start" border :type="type">
        <span>左上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="left" border :type="type">
        <span>左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="left-end" border :type="type">
        <span>左下</span>
      </NovaAlert>
    </div>
    <div class="right">
      <NovaAlert visible-arrow placement="right-start" border :type="type">
        <span>右上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="right" border :type="type">
        <span>右</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="right-end" border :type="type">
        <span>右下</span>
      </NovaAlert>
    </div>
    <div class="bottom">
      <NovaAlert visible-arrow placement="bottom-start" border :type="type">
        <span>下左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="bottom" border :type="type">
        <span>下</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="bottom-end" border :type="type">
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
