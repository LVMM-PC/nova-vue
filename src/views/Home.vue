<template>
  <div class="home">
    <div class="box link-box">
      <router-link to="/icon">Icon</router-link>
      <router-link to="/select">Select</router-link>
      <router-link to="/radio">Radio</router-link>
      <router-link to="/checkbox">Checkbox</router-link>
      <router-link to="/date-picker">DatePicker</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/alert">Alert</router-link>
      <router-link to="/auto-complete">AutoComplete</router-link>
      <router-link to="/progress">Progress</router-link>
      <router-link to="/button">Button</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
};
</script>

<style lang="less" scoped>
.link-box {
  display: flex;
  flex-wrap: wrap;

  a {
    box-sizing: border-box;
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 200px;
    height: 100px;
    border: 2px solid #42b983;
    color: #42b983;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(66, 185, 131, 0.1);
    }
  }
}
</style>
