<template>
    <v-dialog :value="active">
    </v-dialog>
</template>

<script>
  export default {
    name: 'Selector',
    data(){
        return {
            active : false, 
            resolve: null
        };
    },
    props:[values],
    methods: {
        
    }
  }
</script>
