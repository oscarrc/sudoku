<template>
  <v-app>
    <Header />
    <v-main>
      <Sudoku />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Footer from './components/Footer';
import Header from './components/Header';
import Sudoku from './components/Sudoku';

export default {
  name: 'App',

  components: {
    Footer,
    Header,
    Sudoku,
  },

  data: () => ({
    //
  }),
};
</script>
