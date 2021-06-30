<template>
  <v-app class="bg">    
    <Particles
      id="tsparticles"
      :options="particles"
    />
    <Header v-if="route !== 'Home'" :route="route" />
    <router-view @interacted="play"/>  
    <Footer @mute="mute" :muted="muted" :route="route" />
  </v-app>
</template>

<script>
  import Header from '@/components/Header';  
  import Footer from '@/components/Footer'; 
  import particles from '@/particles.json';

  export default {
    name: 'App',
    components: {
      Header,
      Footer
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
    background-image: url('assets/img/bg-bg.svg'), url('assets/img/bg-fg.svg');
    background-position: center bottom, center bottom;
    background-repeat: repeat no-repeat, no-repeat;
  }
</style>
