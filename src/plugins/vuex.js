import Vue from 'vue'
import Vuex from 'vuex'
import { generateSudoku } from '../lib/sudoku';

Vue.use(Vuex);

const defaultState = {
  time: 0,
  level: 1,
  page: 1,
  shown: false,
  loading: false,
  checked: false,
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
    setChecked(state, payload){ state.checked = payload },
    setLevel(state, payload){ state.level = payload },
    setPage(state, payload){ state.page = payload },
    resetTime(state){ state.time = 0 },
    addTime(state, payload){ state.time += payload ? payload : 1 },
    setCell(state, payload){ 
      const { row, col, value } = payload;
      let grid = state.sudoku.grid;
      grid[row][col][value] = !grid[row][col][value];
      state.sudoku = { ...state.sudoku, grid }
    },
  },
  actions: {
    startGame({ commit }, level){
      generateSudoku(level).then((sudoku) => {
        commit('setSudoku', sudoku);
      })
    },
    checkErrors({ commit }){
      commit('setChecked', true);
      setTimeout(()=>{        
        commit('setChecked', false);
      }, 10000)
    }
  },
  getters: {
    solved: state => {
      const { grid, solution } = state.sudoku;
      
      for( let row = 0; row < grid.length; row++ ){
        for( let col = 0; col < grid[row].length; col++ ){
          const value = Object.keys(grid[row][col]).filter( k => grid[row][col][k] === true );
          
          if(value.length > 1 || value[0] != solution[row][col]){
            return false
          }
        }
      }

      return grid.length ? true : false;
    },
    emoji: state => {
      let levels = ["😃", "🤨", "😨"];
      return levels[state.level - 1]
    }
  }
})
