<template>
    <v-main>      
      <Header />
      <v-layout fill-height>
        <v-container class="d-flex align-center">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" :class="loading ? 'blurred' : ''">
              <Sudoku />
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </v-main>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import Header from '@/components/Header';
  import Sudoku from '@/components/Sudoku';

  export default {
    name: 'Game',
    computed: {
      ...mapState(['sudoku', 'time', 'loading', 'shown']),
      ...mapGetters(['solved'])
    },
    components: {
      Header,
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
        if(value){
          clearInterval(this.timer)
          alert("Solved")
        }
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