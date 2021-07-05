<template>
    <v-menu min-width="120px" max-width="120px" :close-on-content-click="true" :value="open" :position-x="position[0]" :position-y="position[1]">
      <v-container fluid class="white">
          <v-row>
            <v-col v-for="i in 9" cols="4" v-bind:key="i" class="pa-0">
                <v-responsive :aspect-ratio="1/1" class="text-center">
                    <v-btn :class="values[i] && values[i] === true ? 'text--secondary' : ''" block tile max-width="100%" min-height="100%" @click="() => setValue(i)">
                        {{ i }}
                    </v-btn>
                </v-responsive>
            </v-col>
          </v-row>
      </v-container>
    </v-menu>
</template>

<script>
    export default {
        name: "Selector",
        props: ['open', 'position', 'values', 'setValue']
    }
</script>
