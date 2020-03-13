<template>
  <section class="box">
    <div class="top">
      <NovaAlert border placement="top-start" type="success" visible-arrow>
        <span>上左</span>
      </NovaAlert>
      <NovaAlert border placement="top" type="success" visible-arrow>
        <span>上</span>
      </NovaAlert>
      <NovaAlert border placement="top-end" type="success" visible-arrow>
        <span>上右</span>
      </NovaAlert>
    </div>
    <div class="left">
      <NovaAlert border placement="left-start" type="success" visible-arrow>
        <span>左<br />上</span>
      </NovaAlert>
      <NovaAlert border placement="left" type="success" visible-arrow>
        <span>左</span>
      </NovaAlert>
      <NovaAlert border placement="left-end" type="success" visible-arrow>
        <span>左<br />下</span>
      </NovaAlert>
    </div>
    <div class="right">
      <NovaAlert border placement="right-start" type="success" visible-arrow>
        <span>右<br />上</span>
      </NovaAlert>
      <NovaAlert border placement="right" type="success" visible-arrow>
        <span>右</span>
      </NovaAlert>
      <NovaAlert border placement="right-end" type="success" visible-arrow>
        <span>右<br />下</span>
      </NovaAlert>
    </div>
    <div class="bottom">
      <NovaAlert border placement="bottom-start" type="success" visible-arrow>
        <span>下左</span>
      </NovaAlert>
      <NovaAlert border placement="bottom" type="success" visible-arrow>
        <span>下</span>
      </NovaAlert>
      <NovaAlert border placement="bottom-end" type="success" visible-arrow>
        <span>下右</span>
      </NovaAlert>
    </div>
  </section>
</template>

<style lang="less" scoped>
.nova-alert {
  margin-bottom: 10px;
  margin-right: 10px;
}

.box {
  display: inline-block;
  vertical-align: top;
  width: 320px;

  .top,
  .bottom {
    display: flex;
    padding-left: 70px;
  }

  .left {
    width: 70px;
    float: left;
    text-align: right;
  }

  .right {
    width: 60px;
    float: right;
  }

  .bottom {
    clear: both;
  }
}
</style>
