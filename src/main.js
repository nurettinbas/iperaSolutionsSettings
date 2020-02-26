import Vue from 'vue'
import App from './App.vue'

require('bootstrap');
window.axios = require('axios');
require('../node_modules/bootstrap/dist/css/bootstrap.css');
var _ = require('lodash');

new Vue({
  el: '#app',
  render: h => h(App)
})
