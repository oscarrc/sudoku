<template>
  <v-app class="bg">
    <router-view/>    
    <v-footer color="transparent">
      <v-col cols="12" sm="6" class="text-center text-sm-left">Made with <v-icon color="red" small>mdi-cards-heart</v-icon> by <a class="red--text text-decoration-none" href="https://oscarrc.me" target="_BLANK">Oscar R.C.</a></v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn small primary href="https://ko-fi.com/oscarrc" target="_BLANK">
          ☕ Buy me a coffee
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: function() {
      return {
        audio: new Audio(require("@/assets/music/music.mp3"))
      }
    }
  }
</script>

<style scoped>
  /* .theme--light.v-application{
    background-image: url('assets/image/bg.png');
    background-size: 100% auto;
    background-position: left bottom;
  } */
</style>
