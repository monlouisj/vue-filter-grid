<template>
<div class="loadmask" v-if="isLoading">
  <p>...</p>
</div>
<div class="" v-else>
  <div class="" v-for="trk in tracks">
    <div class="track">
      <img :src="trk.img.url" :alt="trk.name">
      <p class="name">{{trk.name}}</p>
      <p class="artist">{{trk.artist}}</p>
      <p class="album">{{trk.album}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Grid',
  computed:{
    isLoading(){
      return this.$store.state.isLoading;
    },
    tracks(){
      if(typeof this.$store.state.playlists[this.$store.state.playlist_idx] === "undefined") return false;
      var all_tracks = this.$store.state.playlists[this.$store.state.playlist_idx];
      return all_tracks.slice(this.$store.state.page_idx, this.$store.state.per_page);
    }
  },
  methods:{}
}
</script>
