<template>
    <v-bottom-navigation>
      <v-btn value="check">
        <span>Check</span>
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
      <v-btn value="solve">
        <span>Solve</span>
        <v-icon>mdi-flag-checkered</v-icon>
      </v-btn>
      <v-btn value="restart">
        <span>Restart</span>
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>
