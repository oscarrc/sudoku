<template>
  <v-container fluid>
    <v-row v-for="row, rindex in puzzle.grid" v-bind:key="rindex" class="justify-center">
      <v-col cols="1" v-for="col, cindex in row" v-bind:key="rindex + '' + cindex" :class="'bordered d-flex justify-center py-1 py-sm-2 py-md-3 py-lg-5 ' + cellClasses(rindex, cindex)">
        <span class="cell" v-if="col !== 0">{{ col }}</span>
        <v-menu v-else>
          <template v-slot:activator="{ on, attrs }">
            <span class="cell" v-bind="attrs" v-on="on"> </span>
          </template>  
          <span>Menu</span>  
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Sudoku',
    computed: mapState(['puzzle', 'shown']),
    methods: {
      ...mapMutations(['setCell']),
      cellClasses(r, c){
        let bottom = (r + 1) % 3 === 0 && r > 0 && r < (this.puzzle.grid.length - 1) ? 'border-b' : '';
        let right = (c  + 1) % 3 === 0 && c > 0 && c < (this.puzzle.grid[r].length - 1) ? 'border-r' : '';
        return `${bottom} ${right}`
      },
      setCellValue(row, col, value){
        const error = value.length == 1 && value[0] == this.puzzle.solution[row][col];
        this.setCell({row, col, value, error})
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
</style>