import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    company: {},
    country: {},
    direct: true,
    oneRoute: true,
    twoRoute: true,
    caller: null,
    callee: null,
    commonArray: [],
    filter: []
  },
  mutations: {
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_COUNTRY: (state, country) => {
      state.country = country
    }, 
    SET_CALLER: (state, caller) => {
      state.caller = caller
    },
    SET_CALLEE: (state, callee) => {
      state.callee = callee
    },
    SET_FILTER: (state, filter) => {
      state.filter = filter
    },
    SET_COMMON_ARRAY: (state, commonArray) => {
      state.commonArray = commonArray
    },
    SET_DIRECT: (state, value) => {
      state.direct = value
    },
    SET_ONE_ROUTE: (state, value) => {
      state.oneRoute = value
    },
    SET_TWO_ROUTE: (state, value) => {
      state.twoRoute = value
    }
  },
  actions: {
    GET_COMPANY({commit}) {
      return axios('http://localhost:3000/data').then((response) => {
        const { data } = response
        const { company } = data
        commit('SET_COMPANY', company)
        return company
      }).catch((error) => {
        console.log(error)
        return error
      })
    },
    GET_COUNTRY({commit}) {
      return axios('http://localhost:3000/data').then((response) => {
        const { data } = response
        const { country } = data
        commit('SET_COUNTRY', country)
        return country
      }).catch((error) => {
        console.log(error)
        return error
      })
    }
  },
  getters: {
    COMPANY(state) {
      return state.company
    },
    COUNTRY(state) {
      return state.country
    },
    CALLER(state) {
      return state.caller
    },
    CALLEE(state) {
      return state.callee
    },
    FILTER(state) {
      return state.filter
    },
    COMMON_ARRAY(state) {
      return state.commonArray
    },
    DIRECT(state) {
      return state.direct
    },
    ONE_ROUTE(state) {
      return state.oneRoute
    },
    TWO_ROUTE(state) {
      return state.twoRoute
    },
    FILTER_BY_COST(state) {
      return state.filter.sort((prev, next) => {
        return prev[prev.length - 1] - next[next.length - 1]
      })
    }
  }
})

export default store