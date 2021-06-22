<template>
  <v-main>
      <v-layout fill-height>
        <v-container class="d-flex align-center">
          <v-row class="flex-column">
            <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
              <h1 class="text-center">数独</h1>
              <h2 class="text-center">SUDOKU</h2>
            </v-col>
            <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6">
              <v-btn block color="primary" :loading="loading" :disabled="loading" @click="startGame">
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
                @change="setLevel"
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
              <router-link to="/leaderboard">
                <v-btn block color="primary">LEADERBOARDS</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
  </v-main>
</template>

<script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'Home',
    computed: {
      ...mapState(['loading', 'level'])
    },
    data() {
      return {
        levels: [
          { text:"Easy 😃", value: 1},
          { text:"Medium 🤨", value: 2},
          { text:"Hard 😨", value: 3 }
        ]
      }
    },
    methods: {
      startGame(){        
        let level = Math.random() * (this.level * 10 - (this.level - 1) * 10) + this.level * 10;
        
        this.$store.commit('setLoading', true);
        
        setTimeout(() => {
          this.$store.dispatch('startGame', level).then(() => {
            this.$store.commit('setLoading', false)
            this.$router.push('game')
          }); 
        }, 100)
      },
      setLevel(level){
        this.$store.commit('setLevel', level)
      }
    }
  }
</script>