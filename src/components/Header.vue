<template>
    <v-app-bar app elevation="0" color="transparent" class="px-4">
      <v-toolbar-title>
        <router-link to="/" class="black--text text-decoration-none">
          <span class="red--text">数独</span> Sudoku
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip outlined color="red">
        <span class="black--text">{{ timer }}</span>
      </v-chip>
      <v-spacer class="d-none d-sm-flex"></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn class="d-none d-sm-flex" icon v-on="{ ...tooltip }">
            <v-icon>mdi-check-all</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Check for errors<br />(adds 10 seconds)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn class="d-none d-sm-flex" icon v-on="{ ...tooltip }" @click="showSolution">
            <v-icon>mdi-flag-checkered</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Solve sudoku<br />(and end game)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <router-link to="/" class="text-decoration-none">
            <v-btn class="d-none d-sm-flex" icon v-on="{ ...tooltip }">
              <v-icon>mdi-restart</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span class="text-center">Start a new game</span>
      </v-tooltip>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Header',
    computed: {
      ...mapState['puzzle', 'time', 'level'],
      timer() { return this.$store.getters.getTime }
    },
    methods: {
      showSolution: function() { this.$store.commit('setShown', true) }
    }
  }
</script>