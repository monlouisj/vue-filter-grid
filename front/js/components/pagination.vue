<template>
  <nav aria-label="Grid navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item"><a class="page-link" href="#" @click="goTo1st">First</a></li>
      <li v-for="n in pages_nums" class="page-item" :class="{active: n==page_idx}"><a class="page-link" href="#" @click="goTo(n)">{{n+1}}</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goToLast">Last</a></li>
    </ul>
  </nav>
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
