<template>
  <section class="box">
    <div class="top">
      <NovaAlert border placement="top-start" type="success" visible-arrow>
        <span>Top start</span>
      </NovaAlert>
      <NovaAlert border placement="top" type="success" visible-arrow>
        <span>Top</span>
      </NovaAlert>
      <NovaAlert border placement="top-end" type="success" visible-arrow>
        <span>Top end</span>
      </NovaAlert>
    </div>
    <div class="left">
      <NovaAlert border placement="left-start" type="success" visible-arrow>
        <span>Left start</span>
      </NovaAlert>
      <NovaAlert border placement="left" type="success" visible-arrow>
        <span>Left</span>
      </NovaAlert>
      <NovaAlert border placement="left-end" type="success" visible-arrow>
        <span>Left end</span>
      </NovaAlert>
    </div>
    <div class="right">
      <NovaAlert border placement="right-start" type="success" visible-arrow>
        <span>Right start</span>
      </NovaAlert>
      <NovaAlert border placement="right" type="success" visible-arrow>
        <span>Right</span>
      </NovaAlert>
      <NovaAlert border placement="right-end" type="success" visible-arrow>
        <span>Right end</span>
      </NovaAlert>
    </div>
    <div class="bottom">
      <NovaAlert border placement="bottom-start" type="success" visible-arrow>
        <span>Bottom start</span>
      </NovaAlert>
      <NovaAlert border placement="bottom" type="success" visible-arrow>
        <span>Bottom</span>
      </NovaAlert>
      <NovaAlert border placement="bottom-end" type="success" visible-arrow>
        <span>Bottom end</span>
      </NovaAlert>
    </div>
  </section>
</template>

<style scoped>
.nova-alert {
  margin: 5px;
}

.box {
  display: inline-block;
  vertical-align: top;
  width: 320px;
}

.top,
.bottom {
  display: flex;
  justify-content: center;
}

.left,
.right {
  white-space: pre-line;
  width: 75px;
}

.left {
  float: left;
}

.right {
  float: right;
}

.bottom {
  clear: both;
}
</style>
