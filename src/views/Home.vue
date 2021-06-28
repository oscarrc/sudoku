<template>
  <v-main>    
    <v-layout fill-height>
      <v-container class="d-flex align-center">
        <v-row class="flex-column">
          <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
            <h1 class="text-center red--text">数独</h1>
            <h2 class="text-center">SUDOKU</h2>
          </v-col>
          <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
            <v-btn block color="primary" :loading="loading" :disabled="loading" @click="start">
              START
              <template v-slot:loader>
                <v-progress-circular
                  indeterminate
                  width="2"
                  size="20"
                  color="primary"
                ></v-progress-circular>
                <span class="ml-2">Generating</span>
              </template>
            </v-btn>
          </v-col>            
          <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
            <v-select
              background-color="primary"
              color="white"
              hide-details="true"
              :disabled="loading" 
              :items="levels"
              :value="levels[level -1]"
              @change="selectLevel"
              solo
              dense
            >
              <template v-slot:selection="{ item }">
                <span class="d-flex justify-center white--text subtitle-2 pl-8" style="width: 100%;">
                  LEVEL :  {{ item.text }}
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
            <v-card :loading="fetching" class="frosted">
              <v-list :class="top.length == 0 ? 'py-0' : ''" color="transparent">
                <template v-if="fetching">
                  <v-skeleton-loader v-for="i in 2"
                    v-bind:key="i"
                    type="list-item"
                    class="py-1"
                  ></v-skeleton-loader>
                </template>
                <template v-else>
                  <v-list-item v-for="time, idx in top" v-bind:key="time.id">
                    <v-list-item-title>{{ medals[idx] }} {{ time.username }}</v-list-item-title>
                    <v-list-item-icon>{{ emoji }}</v-list-item-icon>
                    <v-list-item-subtitle class="text-right">{{ time.time | format }}</v-list-item-subtitle>
                  </v-list-item>
                </template>
              </v-list>
              <v-btn block color="primary" class="flat-top-button" to="/leaderboard">LEADERBOARDS</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-main>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
  import supabase from '@/lib/supabase';

  export default {
    name: 'Home',
    computed: {
      ...mapState(['loading', 'level']),
      ...mapGetters(['emoji'])
    },
    data() {
      return {
        levels: [
          { text:"Easy 😃", value: 1},
          { text:"Medium 🤨", value: 2},
          { text:"Hard 😨", value: 3 }
        ],
        medals: ['🥇', '🥈', '🥉'],
        top: [],
        fetching: false
      }
    },
    created(){
      this.getTop(this.level)
    },
    mounted() {
        const buttons = this.$el.querySelectorAll('.v-btn');
        buttons.forEach(b => {
          b.addEventListener('click', () => {
            this.$emit("interacted", true);
          })
        })
    },
    methods: {      
      ...mapMutations(['setLoading', 'setLevel']),
      ...mapActions(['startGame']),
      start(){        
        const min = this.level == 1 ? 1 : ((this.level - 1) * 5) + 1;
        const level = Math.floor(Math.random() * ( (this.level * 5) - min + 1 ) + min );
        
        this.setLoading(true);
        
        setTimeout(() => {
          this.startGame(level).then(() => {
            this.setLoading(false);
            this.$router.push('game')
          });
        }, 100)
      },
      selectLevel(level){
        this.setLevel(level);
        this.getTop();
      },
      async getTop(){
        this.fetching = true;
        let { data: times } = await supabase.from('times').select('*').eq('level', this.level).order('time', { ascending: true }).range(0,2);
        this.fetching = false;
        this.top = times;
      }
    }
  }
</script>

<style scoped>
  .flat-top-button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .frosted {
    background-color: rgba(255,255,255, .85) !important;
    backdrop-filter: blur(2px);
  }
</style>