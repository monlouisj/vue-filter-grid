<template>
  <div class="">
    <ul>
      <li @click="goTo1st"> << </li>
      <li v-for='n in pages_count' @click="goTo(n)" :class="{active: n==page_idx}">{{n+1}}</li>
      <li @click="goToLast"> >> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  computed:{
    per_page: () => this.$store.state.per_page,
    pages_count: () => this.$store.state.pages_count,
    page_idx: () => this.$store.state.page_idx
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
