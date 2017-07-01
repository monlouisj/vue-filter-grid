var config = require('../../public_config'),
Vue = require('vue/dist/vue.js'),
store = require('./store.js'),
Filters = require('./components/filters.vue'),
Grid = require('./components/grid.vue'),
Pagination = require('./components/pagination.vue')
;

var ready = (fn) => document.readyState != 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

ready(function(){
  Vue.filter('wrap', function(v){
      if(v.length > 40) v = v.substr(0,40).concat('...');
      return v;
  });

  var app = new Vue({
    el: config.mainEl,
    store,
    components: {Filters, Grid, Pagination},
    created: function(){
      this.$store.dispatch('fetchData').then(function(){
        this.$store.dispatch('filterUpdate');
      }.bind(this));
    }
  });
});
