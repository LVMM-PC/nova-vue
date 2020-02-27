<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/select">Select</router-link>
      |
      <router-link to="/radio">Radio</router-link>
      |
      <router-link to="/checkbox">Checkbox</router-link>
      |
      <router-link to="/date-picker">DatePicker</router-link>
      |
      <router-link to="/calendar">Calendar</router-link>
      |
      <router-link to="/alert">Alert</router-link>
      |
      <router-link to="/autocomplete">Autocomplete</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
body {
  font-family: 'Helvetica Neue', 'Arial', 'PingFang SC', 'Microsoft Yahei',
    'SimSun', sans-serif;
}

#app {
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.box {
  position: relative;
  margin: 20px;
  padding: 20px;
}

.post {
  width: 1200px;
  margin: 20px;
}

.block {
  background-color: rgba(225, 247, 218, 0.9);
  position: relative;
  height: 50px;
}
</style>
