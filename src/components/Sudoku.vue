<template>
  <v-container>
    <v-row v-for="row, rindex in puzzle.grid" v-bind:key="rindex" class="justify-center">
      <v-col cols="1" v-for="col, cindex in row" v-bind:key="rindex + '' + cindex" :class="'bordered d-flex justify-center py-5 ' + cellClasses(rindex, cindex)">
        <span v-if="col !== 0">{{ col }}</span>
        <v-menu v-else>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on"> </span>
          </template>  
          <span>Menu</span>  
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Sudoku',
    computed: mapState(['puzzle', 'shown']),
    methods: {
      cellClasses(r, c){
        let bottom = (r + 1) % 3 === 0 && r > 0 && r < (this.puzzle.grid.length - 1) ? 'border-b' : '';
        let right = (c  + 1) % 3 === 0 && c > 0 && c < (this.puzzle.grid[r].length - 1) ? 'border-r' : '';
        return `${bottom} ${right}`
      },
      // setCellValue(r, c, value){

      // }
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