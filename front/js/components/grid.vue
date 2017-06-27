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
    tracks (){
      return this.$store.state.tracks;
    }
  }
  methods:{}
}
</script>
