<template>
<div class="form">
  <div class="form-group">
    <label>Playlist</label>
    <select class="form-control" v-model="playlist_idx">
      <option v-for="id in playlists_ids" :value="id">{{id}}</option>
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
  <div class="form-group">
    <label>Items per page</label>
    <select class="form-control" v-model="per_page">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  </div>
  <button type="button" class="btn btn-primary" @click="reFetch">Refresh</button>
</div>
</template>

<script>
import store from '../store.js';
export default {
  name: 'Filters',
  store,
  computed: {
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
    playlists_ids(){
      return Object.keys(this.$store.state.playlists);
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
    reFetch:function(){
      this.$store.dispatch('fetchData');
    }
  }
}
</script>
