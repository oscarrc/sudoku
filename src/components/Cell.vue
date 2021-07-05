<template>
  <v-row no-gutters @click="(e) => this.$emit('click', e)" class="cell">
    <template v-if="value">
      <v-col cols="12" class="ma-auto font-weight-bold">{{ value }}</v-col>
    </template>
    <template v-else>
      <v-col v-for="(value, key) in values" :key="key" cols="4" class="caption guess">
        <v-responsive :aspect-ratio="1/1" class="flex justify-center align-center">
          <span class="text--secondary">{{ value ? key : '' }}</span>
        </v-responsive>
      </v-col>
    </template>
  </v-row>
</template>

<script>
  export default {
    name: "Cell",
    props: ['values'],
    computed: {
      value(){
        const value = Object.keys(this.values).filter( k => this.values[k] === true );
        return value.length === 1 ? value[0] : 0;
      }
    }
  }
</script>

<style scoped>
  .cell {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .guess {
    line-height: calc(100% / 3);
  }
</style>
