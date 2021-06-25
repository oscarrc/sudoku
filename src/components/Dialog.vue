<template>
    <v-dialog :value="true" persistent max-width="350">
        <v-card>
            <v-card-title class="text-h5 justify-center">
                CONGRATULATIONS
            </v-card-title>
            <v-card-text>
                <p class="my-1 text-center">You've solved this {{ levels[level -1 ] }} level sudoku in <span class="subtitle-2">{{ time | format }}</span></p>
                <p class="my-1 text-center">Enter your details below to sumit your time</p>
                <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="username"
                        :rules="usernameRules"
                        label="Username"
                        @keyup="error = false"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        @keyup="error = false"
                        required
                    ></v-text-field>
                    <span v-if="error" class="caption red--text">Username aleready exists and doesn't match email</span>
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
  import supabase from '@/lib/supabase'

  export default {
    name: 'Dialog',
    data(){
        return {
            levels: ['easy', 'medium', 'hard'],
            valid: true,
            loading: false,
            error: false,
            username: '',
            usernameRules: [
                v => !!v || "Username is required",
                v => (v && v.length >= 3 && v.length <= 15) || "Must be between 3 and 15 characters",
                v => !/ +/.test(v) || 'Must not have any spaces',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        }
    },
    computed: {
        ...mapState(['level', 'time']),
        ...mapGetters(['solved'])
    },
    methods: {
        async submit(){            
            this.loading = true;

            if(this.$refs.form.validate()){
                let { data: times } = await supabase.from('times').select('*').eq('username', this.username);

                if(times.length > 0 && times[0].email != this.email){
                    this.error = true;
                }else{
                    await supabase.from('times').insert([
                        {
                            username: this.username,
                            email: this.email,
                            level: this.level,
                            time: this.time
                        }
                    ]) 

                    this.$router.push('/');
                }              
            } 
                                    
            this.loading = false;             
        },
        cancel(){
            this.$router.push('/')
        }
    }
  }
</script>
