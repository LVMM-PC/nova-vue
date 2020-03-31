<template>
  <div>
    <div class="box">
      <Matrix></Matrix>

      <Matrix type="success"></Matrix>

      <Matrix type="info"></Matrix>

      <Matrix type="warning"></Matrix>

      <Matrix type="error"></Matrix>
    </div>
    <div class="box">
      <NovaAlert
        block
        border
        type="success"
        :data-id="dataId"
        @click="handleClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        >成功提示的文案
      </NovaAlert>
      <NovaAlert block border type="info">消息提示的文案</NovaAlert>
      <NovaAlert block border type="warning">警告提示的文案</NovaAlert>
      <NovaAlert block border type="error">错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert block border type="success" @click="handleClick"
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
      <NovaAlert block border type="info">消息提示的文案</NovaAlert>
      <NovaAlert block border type="warning">警告提示的文案</NovaAlert>
      <NovaAlert block border type="error">错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert
        block
        border
        closable
        type="success"
        @afterClose="handleAfterClose"
        @close="handleClose"
        >成功提示的文案
      </NovaAlert>
      <NovaAlert block border closable type="info">消息提示的文案</NovaAlert>
      <NovaAlert block border closable type="warning">警告提示的文案</NovaAlert>
      <NovaAlert block border closable type="error">错误提示的文案</NovaAlert>
      <NovaAlert block border closable type="error"
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert block type="success">成功提醒，例：用户名可用</NovaAlert>
      <NovaAlert block type="info"
        >一般提醒，例：免费接受推荐邮件，请务必填写正确
      </NovaAlert>
      <NovaAlert block type="help">帮助说明，内容自行编辑</NovaAlert>
      <NovaAlert block type="warning"
        >警告提醒，例：您的密码设置过于简单
      </NovaAlert>
      <NovaAlert block type="error">错误提醒，例：请输入您的手机号码</NovaAlert>
      <NovaAlert block>一般提示，内容自行编辑</NovaAlert>
      <NovaAlert block type="weak">一般提示，层级最弱</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border type="success">成功提示的文案</NovaAlert>
      <NovaAlert border type="info">消息提示的文案</NovaAlert>
      <NovaAlert border type="warning">警告提示的文案</NovaAlert>
      <NovaAlert border type="error">错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border type="success">成功提示的文案</NovaAlert>
      <NovaAlert border type="info"
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
      <NovaAlert border type="warning">警告提示的文案</NovaAlert>
      <NovaAlert border type="error">错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border closable type="success">成功提示的文案</NovaAlert>
      <NovaAlert border closable type="info">消息提示的文案</NovaAlert>
      <NovaAlert border closable type="warning">警告提示的文案</NovaAlert>
      <NovaAlert border closable type="error">错误提示的文案</NovaAlert>
      <NovaAlert border closable type="error"
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success">成功提醒，例：用户名可用</NovaAlert>
      <NovaAlert type="info"
        >一般提醒，例：免费接受推荐邮件，请务必填写正确
      </NovaAlert>
      <NovaAlert type="help">帮助说明，内容自行编辑</NovaAlert>
      <NovaAlert type="warning">警告提醒，例：您的密码设置过于简单</NovaAlert>
      <NovaAlert type="error">错误提醒，例：请输入您的手机号码</NovaAlert>
      <NovaAlert>一般提示，内容自行编辑</NovaAlert>
      <NovaAlert type="weak">一般提示，层级最弱</NovaAlert>
    </div>
  </div>
</template>

<script>
import NovaAlert from '@/components/alert/NovaAlert';
import Matrix from '@/views/demos/alert/Matrix';
import Utils from '@/utils/utils';

export default {
  name: 'AlertDemo',
  components: { Matrix, NovaAlert },
  data() {
    return {
      dataId: 42
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
      this.dataId = Utils.getRandomInt(0, 42);
    },
    handleMouseenter(e) {
      console.log(e);
    },
    handleMouseleave(e) {
      console.log(e);
    },
    handleClose() {
      console.log('close');
    },
    handleAfterClose() {
      console.log('after close');
    }
  }
};
</script>

<style lang="less" scoped>
.nova-alert {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
