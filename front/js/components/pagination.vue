<template>
  <div class="">
    <ul>
      <li @click="goTo1st"> << </li>
      <li v-for='n in pages_nums' @click="goTo(n)" :class="{active: n==page_idx}">{{n+1}}</li>
      <li @click="goToLast"> >> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  computed:{
    per_page(){
      return this.$store.state.per_page
    },
    pages_nums(){
      var arr = [];
      for (var i = this.$store.state.page_idx; i < this.pages_count; i++) {
        arr.push(i);
        if(arr.length == 5) break;
      }
      return arr;
    },
    pages_count(){
      if(typeof this.$store.state.playlists[this.$store.state.playlist_idx] === "undefined") return false;
      var len = this.$store.state.playlists[this.$store.state.playlist_idx].length;
      return Math.ceil(len/this.per_page);
    },
    page_idx(){
      return this.$store.state.page_idx;
    }
  },
  methods: {
    goTo(n){
      this.$store.commit('updateFilter',{field:'page_idx', val: n});
    },
    goTo1st(){
      this.$store.commit('updateFilter',{field:'page_idx', val: 0});
    },
    goToLast(){
      this.$store.commit('updateFilter',{field:'page_idx', val: this.pages_count-1});
    }
  }
}
</script>
