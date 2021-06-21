<template>
    <v-app-bar app elevation="0" color="transparent" class="px-4">
      <v-toolbar-title>
          <span>数独</span> Sudoku
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ timer }}</span>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-check-all</v-icon>
          </v-btn>
        </template>
        <span>Check for errors<br />(adds 10 seconds)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-flag-checkered</v-icon>
          </v-btn>
        </template>
        <span>Solve sudoku<br />(and end game)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </template>
        <span>Start a new game</span>
      </v-tooltip>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Header',
    computed: {
      ...mapState['time', 'puzzle'],
      timer(){
        let h = Math.floor(this.time / 3600);
        let m = Math.floor(this.time % 3600 / 60);
        let s = Math.floor(this.time % 3600 % 60);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        return `${h}:${m}:${s}`;
      }
    }
  }
</script>
