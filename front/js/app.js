var config = require('../../public_config'),
Vue = require('vue/dist/vue.js'),
store = require('./store.js'),
Filters = require('./components/filters.vue'),
Grid = require('./components/grid.vue'),
Pagination = require('./components/pagination.vue'),
imagesLoaded = require('imagesloaded');

var ready = (fn) => document.readyState != 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

ready(function(){

var app = new Vue({
    el: '#app',
    store,
    components: {Filters, Grid, Pagination},
    created: function(){
      store.fetchData();
    }
  });
});
