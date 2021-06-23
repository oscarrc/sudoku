import Vue from 'vue'
import Vuex from 'vuex'
import { generateSudoku } from '../lib/sudoku';

Vue.use(Vuex);

const defaultState = {
  time: 0,
  level: 1,
  shown: false,
  loading: false,
  check: false,
  sudoku: {
    grid: [],
    puzzle: [],
    solution: []
  }
}

export default new Vuex.Store({
  state: defaultState,
  mutations: { 
    setLoading(state, payload){ state.loading = payload },
    setSudoku(state, payload){ state.sudoku = payload },
    setSolved(state, payload){ state.solved = payload },
    setShown(state, payload){ state.shown = payload },
    setLevel(state, payload){ state.level = payload },
    resetTime(state){ state.time = 0 },
    addTime(state, payload){ state.time += payload ? payload : 1 },
    setCell(state, payload){ 
      const { row, col, value } = payload;
      state.sudoku.grid[row][col] = value;
    },
  },
  actions: {
    startGame({ commit }, level){
      generateSudoku(level).then((sudoku) => {
        commit('setSudoku', sudoku);
      })
    }
  },
  getters: {
    timer: state => {
        let time = state.time;
        let h = Math.floor(time / 3600);
        let m = Math.floor(time % 3600 / 60);
        let s = Math.floor(time % 3600 % 60);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        return `${h}:${m}:${s}`;
    },
    solved: state => {
      const { grid, solution } = state.sudoku;
      
      for( let row = 0; row < grid.length; row++ ){
        for( let col = 0; col < grid[row].length; col++ ){
          if(grid[row][col] !== solution[row][col]){
            return false
          }
        }
      }

      return grid.length ? true : false;
    },
    emoji: state => {
      let levels = ["😃", "🤨", "😨"];
      return levels[state.level - 1]
    },
  }
})
