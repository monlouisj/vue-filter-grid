var Vue = require('vue/dist/vue.js'),
Vuex = require('vuex'),
config = require('../../public_config'),
axios = require('axios'),
linq = require('linq-es2015');

Vue.use(Vuex);

var _pLists = {};
config.playlists.forEach(id => _pLists[id] = []);

module.exports = new Vuex.Store({
  state:{
    isLoading: false,
    playlists: _pLists,
    playlist_idx : config.playlists[0],
    filtered: [],
    tracks: [],
    byArtist: '',
    byName: '',
    byAlbum: '',
    per_page: 20,
    page_idx: 0
  },
  actions:{
    fetchData: function(context){
      var url = "".concat('json/playlist-',context.state.playlist_idx,'.json');

      //fetch json data
      axios.get(url)
      .then((response) => {
        if(typeof response.data !== "object") throw new Error('data undefined');
        context.commit('setResults', {tracks: response.data});
      })
      .catch(function (error) {
        throw new Error('xhr error');
      });
    },
    filterUpdate(context){
      if(typeof context.state.playlists[context.state.playlist_idx] === "undefined") return false;
      var all_tracks = context.state.playlists[context.state.playlist_idx];

      var query = linq.asEnumerable( all_tracks );
      var byArtist = context.state.byArtist;
      if(byArtist.length){
        query = query.where((t)=> t.artist.match(new RegExp(byArtist,'i')));
      }

      var byName = context.state.byName;
      if(byName.length){
        query = query.where((t)=> t.name.match(new RegExp(byName,'i')));
      }

      var byAlbum = context.state.byAlbum;
      if(byAlbum.length){
        query = query.where((t)=> t.album.match(new RegExp(byAlbum,'i')));
      }

      context.commit('setFiltered', {filtered: query.ToArray()});

      query = query.skip(context.state.page_idx*context.state.per_page).take(context.state.per_page);
      context.commit('setTracks', {tracks: query.ToArray()});

    }
  },
  mutations:{
    showLoadMask: (state) => state.isLoading = true,
    hideLoadMask: (state) => state.isLoading = false,
    setFiltered: (state, arg) => state.filtered = arg.filtered,
    setTracks: (state, arg) => state.tracks = arg.tracks,
    setResults: (state, arg) => {
      var playlist_id = state.playlist_idx;
      state.playlists[playlist_id] = arg.tracks;
    },
    updateFilter:(state, arg) => state[arg.field] = arg.val
  }
});
