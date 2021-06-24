<template>
    <v-dialog :value="solved" persistent max-width="350">
        <v-card>
            <v-card-title class="text-h5 justify-center">
                CONGRATULATIONS
            </v-card-title>
            <v-card-text>
                <p class="my-1 text-center">You've solved this {{ levels[level -1 ] }} level sudoku in <span class="subtitle-2">{{ timer }}</span></p>
                <p class="my-1 text-center">Enter your details below to sumit your time</p>
                <v-form class="mt-2" ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="username"
                        :rules="usernameRules"
                        label="Username"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="cancel" :disabled="loading">
                    Cancel
                </v-btn>
                <v-btn color="primary" text @click="submit" :loading="loading" :disabled="loading">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'Dialog',
    data(){
        return {
            levels: ['easy', 'medium', 'hard'],
            valid: true,
            loading: false,
            username: '',
            usernameRules: [
                v => !!v || "Username is required",
                v => (v && v.length >= 3) || "Must be at least 3 characters"
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        }
    },
    computed: {
        ...mapState(['level']),
        ...mapGetters(['solved', 'timer'])
    },
    methods: {
        submit: function(){
            this.$router.push('/')
        },
        cancel: function(){
            this.$router.push('/')
        }
    }
  }
</script>
