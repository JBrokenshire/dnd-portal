import Vue from 'vue'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue"
import {ValidationObserver, ValidationProvider} from "vee-validate"
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'

// Bootstrap
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// Feather Icons
Vue.component(FeatherIcon.name, FeatherIcon)

// VeeValidate
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
