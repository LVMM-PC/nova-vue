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
      <NovaAlert type="success" block border @click="handleClick"
        >成功提示的文案
      </NovaAlert>
      <NovaAlert type="info" block border>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" block border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" block border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" block border @click="handleClick"
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
      <NovaAlert type="info" block border>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" block border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" block border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert
        type="success"
        block
        border
        closable
        @close="handleClose"
        @afterClose="handleAfterClose"
        >成功提示的文案
      </NovaAlert>
      <NovaAlert type="info" block border closable>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" block border closable>警告提示的文案</NovaAlert>
      <NovaAlert type="error" block border closable>错误提示的文案</NovaAlert>
      <NovaAlert type="error" block border closable
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" block>成功提醒，例：用户名可用</NovaAlert>
      <NovaAlert type="info" block
        >一般提醒，例：免费接受推荐邮件，请务必填写正确
      </NovaAlert>
      <NovaAlert type="help" block>帮助说明，内容自行编辑</NovaAlert>
      <NovaAlert type="warning" block
        >警告提醒，例：您的密码设置过于简单
      </NovaAlert>
      <NovaAlert type="error" block>错误提醒，例：请输入您的手机号码</NovaAlert>
      <NovaAlert block>一般提示，内容自行编辑</NovaAlert>
      <NovaAlert type="weak" block>一般提示，层级最弱</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" border>成功提示的文案</NovaAlert>
      <NovaAlert type="info" border>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" border>成功提示的文案</NovaAlert>
      <NovaAlert type="info" border
        >此页面列出了所有使用标签创建的 HTML
        元素。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。
        元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如
        搜索引擎、浏览器
        等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。
      </NovaAlert>
      <NovaAlert type="warning" border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" border closable>成功提示的文案</NovaAlert>
      <NovaAlert type="info" border closable>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" border closable>警告提示的文案</NovaAlert>
      <NovaAlert type="error" border closable>错误提示的文案</NovaAlert>
      <NovaAlert type="error" border closable
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

export default {
  name: 'AlertDemo',
  components: { Matrix, NovaAlert },
  methods: {
    handleClick(e) {
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
