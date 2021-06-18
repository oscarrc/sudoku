<template>
  <v-app>
    <Header />
    <v-main class="main">
      <v-container>
        <v-row>
          <v-col cols="8">
            <Sudoku />
          </v-col>
          <v-col cols="4">
            <Leaderboard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Footer from './components/Footer';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Sudoku from './components/Sudoku';

export default {
  name: 'App',

  components: {
    Footer,
    Header,
    Leaderboard,
    Sudoku
  },
  data: () => ({
    //
  }),
};
</script>