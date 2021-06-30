<template>
    <v-menu min-width="120px" max-width="120px" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <slot 
          v-bind="attrs"
          v-on="on">
        </slot>
      </template>
      <v-container fluid class="white">
          <v-row>
            <v-col v-for="i in 9" cols="4" v-bind:key="i" class="pa-0">
                <v-responsive :aspect-ratio="1/1" class="text-center">
                    <v-btn outlined block tile max-width="100%" min-height="100%">
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
        name: "Selector"
    }
</script>
