<template>
  <div class="route-card">
    <el-card shadow="hover">
      <el-row class="icons-wrapper">
        <el-col :span="2">
          <el-button type="success" plain round>{{ totalPrice }}$</el-button>
        </el-col>

          <el-col v-if="route.length === 2" :span="8" :offset="14" class="route-wrapper">
            <el-button type="primary" round>{{ route[0].src }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[0].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[0].des }}</el-button>
          </el-col>

          <el-col v-if="route.length === 3" :span="14" :offset="8" class="route-wrapper">
            <el-button type="primary" round>{{ route[0].src }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[0].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[0].des }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[1].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[1].des }}</el-button>
          </el-col>

          <el-col v-if="route.length === 4" :span="20" :offset="2" class="route-wrapper">
            <el-button type="primary" round>{{ route[0].src }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[0].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[0].des }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[1].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[1].des }}</el-button>
            <div class="company-wrapper">
              <el-button class="company-logo" type="warning" plain>{{ route[2].company }}</el-button>
              <i class="el-icon-right"></i>
            </div>
            <el-button type="primary" round>{{ route[2].des }}</el-button>
          </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>


export default {
  name: 'RouteCard',
  props: {
    route: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    totalPrice() {
      return this.route[this.route.length - 1]
    }
  }
}
</script>

<style scoped>

  .icons-wrapper {
    display: flex;
    align-items: center;
  }

  .route-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .company-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .company-logo {
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
