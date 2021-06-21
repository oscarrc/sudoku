<template>
  <v-app>
    <router-view/>    
    <v-footer>
      <v-col cols="12" sm="6" class="text-center text-sm-left">Made with <v-icon color="red" small>mdi-cards-heart</v-icon> by <a href="https://oscarrc.me" target="_BLANK">Oscar R.C.</a></v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn small primary href="https://ko-fi.com/oscarrc" target="_BLANK">
          <v-icon small class="pr-2">mdi-coffee</v-icon>
          Buy me a coffee
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
