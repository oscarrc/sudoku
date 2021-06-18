<template>
  <v-main>
      <v-layout fill-height>
        <v-container class="d-flex align-center">
          <v-row class="flex-column">
            <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
              <h1 class="text-center">数独</h1>
              <h2 class="text-center">SUDOKU</h2>
            </v-col>
            <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
              <v-btn block color="primary">START</v-btn>
            </v-col>
            <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
              <v-btn block color="primary">LEADERBOARDS</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
  </v-main>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      
    },
    methods: {

    }
  }
</script>
