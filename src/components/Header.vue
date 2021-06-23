<template>
    <v-app-bar app elevation="0" color="transparent" class="px-4">
      <v-toolbar-title>
        <router-link to="/" class="black--text text-decoration-none">
          <span class="red--text">数独</span> Sudoku
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip outlined :disabled="shown" color="red">
        {{ emoji }} <span class="black--text pl-2">{{ timer }}</span>
      </v-chip>
      <v-spacer class="d-none d-sm-flex"></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn :disabled="shown || checked" class="d-none d-sm-flex" icon v-on="{ ...tooltip }" @click="check">
            <v-icon>mdi-check-all</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Check for errors<br />(adds 10 seconds)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn :disabled="shown" class="d-none d-sm-flex" icon v-on="{ ...tooltip }" @click="solve">
            <v-icon>mdi-flag-checkered</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Solve sudoku<br />(and end game)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn class="d-none d-sm-flex" icon v-on="{ ...tooltip }" to="/">
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Start a new game</span>
      </v-tooltip>
    </v-app-bar>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

  export default {
    name: 'Header',
    computed: {
      ...mapState(['shown', 'checked']),
      ...mapGetters(['timer', 'emoji'])
    },
    methods: {      
      ...mapMutations(['setShown', 'addTime']),
      ...mapActions(['checkErrors']),
      solve: function() { this.setShown(true) },
      check: function() {
        this.checkErrors();
        this.addTime(10);
      }
    }
  }
</script>