<template>
  <v-app class="bg">
    <Header v-if="route !== 'Home'" :route="route" />
    <router-view @interacted="play"/>    
    <v-footer color="transparent">
      <v-col cols="12" sm="6" class="text-center text-sm-left">Made with <v-icon color="red" small>mdi-cards-heart</v-icon> by <a class="red--text text-decoration-none" href="https://oscarrc.me" target="_BLANK">Oscar R.C.</a></v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn small primary outlined rounded href="https://ko-fi.com/oscarrc" target="_BLANK">
          ☕ Buy me a coffee
        </v-btn>
        <v-btn small primary outlined icon @click="mute" class="ml-2">
          <v-icon small>{{ muted ? 'mdi-volume-high' : 'mdi-volume-mute'}}</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import Header from '@/components/Header';

  export default {
    name: 'App',
    components: {
      Header
    },
    computed: {
      route() {
        return this.$route.name;
      }
    },
    data: function() {
      return {
        audio: new Audio(require("@/assets/music/music.mp3")),
        muted: true
      }
    },
    mounted(){
      this.muted = this.audio.muted = true;
    },
    methods: {
      play(){
        this.audio.play();
      },
      mute(){        
        this.muted = this.audio.muted = !this.audio.muted;
        if(!this.muted && this.audio.paused) this.play();
      }
    }
  }
</script>

<style scoped>
  .theme--light.v-application{
    background-image: url('assets/image/bg.svg');
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat;
  }
</style>
