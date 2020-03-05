<template>
  <section class="box">
    <div class="top">
      <NovaAlert visible-arrow placement="top-start" border type="success">
        <span>上左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="top" border type="success">
        <span>上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="top-end" border type="success">
        <span>上右</span>
      </NovaAlert>
    </div>
    <div class="left">
      <NovaAlert visible-arrow placement="left-start" border type="success">
        <span>左<br />上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="left" border type="success">
        <span>左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="left-end" border type="success">
        <span>左<br />下</span>
      </NovaAlert>
    </div>
    <div class="right">
      <NovaAlert visible-arrow placement="right-start" border type="success">
        <span>右<br />上</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="right" border type="success">
        <span>右</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="right-end" border type="success">
        <span>右<br />下</span>
      </NovaAlert>
    </div>
    <div class="bottom">
      <NovaAlert visible-arrow placement="bottom-start" border type="success">
        <span>下左</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="bottom" border type="success">
        <span>下</span>
      </NovaAlert>
      <NovaAlert visible-arrow placement="bottom-end" border type="success">
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
