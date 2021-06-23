<template>
  <v-container fluid>
    <v-row v-for="row, rindex in shown ? sudoku.solution : sudoku.puzzle" v-bind:key="rindex" class="justify-center">
      <v-col cols="1" v-for="col, cindex in row" v-bind:key="rindex + '-' + cindex" :class="'bordered d-flex justify-center ' + cellClasses(rindex, cindex)">
        <span v-if="col !== 0" class="cell text-center">{{ col }}</span>
        <input v-else type="number" class="cell text-center font-weight-bold" @keyup="(e) => setCellValue(rindex, cindex, e.target.value) "/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Sudoku',
    computed: mapState(['sudoku', 'shown']),
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      ...mapMutations(['setCell']),
      cellClasses(r, c){
        let bottom = (r + 1) % 3 === 0 && r > 0 && r < (this.sudoku.grid.length - 1) ? 'border-b' : '';
        let right = (c  + 1) % 3 === 0 && c > 0 && c < (this.sudoku.grid[r].length - 1) ? 'border-r' : '';
        let padding = this.sudoku.grid[r][c] != 0 || this.shown ? 'py-1 py-sm-2 py-md-3 py-lg-5' : 'px-0 py-0';        
        let solve = this.shown ? ( this.sudoku.grid[r][c] != this.sudoku.solution[r][c] ? 'red--text' : ( this.sudoku.puzzle[r][c] == 0 ? 'green--text' : '' )) : '';

        return `${bottom} ${right} ${solve} ${padding}`
      },
      setCellValue(row, col, value){
        value = value ? parseInt(value) : '';
        if(value && !isNaN(value)) this.setCell({row, col, value});
      }
    }
  }
</script>

<style scoped>
  .bordered {
    border: .25px solid gray;
  }
  .border-b {
    border-bottom-width: 2px !important;
    border-bottom-color: black;
  }
  .border-r {
    border-right-width: 2px !important;
    border-right-color: black;
  }
  .cell {
    width: inherit;
    height: inherit;
    min-height: 1.5rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type=number] {
      -moz-appearance:textfield;
  }
</style>