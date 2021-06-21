<template>
  <v-main>
    <h1>GAME</h1>
  </v-main>
</template>

<script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'Home',
    computed: mapState(['puzzle', 'time']),
    components: {
      
    },
    data() {
      return {
        timer: null
      }
    },
    methods: {
      startTimer: function(){
        this.timer = setInterval(() => this.$store.commit("addTime"), 1000);
      }
    },
    created: function(){
      if(this.puzzle.grid.length == 0){
        this.$router.push('/')
      }else{
        this.startTimer()
      }
    }
  }
</script>