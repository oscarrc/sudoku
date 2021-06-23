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
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>🥇 First</v-list-item-title>
                    <v-list-item-icon>{{ emoji }}</v-list-item-icon>
                    <v-list-item-subtitle class="text-right">01:00:00</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>🥈 Second</v-list-item-title>
                    <v-list-item-icon>{{ emoji }}</v-list-item-icon>
                    <v-list-item-subtitle class="text-right">01:25:00</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>🥉 Third</v-list-item-title>
                    <v-list-item-icon>{{ emoji }}</v-list-item-icon>
                    <v-list-item-subtitle class="text-right">02:15:00</v-list-item-subtitle>
                  </v-list-item>
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
        ]
      }
    },
    methods: {      
      ...mapMutations(['setLoading', 'setLevel']),
      ...mapActions(['startGame']),
      start(){        
        let level = Math.random() * (this.level * 5 - (this.level - 1) * 5) + this.level * 5;
        
        this.setLoading(true);
        
        setTimeout(() => {
          this.startGame(level).then(() => {
            this.setLoading(false);
            this.$router.push('game')
          });
        }, 100)
      }
    }
  }
</script>

<style scoped>
  .flat-top-button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>