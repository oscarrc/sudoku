<template>
  <section>
    <Header />
    <v-main>
      <v-layout fill-height>
        <v-container class="d-flex align-center">
          <v-row class="flex-column">
            <h1>GAME</h1>
          </v-row>
        </v-container>
      </v-layout>
    </v-main>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import Header from '@/components/Header';

  export default {
    name: 'Home',
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
    },
    methods: {
      startTimer: function(){
        this.timer = setInterval(() => this.$store.commit("addTime"), 1000);
      }
    }
  }
</script>