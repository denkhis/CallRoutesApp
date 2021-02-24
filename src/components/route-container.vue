<template>
  <div class="route-container">
    <el-alert
      v-if="FILTER.length === 0"
      title="Выберите звонящую и принимающую стороны"
      type="info"
      :closable="false"
    >
    </el-alert>
    <div v-else>
      <route-card 
        v-for="(item, index) in shortedFilter"
        :route="item"
        :key="index"
        class="route-card"
      >
      </route-card>
      <el-pagination
        layout="total, prev, pager, next"
        :total="FILTER_BY_COST.length"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import RouteCard from './route-card'
import { mapGetters } from 'vuex'

export default {
  name: 'RouteContainer',
  components: {
    RouteCard
  },
  data() {
    return {
      configuredObj: {},
      page: 1,
      pageSize: 4
    }
  },
  watch: {
    FILTER_BY_COST: {
      handler() {
        this.page = 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'FILTER',
      'DIRECT',
      'FILTER_BY_COST'
    ]),
    shortedFilter() {
      return this.FILTER_BY_COST.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  methods: {
    handleCurrentChange(nV) {
      this.page = nV
    }
  }
}
</script>

<style scoped>

  .route-card {
    margin-bottom: 20px;
  }
</style>
