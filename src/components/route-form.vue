<template>
  <div class="route-form">
    <el-card shadow="hover">
      <el-form label-position="top">
        <el-form-item label="Звонящая сторона (Caller)" style="margin-bottom:10px">
          <el-select 
            v-model="caller" 
            placeholder="Выберите страну" 
            clearable
            @clear="getCardArray()"
          >
            <el-option 
              v-for="(value, key) in COUNTRY" 
              :key="key" 
              :label="value" 
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Принимающая сторона (Callee)">
          <el-select 
            v-model="callee" 
            placeholder="Выберите страну" 
            clearable
            @clear="getCardArray()"
          >
            <el-option 
              v-for="(value, key) in COUNTRY" 
              :key="key" 
              :label="value" 
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="direct" checked>Прямое соединение</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="oneRoute" checked>Один дополнительный узел</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="twoRoute" checked>Два дополнительных узла</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RouteForm',
  props: {
    msg: String
  },
  data() {
    return {
      direct: true,
      oneRoute: true,
      twoRoute: true,
      caller: null,
      callee: null
    }
  },
  watch: {
    caller: {
      handler(nV) {
        this.SET_CALLER(nV)
        this.getCardArray()
      }
    },
    callee: {
      handler(nV) {
        this.SET_CALLEE(nV)
        this.getCardArray()
      }
    },
    direct: {
      handler(nV) {
        this.SET_DIRECT(nV)
        this.getCardArray()
      }
    },
    oneRoute: {
      handler(nV) {
        this.SET_ONE_ROUTE(nV)
        this.getCardArray()
      }
    },
    twoRoute: {
      handler(nV) {
        this.SET_TWO_ROUTE(nV)
        this.getCardArray()
      }
    }
  },
  computed: {
    ...mapGetters([
      'COUNTRY',
      'COMPANY',
      'CALLER',
      'CALLEE',
      'FILTER',
      'COMMON_ARRAY',
      'DIRECT',
      'ONE_ROUTE',
      'TWO_ROUTE'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_CALLER', 
      'SET_CALLEE', 
      'SET_FILTER', 
      'SET_COMMON_ARRAY', 
      'SET_DIRECT',
      'SET_ONE_ROUTE',
      'SET_TWO_ROUTE'
    ]),
    ...mapActions(['GET_COUNTRY', 'GET_COMPANY']),
    getCardArray() {
      const arr = []
      if (this.CALLER && this.CALLEE) {
        // прямое соединение
        if (this.DIRECT === true) {
          for (let item of this.COMMON_ARRAY) {
            if (item.src === this.CALLER && item.des === this.CALLEE) {
              const pointsArray = []
              pointsArray.push(item)
              pointsArray.push(this.totalPrice(pointsArray))
              arr.push(pointsArray)
            }
          }
        }
        // один доп узел
        if (this.ONE_ROUTE === true) {
          for (let i = 0; i < this.COMMON_ARRAY.length; i++) {
            if (this.COMMON_ARRAY[i].src === this.CALLER) {
              for (let j = 0; j < this.COMMON_ARRAY.length; j++) {
                if (this.COMMON_ARRAY[j].des === this.CALLEE && this.COMMON_ARRAY[j].src === this.COMMON_ARRAY[i].des) {
                  const pointsArray = []
                  pointsArray.push(this.COMMON_ARRAY[i], this.COMMON_ARRAY[j])
                  pointsArray.push(this.totalPrice(pointsArray))
                  arr.push(pointsArray)
                }
              }
            }
          }
        }
        //два доп узла
        if (this.TWO_ROUTE === true) {
          for (let i = 0; i < this.COMMON_ARRAY.length; i++) {
            if (this.COMMON_ARRAY[i].src === this.CALLER) {
              for (let j = 0; j < this.COMMON_ARRAY.length; j++) {
                if (this.COMMON_ARRAY[i].des === this.COMMON_ARRAY[j].src) {
                  for (let k = 0; k < this.COMMON_ARRAY.length; k++) {
                    if (this.COMMON_ARRAY[j].des === this.COMMON_ARRAY[k].src && this.COMMON_ARRAY[k].des === this.CALLEE) {
                      const pointsArray = []
                      pointsArray.push(this.COMMON_ARRAY[i], this.COMMON_ARRAY[j], this.COMMON_ARRAY[k])
                      pointsArray.push(this.totalPrice(pointsArray))
                      arr.push(pointsArray)
                    }
                  }
                }
              }
            }
          }
        }
        this.SET_FILTER(arr)
        console.log(this.FILTER)
      }
    },
    setCommonArray() {
      const arr = []
      for (const key in this.COMPANY) {
        this.COMPANY[key].forEach((item) => {
          arr.push({
            company: key,
            src: item.src,
            des: item.des,
            price: item.price
          })
        })
      }
      this.SET_COMMON_ARRAY(arr)
    },
    totalPrice(arr) {
      let totalPrice = 0
      arr.forEach((item) => {
        totalPrice += item.price
      })
      return totalPrice
    }
  },
  created() {
    this.GET_COUNTRY()
    this.GET_COMPANY().then(() => {
      this.setCommonArray()
    })
  }
}
</script>

<style scoped>
  .form-checkbox {
    margin-bottom: 20px;
  }
</style>
