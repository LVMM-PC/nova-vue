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
        >成功提示的文案</NovaAlert
      >
      <NovaAlert type="info" block border>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" block border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" block border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" block border closable>成功提示的文案</NovaAlert>
      <NovaAlert type="info" block border closable>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" block border closable>警告提示的文案</NovaAlert>
      <NovaAlert type="error" block border closable>错误提示的文案</NovaAlert>
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
      <NovaAlert type="normal" block>一般提示，内容自行编辑</NovaAlert>
      <NovaAlert type="weak" block>一般提示，层级最弱</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" border>成功提示的文案</NovaAlert>
      <NovaAlert type="info" border>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" border>警告提示的文案</NovaAlert>
      <NovaAlert type="error" border>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success" border closable>成功提示的文案</NovaAlert>
      <NovaAlert type="info" border closable>消息提示的文案</NovaAlert>
      <NovaAlert type="warning" border closable>警告提示的文案</NovaAlert>
      <NovaAlert type="error" border closable>错误提示的文案</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success">成功提醒，例：用户名可用</NovaAlert>
      <NovaAlert type="info"
        >一般提醒，例：免费接受推荐邮件，请务必填写正确
      </NovaAlert>
      <NovaAlert type="help">帮助说明，内容自行编辑</NovaAlert>
      <NovaAlert type="warning">警告提醒，例：您的密码设置过于简单</NovaAlert>
      <NovaAlert type="error">错误提醒，例：请输入您的手机号码</NovaAlert>
      <NovaAlert type="normal">一般提示，内容自行编辑</NovaAlert>
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
    }
  }
};
</script>

<style lang="less" scoped>
.nova-ui-alert {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
