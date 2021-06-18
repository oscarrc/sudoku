import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const defaultState = {
  time: 0,
  started: false,
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
    setStarted(state){ state.started = true },    
    toggleLoading(state){ state.loading = false },
  },
  actions: {
    incrementTime({commit}){ commit('incrementTime') },
    resetState({commit}){ commit('resetState') },
    setShown({commit}){ commit('setShown') },
    setSolved({commit}){ commit('setSolved') },
    setStarted({commit}){ commit('setStarted') },
    toggleLoading({commit}){ commit('toggleLoading') },
  }
})
