<template>
  <v-app-bar app elevation="0" color="transparent" class="px-4">
    <v-toolbar-title>
      <router-link to="/" class="black--text text-decoration-none">
        <span class="accent--text">数独</span> Sudoku
      </router-link>
    </v-toolbar-title>    
    <v-spacer></v-spacer>
    <template v-if="route == 'Game'">
      <v-chip outlined :disabled="shown" color="red">
        {{ emoji }} <span class="black--text pl-2">{{ time | format }}</span>
      </v-chip>
      <v-spacer class="d-none d-sm-flex"></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn :disabled="shown || checked || solved" class="d-none d-sm-flex" icon v-on="{ ...tooltip }" @click="check">
            <v-icon>mdi-check-all</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Check for errors<br />(adds 10 seconds)</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn :disabled="shown || solved" class="d-none d-sm-flex" icon v-on="{ ...tooltip }" @click="solve">
            <v-icon>mdi-flag-checkered</v-icon>
          </v-btn>
        </template>
        <span class="text-center">Solve sudoku<br />(and end game)</span>
      </v-tooltip>
    </template>
    
    <v-tooltip bottom v-if="route != 'Home'">
      <template v-slot:activator="{ on: tooltip }">
        <v-btn class="d-none d-sm-flex" icon v-on="{ ...tooltip }" to="/">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </template>
      <span class="text-center">Start a new game</span>
    </v-tooltip>

    <template v-slot:extension v-if="route == 'Leaderboard'">
      <v-tabs color="accent" centered show-arrows v-model="tab">
         <v-tab>😃 Easy</v-tab>
         <v-tab>🤨 Medium</v-tab>
         <v-tab>😨 Hard</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

  export default {
    name: 'Header',
    props: ['route'],
    data(){
      return {
        tab: 0,
        levels: [
          { text:"😃 Easy", value: 1},
          { text:"🤨 Medium", value: 2},
          { text:"😨 Hard", value: 3 }
        ],
      }
    },
    computed: {
      ...mapState(['shown', 'checked', 'time']),
      ...mapGetters(['emoji', 'solved']),    
    },
    watch:{
      tab(value){
        this.setPage(1);
        this.setLevel(value + 1)
      }
    },
    methods: {      
      ...mapMutations(['setShown', 'setLevel', 'setPage', 'addTime']),
      ...mapActions(['checkErrors']),
      solve: function() { this.setShown(true) },
      check: function() {
        this.checkErrors();
        this.addTime(10);
      }
    }
  }
</script>

<style scoped>
  .v-chip.v-chip--outlined.v-chip.v-chip{
    background-color: white !important;
  }
</style>