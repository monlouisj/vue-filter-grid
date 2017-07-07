<template>
  <nav aria-label="Grid navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item"><a class="page-link" href="#" @click="goTo1st">First</a></li>
      <li v-for="n in pages_nums" class="page-item" :class="{active: n==page_idx}"><a class="page-link" href="#" @click="goTo(n)">{{n+1}}</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goToLast">Last</a></li>
    </ul>
    <p class="text-center">
      <small>{{filtered}} track{{filtered>1?'s':''}} found / {{albums}} albums</small>
    </p>
    <p class="text-center">
      <small>Total: {{total}} tracks</small>
    </p>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  computed:{
    albums(){
      return this.$store.state.playlists[this.$store.state.playlist_idx].albums_count;
    },
    total(){
      return this.$store.state.playlists[this.$store.state.playlist_idx].tracks.length;
    },
    filtered(){
      return this.$store.state.filtered.length;
    },
    per_page(){
      return this.$store.state.per_page
    },
    pages_nums(){
      var arr = [];
      for (var i = this.$store.state.page_idx-2; i < this.pages_count; i++) {
        if(i < 0) continue;
        arr.push(i);
        if(arr.length == 5) break;
      }
      return arr;
    },
    pages_count(){
      var len = this.$store.state.filtered.length;
      return Math.ceil(len/this.per_page);
    },
    page_idx(){
      return this.$store.state.page_idx;
    }
  },
  methods: {
    goTo(n){
      this.$store.commit('updateFilter',{field:'page_idx', val: n});
      this.$store.dispatch('filterUpdate');
    },
    goTo1st(){
      this.$store.commit('updateFilter',{field:'page_idx', val: 0});
      this.$store.dispatch('filterUpdate');
    },
    goToLast(){
      this.$store.commit('updateFilter',{field:'page_idx', val: this.pages_count-2});
      this.$store.dispatch('filterUpdate');
    }
  }
}
</script>
