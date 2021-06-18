import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const defaultState = {
  time: 0,
  solved: false,
  shown: false,
  loading: false
}

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    incrementTime(state){ state.time ++ },
    resetState(state){ Object.assign(state, defaultState)},
    setShown(state){ state.shown = true },
    setSolved(state){ state.solved = true },  
    toggleLoading(state){ state.loading = false },
  },
  actions: {
    incrementTime({commit}){ commit('incrementTime') },
    resetState({commit}){ commit('resetState') },
    setShown({commit}){ commit('setShown') },
    setSolved({commit}){ commit('setSolved') },
    toggleLoading({commit}){ commit('toggleLoading') },
  }
})
