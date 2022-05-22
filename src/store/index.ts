import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 容器的状态实现了共享
    user: JSON.parse(localStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  mutations: {
    // 修改容器数据 使用 mutation 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
