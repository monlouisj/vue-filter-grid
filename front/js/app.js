var config = require('../../public_config'),
Vue = require('vue/dist/vue.js'),
store = require('./store.js'),
Filters = require('./components/filters.vue'),
Grid = require('./components/grid.vue'),
Pagination = require('./components/pagination.vue'),
imagesLoaded = require('imagesloaded');

var ready = (fn) => document.readyState != 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

ready(function(){
  Vue.filter('wrap', function(v){
      if(v.length > 80) v = v.substr(0,80).concat('...');
      return v;
  });

  var app = new Vue({
    el: '#app',
    store,
    components: {Filters, Grid, Pagination},
    created: function(){
      this.$store.dispatch('fetchData');
    }
  });
});
