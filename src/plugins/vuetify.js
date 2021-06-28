import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#FFFFFF',
                secondary: '#f78e1e',
                accent: '#d11920',
                error: '#882528'
            },
            dark: {
                primary: '#FFFFFF',
                secondary: '#f78e1e',
                accent: '#d11920',
                error: '#b71c1c',
            }
        }
    }
});