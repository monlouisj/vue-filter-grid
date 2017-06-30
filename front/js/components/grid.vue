<template>
<div class="loadmask" v-if="isLoading">
  <p>...</p>
</div>
<div class="row" v-else>
  <div class="col-xs-12 col-sm-2" v-for="(trk,y) in tracks">
    <div class="card card-inverse">
      <img class="card-img img-fluid" :src="trk.img.url" :alt="trk.name">
      <div class="card-img-overlay">
        <h4 class="card-title">{{trk.name|wrap}}</h4>
        <p class="card-text">{{trk.artist|wrap}}</p>
        <p class="card-text"><small class="text-muted">{{trk.album|wrap}}</small></p>
      </div>
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
