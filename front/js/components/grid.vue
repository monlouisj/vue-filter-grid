<template>
<div class="loadmask" v-if="isLoading">
  <p class="text-center">Loading...</p>
</div>
<div class="all-col" v-else>
  <div class="card-columns">
    <div class="card" v-for="(trk,y) in tracks">
        <div class="card-block">
          <h4 class="card-title">{{trk.name|wrap}}</h4>
          <p class="card-text">{{trk.artist|wrap}}</p>
          <p class="card-text"><small class="">{{trk.album|wrap}}</small></p>
        </div>
        <img v-if="trk.img" class="card-img-bottom img-fluid" :src="trk.img.url" :alt="trk.name">
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
      return this.$store.state.tracks;
    }
  },
  methods:{}
}
</script>
