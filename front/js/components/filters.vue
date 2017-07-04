<template>
<div class="form">
  <div class="form-group">
    <label>Playlist</label>
    <select class="form-control" v-model="playlist_idx">
      <option v-for="(p,id) in playlists" :value="id">{{p.name}}</option>
    </select>
  </div>
  <div class="form-group">
    <label>Search by artist</label>
    <input class="form-control" type="text" placeholder="artist" v-model="byArtist"/>
  </div>
  <div class="form-group">
    <label>Search by name</label>
    <input class="form-control" type="text" placeholder="name" v-model="byName"/>
  </div>
  <div class="form-group">
    <label>Search by album</label>
    <input class="form-control" type="text" placeholder="album" v-model="byAlbum"/>
  </div>
  <div class="row">
    <div class="col-8">
      <div class="form-group">
        <label>Sort By</label>
        <select class="form-control" v-model="sort_by">
          <option value="artist">Artist name</option>
          <option value="name">Track name</option>
          <option value="album">Album name</option>
        </select>
      </div>
    </div>
    <div class="col-4">
      <div class="form-group">
        <label>Direction</label>
        <select class="form-control" v-model="sort_order">
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label>Items per page</label>
    <select class="form-control" v-model="per_page">
      <option value="12">12</option>
      <option value="24">24</option>
      <option value="60">60</option>
    </select>
  </div>
  <button type="button" class="btn btn-primary" @click="submit">Search</button>
  <button type="button" class="btn btn-info" @click="reset">Reset</button>
</div>
</template>

<script>
import store from '../store.js';
export default {
  name: 'Filters',
  store,
  computed: {
    sort_by:{
      get(){
        return this.$store.state.sort_by
      },
      set(v){
        this.$store.commit('updateFilter',{field:'sort_by', val: v});
      }
    },
    sort_order:{
      get(){
        return this.$store.state.sort_order
      },
      set(v){
        this.$store.commit('updateFilter',{field:'sort_order', val: v});
      }
    },
    playlists(){ return this.$store.state.playlists },
    playlist_idx:{
      get(){
        return this.$store.state.playlist_idx;
      },
      set(v){
        this.$store.commit('updateFilter',{field:'playlist_idx', val: v})
      }
    },
    per_page: {
      get:function(){
        return this.$store.state.per_page;
      },
      set:function(v){
        this.$store.commit('updateFilter',{field:'per_page', val: v})
      }
    },
    byArtist: {
      get:function(){
        return this.$store.state.byArtist;
      },
      set:function(v){
        this.$store.commit('updateFilter',{field:'byArtist', val: v})
      }
    },
    byName: {
      get:function(){
        return this.$store.state.byName;
      },
      set:function(v){
        this.$store.commit('updateFilter',{field:'byName', val: v});
      }
    },
    byAlbum: {
      get:function(){
        return this.$store.state.byAlbum;
      },
      set:function(v){
        this.$store.commit('updateFilter',{field:'byAlbum', val: v});
      }
    }
  },
  methods:{
    submit(){
      this.$store.dispatch('filterUpdate');
    },
    reset(){
      ['byArtist','byName','byAlbum'].forEach(function(f){
        this.$store.commit('updateFilter',{field:f, val: ''});
      }.bind(this));
    }
  }
}
</script>
