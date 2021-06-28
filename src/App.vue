<template>
  <v-app class="bg">    
    <Particles
      id="tsparticles"
      :options="particles"
    />
    <Header v-if="route !== 'Home'" :route="route" />
    <router-view @interacted="play"/>    
    <v-footer color="transparent">
      <v-col cols="12" sm="6" class="text-center text-sm-left white--text">Made with <v-icon color="red" small>mdi-cards-heart</v-icon> by <a class="red--text text-decoration-none" href="https://oscarrc.me" target="_BLANK">Oscar R.C.</a></v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn small primary rounded href="https://ko-fi.com/oscarrc" target="_BLANK">
          ☕ Buy me a coffee
        </v-btn>
        <v-btn x-small fab @click="mute" class="ml-2">
          <v-icon small>{{ muted ? 'mdi-volume-high' : 'mdi-volume-mute'}}</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import Header from '@/components/Header';  
  import particles from '@/particles.json';

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
        muted: true,
        particles: particles
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
    background-color: white;
    background-image: url('assets/img/bg.png');
    background-position: center bottom;
    background-repeat: repeat no-repeat;
  }
</style>
