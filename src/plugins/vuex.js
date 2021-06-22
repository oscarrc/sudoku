import Vue from 'vue'
import Vuex from 'vuex'
import { generateSudoku } from '../lib/sudoku';

Vue.use(Vuex);

const defaultState = {
  time: 0,
  solved: false,
  shown: false,
  loading: false,
  level: 1,
  puzzle: {
    grid: [],
    solution: []
  }
}

export default new Vuex.Store({
  state: defaultState,
  mutations: { 
    setLoading(state, payload){ state.loading = payload },
    setPuzzle(state, payload){ state.puzzle = payload },
    setSolved(state, payload){ state.solved = payload },
    setShown(state, payload){ state.shown = payload },
    setLevel(state, payload){ state.level = payload },
    resetTime(state){ state.time = 0 },
    addTime(state){ state.time += 1 }
  },
  actions: {
    startGame({ commit }, level){
      generateSudoku(level).then((puzzle) => {
        commit('setPuzzle', puzzle);
      })
    }
  },
  getters: {
    getTime: state => {
        let time = state.time;
        let h = Math.floor(time / 3600);
        let m = Math.floor(time % 3600 / 60);
        let s = Math.floor(time % 3600 % 60);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        return `${h}:${m}:${s}`;
    }
  }
})
