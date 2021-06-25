<template>
  <v-main>
    <v-layout fill-height class="flex-column">
      <v-container class="d-flex align-center flex-grow-1">
        <v-row justify="center">
          <v-col cols="10" sm="8" md="6" :class="fetching ? 'blurred' : ''">
            <v-list elevation="2">
              <v-list-item>
                <template v-if="fetching">
                    <v-skeleton-loader v-for="i in [0,1,2]"
                      v-bind:key="i"
                      type="list-item"
                      class="py-1"
                    ></v-skeleton-loader>
                  </template>
                  <template v-else>
                    <v-list-item v-for="time, idx in times" v-bind:key="time.id">
                      <v-list-item-avatar>
                        <span class="h6">{{ medals.length > idx ? medals[idx] : idx + 1 }}</span>
                      </v-list-item-avatar>
                      <v-list-item-title>{{ time.username }} <br/> <span class="caption text--secondary">{{ time.date }}</span> </v-list-item-title>
                      <v-list-item-subtitle class="text-right black--text font-weight-medium">{{ time.time | format }}</v-list-item-subtitle>
                    </v-list-item>
                  </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <v-pagination v-if="total > 0" :length="total" :value="page" :total-visible="7" @next="nextPage" @previous="prevPage" @input="goToPage">
      </v-pagination>
    </v-layout>
  </v-main>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import supabase from '@/lib/supabase';

  export default {
    name: "Leaderboard",
    data(){
      return {
        fetching: false,
        total: 1,
        times: [],
        medals: ['🥇', '🥈', '🥉'],
      }
    },
    computed: {
      ...mapState(['level', 'page'])
    },
    created(){
      this.getTimes()
      this.getTotalPages();
    },
    watch: {
      level(){
        this.getTotalPages();
        this.getTimes()
      }
    },
    methods: {
      ...mapMutations(['setPage']),
      async getTimes(){
        const start = (this.page - 1) * 10;
        const end = this.page * 10;
        this.fetching = true;
        let { data: times } = await supabase.from('times').select('*').eq('level', this.level).order('time', { ascending: true }).range(start, end);
        this.fetching = false;
        this.times = times;
      },
      async getTotalPages(){
        const { count } = await supabase.from('times').select('username', { count: 'exact' }).eq('level', this.level);
        this.total = Math.ceil(count / 10);
      },
      nextPage(){
        this.setPage(this.page + 1)
        this.getTimes()
      },
      prevPage(){        
        this.setPage(this.page - 1)
        this.getTimes()
      },
      goToPage(page){
        if(page == this.page) return;
        this.setPage(page)
        this.getTimes()
      }
    }
  }
</script>

<style scoped>
  .blurred{
    filter: blur(5px)
  }
</style>