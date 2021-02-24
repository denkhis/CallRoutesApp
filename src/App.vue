<template>
  <div id="app">
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <route-form />
        </el-col>
        <el-col :span="16">
          <route-container />
        </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import RouteForm from './components/route-form.vue'
import RouteContainer from './components/route-container'

export default {
  name: 'app',
  components: {
    RouteForm, RouteContainer
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
