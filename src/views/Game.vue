<template>
    <v-main>      
      <!-- <Header /> -->
      <v-layout fill-height>
        <v-container :class="(loading ? 'blurred' : '') + ' ' + (isSmall ? 'pa-0' : '' )" class="d-flex align-center">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" :class="(loading ? 'blurred' : '') + ' ' + (isSmall ? 'pa-0' : '' )">
              <Sudoku isSmall />
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
      <Dialog />
    </v-main>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  // import Header from '@/components/Header';
  import Dialog from '@/components/Dialog';
  import Sudoku from '@/components/Sudoku';

  export default {
    name: 'Game',
    computed: {
      ...mapState(['sudoku', 'time', 'loading', 'shown']),
      ...mapGetters(['solved']),
      isSmall(){
        return this.$vuetify.breakpoint.name == "xs"
      }
    },
    components: {
      // Header,
      Dialog,
      Sudoku
    },
    data() {
      return {
        timer: null
      }
    },
    created: function(){
      if(this.sudoku.grid.length == 0){
        this.$router.push('/')
      }else{
        this.startTimer()
      }
    },
    watch:{
      shown(value){
        if(value) clearInterval(this.timer)
      },
      solved(value){
        if(value) clearInterval(this.timer)
      }
    },
    destroyed: function(){
      clearInterval(this.timer);
      this.$store.commit('setSudoku', { grid: [], solution: [], puzzle: [] });
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

<style scoped>
  .blurred{
    filter: blur(5px)
  }
</style>