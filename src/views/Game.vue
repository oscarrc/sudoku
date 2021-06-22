<template>
    <v-main>
      
      <Header />
      <v-layout fill-height>
        <v-container class="d-flex align-center">
          <v-row>
            <v-col cols="8">
              <h1>GAME</h1>
            </v-col>
            <v-col cols="4">
              <h2>Leaderboard</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </v-main>
</template>

<script>
  import { mapState } from 'vuex';
  import Header from '@/components/Header';

  export default {
    name: 'Game',
    computed: mapState(['puzzle', 'time']),
    components: {
      Header
    },
    data() {
      return {
        timer: null
      }
    },
    created: function(){
      if(this.puzzle.grid.length == 0){
        this.$router.push('/')
      }else{
        this.startTimer()
      }
    },
    destroyed: function(){
      clearInterval(this.timer);
      this.$store.commit('setPuzzle', { grid: [], solution: [] });
      this.$store.commit('setSolved', false);
      this.$store.commit('setShown', false);
      this.$store.commit('resetTime', false);
    },
    methods: {
      startTimer: function(){
        this.timer = setInterval(() => this.$store.commit("addTime"), 1000);
      }
    }
  }
</script>