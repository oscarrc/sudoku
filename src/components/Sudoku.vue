<template>
  <v-container fluid :class="isSmall ? 'pa-0' : '' ">
    <v-row no-gutters v-for="row, rindex in shown ? sudoku.solution : sudoku.puzzle" v-bind:key="rindex" justify="center">
      <v-col cols="1" v-for="col, cindex in row" v-bind:key="rindex + '-' + cindex" :class="'elevation-4 frosted bordered pa-0 ' + cellClasses(rindex, cindex)">
        <v-responsive :aspect-ratio="1/1" class="text-center flex" content-class="d-flex justify-center align-self-stretch align-center" height="100%">
          <span v-if="col !== 0">{{ col }}</span>
          <Cell v-else :values="sudoku.grid[rindex][cindex]" @click="(e) => showSelector(e, rindex, cindex)" :class="checkClasses(rindex, cindex)" />
          <!-- <span v-else @click="(e) => showSelector(e, rindex, cindex)" :class="'d-flex justify-center align-center cell font-weight-bold ' + checkClasses(rindex,cindex)">
            {{ sudoku.grid[rindex][cindex] ? sudoku.grid[rindex][cindex] : '' }}
          </span> -->
          <!-- <input v-else type="number" :class="'cell text-center font-weight-bold ' + checkClasses(rindex,cindex)" @keyup="(e) => setCellValue(rindex, cindex, e) "/> -->
        </v-responsive>
      </v-col>
    </v-row>
    <Selector :open="selector" :position="position" :values="sudoku.grid[cell[0], cell[1]]" :setValue="setCellValue" />
  </v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import Selector from '@/components/Selector.vue'
  import Cell from '@/components/Cell.vue'

  export default {
    name: 'Sudoku',
    computed: mapState(['sudoku', 'shown', 'checked']),
    props: ['isSmall'],
    components: { Selector, Cell },
    data(){
      return {
        selector: false,
        position: [0, 0],
        cell: [0, 0]
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
        const value = Object.keys(this.sudoku.grid[r][c]).filter( k => this.sudoku.grid[r][c][k] === true )

        return this.checked && value.length === 1 && 
              value[0] != this.sudoku.solution[r][c] && 
              this.sudoku.puzzle[r][c] == 0 ? 'error lighten-4' : '';
      },
      // setCellValue(row, col, event){
      //   let value = event.target.value ? parseInt(event.target.value) : 0;
      //   if(this.checked) event.target.classList.remove("error");
      //   if(value && !isNaN(value)) this.setCell({row, col, value});
      // },
      setCellValue(value){
        this.setCell({row: this.cell[0], col: this.cell[1], value});
      },
      showSelector(e, row, col){
        e.preventDefault()
        if(this.checked) e.target.classList.remove("error");
        this.selector = false
        this.position = [e.clientX, e.clientY]        
        this.cell = [row, col]
        this.$nextTick(() => {
          this.selector = true
        })
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* input[type=number] {
    -moz-appearance:textfield;
  } */
</style>