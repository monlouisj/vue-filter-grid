var Vue = require('vue/dist/vue.js'),
Vuex = require('vuex'),
config = require('../../public_config'),
axios = require('axios');

Vue.use(Vuex);

var _pLists = {};
config.playlists.forEach(id => _pLists[id] = []);

module.exports = new Vuex.Store({
  state:{
    isLoading: false,
    playlists: _pLists,
    playlist_idx : config.playlists[0],
    tracks: [],
    byArtist: '',
    byName: '',
    byAlbum: '',
    per_page: 20,
    pages_count: 0,
    page_idx: 0
  },
  actions:{
    getTracks(context){
      if(typeof context.playlists[context.playlist_idx] === "undefined") return false;
      var all_tracks = context.playlists[context.playlist_idx];
      var trax = all_tracks.slice(context.page_idx, context.pages_count);
      context.commit('setTracks', {tracks: trax});
    },
    fetchData: function(context){
      var url = "".concat('json/playlist-',context.playlist_idx,'.json');

      //fetch json data
      axios.get(url)
      .then(response => {
        if(typeof response.data !== "object") throw new Error('data undefined');
        context.commit('setResults', {tracks: response.data});
      })
      .catch(function (error) {
        throw new Error('xhr error');
      });
    }
  },
  mutations:{
    showLoadMask: (state) => state.isLoading = true,
    hideLoadMask: (state) => state.isLoading = false,
    setResults: (state, arg) => {
      var playlist_id = state.playlist_idx;
      state.playlists[playlist_id] = arg.tracks;
    },
    updateFilter:(state, arg) => state[arg.field] = arg.val,
    setTracks: (state,arg) => state.tracks = arg.tracks
  }
});
