<template>
  <v-container fluid :class="isSmall ? 'pa-0' : '' ">
    <v-row v-for="row, rindex in shown ? sudoku.solution : sudoku.puzzle" v-bind:key="rindex" class="justify-center">
      <v-col cols="1" v-for="col, cindex in row" v-bind:key="rindex + '-' + cindex" :class="'elevation-4 frosted bordered pa-0 ' + cellClasses(rindex, cindex)">
        <v-responsive :aspect-ratio="1/1" class="text-center flex" content-class="d-flex justify-center align-self-stretch align-center" height="100%">
          <span v-if="col !== 0">{{ col }}</span>
          <input type="number" :class="'cell text-center font-weight-bold ' + checkClasses(rindex,cindex)" @keyup="(e) => setCellValue(rindex, cindex, e) "/>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Sudoku',
    computed: mapState(['sudoku', 'shown', 'checked']),
    props: ['isSmall'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      ...mapMutations(['setCell']),
      cellClasses(r, c){
        const bottom = (r + 1) % 3 === 0 && r > 0 && r < (this.sudoku.grid.length - 1) ? 'border-b' : '';
        const right = (c  + 1) % 3 === 0 && c > 0 && c < (this.sudoku.grid[r].length - 1) ? 'border-r' : '';      
        const solve = this.shown ? ( this.sudoku.grid[r][c] != this.sudoku.solution[r][c] ? 'accent--text font-weight-bold' : ( this.sudoku.puzzle[r][c] == 0 ? 'green--text font-weight-bold' : '' )) : '';
        
        return `${bottom} ${right} ${solve}`
      },
      checkClasses(r, c){
        return this.checked && 
              this.sudoku.grid[r][c] != this.sudoku.solution[r][c] && 
              this.sudoku.puzzle[r][c] == 0 &&
              this.sudoku.grid[r][c] != 0 ? 'error lighten-4' : '';
      },
      setCellValue(row, col, event){
        let value = event.target.value ? parseInt(event.target.value) : 0;
        if(this.checked) event.target.classList.remove("error");
        if(value && !isNaN(value)) this.setCell({row, col, value});
      }
    }
  }
</script>

<style scoped>
  .frosted {
    background-color: rgba(255,255,255, .85) !important;
    backdrop-filter: blur(2px);
  }
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
  .cell-wrapper{
    min-height: 100% !important
  }
  .cell {
    width: 100%;
    height: 100%;
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