<template>
<div class="">
  <label>Playlist</label>
  <select class="" v-model="state.playlist_idx">
    <option v-for="id in playlists_ids" :value="id">{{id}}</option>
  </select>

  <label>Artist</label>
  <input type="text" v-model="byArtist"/>
  <label>Name</label>
  <input type="text" v-model="byName"/>
  <label>Album</label>
  <input type="text" v-model="byAlbum"/>
  <button type="button" @click="reFetch">Refresh</button>
</div>
</template>

<script>
export default {
  name: 'Filters',
  computed: {
    playlists_ids: function(){this.$store.state.playlists.map((v,i)=>i)},
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
    },
  },
  methods:{
    reFetch:function(){
      this.$store.fetchData();
    }
  }
}
</script>
