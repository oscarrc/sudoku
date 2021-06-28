import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    themes: {
        light: {
            primary: '#CF1920',
            secondary: '#f78e1e',
            accent: '#882528',
            error: '#b71c1c',
        },
        dark: {
            primary: '#3f51b5',
            secondary: '#f78e1e',
            accent: '#8c9eff',
            error: '#b71c1c',
        }
    }
});