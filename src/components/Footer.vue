<template>
  <v-footer color="transparent">    
    <v-bottom-navigation v-if="route == 'Game'" background-color="transparent" color="accent" class="primary--text d-flex d-sm-none">
      <v-btn value="restart" to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn value="check">
        <span>Check</span>
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
      <v-btn value="solve">
        <span>Solve</span>
        <v-icon>mdi-flag-checkered</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-col cols="12" sm="6" class="text-center text-sm-left white--text">Made with <v-icon color="accent" small>mdi-cards-heart</v-icon> by <a class="accent--text text-decoration-none" href="https://oscarrc.me" target="_BLANK">Oscar R.C.</a></v-col>
    <v-col cols="12" sm="6" class="text-center text-sm-right">
      <v-btn small primary rounded href="https://ko-fi.com/oscarrc" target="_BLANK">
        ☕ Buy me a coffee
      </v-btn>
      <v-btn x-small primary fab @click="mute" class="ml-2">
        <v-icon small>{{ muted ? 'mdi-volume-high' : 'mdi-volume-mute'}}</v-icon>
      </v-btn>
    </v-col>
  </v-footer>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    name: 'Footer',
    props: ['muted'],
    methods: {
      ...mapMutations(['setShown', 'addTime']),
      ...mapActions(['checkErrors']),
      mute(){
        this.$emit('mute')
      },
      solve: function() { this.setShown(true) },
      check: function() {
        this.checkErrors();
        this.addTime(10);
      }
    }
  }
</script>

<style scoped>
  .theme--light.v-bottom-navigation .v-btn:not(.v-btn--active) {
      color: rgba(255, 255, 255, 0.6) !important;
  }
</style>