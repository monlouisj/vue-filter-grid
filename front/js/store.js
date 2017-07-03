var Vue = require('vue/dist/vue.js'),
Vuex = require('vuex'),
config = require('../../public_config'),
axios = require('axios'),
linq = require('linq-es2015'),
playlistModel = require('../../fetch/playlistModel.js'),
imagesLoaded = require('imagesLoaded');

Vue.use(Vuex);

var _playLists = {};
config.playlists.forEach(id => _playLists[id] = new playlistModel({name:"", tracks:[]}));

module.exports = new Vuex.Store({
  state:{
    isLoading: false,
    playlists: _playLists,
    playlist_idx : config.playlists[0],
    filtered: [],
    tracks: [],
    byArtist: '',
    byName: '',
    byAlbum: '',
    per_page: 24,
    page_idx: 0
  },
  actions:{
    fetchData: function(context){
      context.commit('isLoading',{on:true});
      var url = "".concat('json/playlist-',context.state.playlist_idx,'.json');

      //fetch data
      return axios.get(url)
      .then((response) => {
        if(typeof response.data !== "object") throw new Error('data undefined');
        context.commit('setResults', { tracks: response.data.tracks, name: response.data.name });
        context.commit('isLoading',{on:false});
      })
      .catch(function (error) {
        throw new Error('xhr error');
      });
    },
    filterUpdate(context){
      if(typeof context.state.playlists[context.state.playlist_idx] === "undefined") return false;
      var all_tracks = context.state.playlists[context.state.playlist_idx].tracks;

      var query = linq.asEnumerable( all_tracks );

      //filter by artist name
      var byArtist = context.state.byArtist;
      if(byArtist.length){
        query = query.where((t)=> t.artist.match(new RegExp(byArtist,'i')));
      }

      //filter by track name
      var byName = context.state.byName;
      if(byName.length){
        query = query.where((t)=> t.name.match(new RegExp(byName,'i')));
      }

      //filter by album
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
    //tracks on screen, after we have applied filters but no pagination
    setFiltered(state, arg){
      state.filtered = arg.filtered;
    },
    //tracks on screen, after we have applied filters and pagination
    setTracks(state, arg){
      state.tracks = arg.tracks;
      //show load mask while images load
      state.isLoading = true;
      imagesLoaded(config.mainEl,() => state.isLoading = false);
    },
    setResults(state, arg){
      var playlist_id = state.playlist_idx;
      state.playlists[playlist_id].tracks = arg.tracks;
      state.playlists[playlist_id].name = arg.name;
    },
    //update filters and pagination parameters
    updateFilter: (state, arg) => state[arg.field] = arg.val,
    //toggle loadmask
    isLoading: (state,arg) => state.isLoading = arg.on
  }
});
