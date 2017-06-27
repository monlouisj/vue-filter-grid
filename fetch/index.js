var api = require("spotify-web-api-node"),
conf = require('../config.js'),
fs = require('fs');

const SAVE_TO = conf.json_dir;
const LIMIT = 100;

var spotifyApi = new api({
  clientId : conf.clientId,
  clientSecret : conf.clientSecret,
  redirectUri : conf.redirectUri
});

var mytracks = [];
var counter = 0;
var all_playlists = conf.playlists;
var playlist_id = all_playlists.pop();

var fetch = function(_offset){
  return spotifyApi.getPlaylistTracks(conf.myId,playlist_id,{offset: _offset,limit:LIMIT})
  .then(function(data) {
    try {
      var tracks = data.body.items;
      var total = data.body.total;
      var next = data.body.next;
    } catch (e) {
      throw new Error(e);
    }

    var offset = 0;
    if (next){
      var matches = next.match(/offset=\d{1,}/);
      var offset_str = matches[0];
      var offset = offset_str.split('=');
      offset = offset.length == 2 ? offset[1] : null;
    }

    var list = tracks.map(function(t){
      var artists = t.track.artists.map((a)=>a.name).join(' - ');
      var img = t.track.album.images.length ? t.track.album.images[0]: null;
      return {
           name: t.track.name,
           artist: artists,
           album: t.track.album.name,
           img: img
        };
      }
    );
    mytracks = mytracks.concat(list);

    if(total == mytracks.length){

      fs.writeFileSync(SAVE_TO + '/playlist-' + playlist_id + '.json', JSON.stringify(mytracks));
      mytracks = [];
      counter = 0
      playlist_id = all_playlists.pop();
      if(playlist_id) {
        fetch(0);
      }else{
        return;
      }

    }else{
      counter++;
      console.log('Playlist :'+playlist_id+'. Iteration: '+counter+'. Restart at offset: ',offset);
      fetch(offset);
    }
  })
  .catch(function(err) {
    console.log('Something went wrong', err.message);
  });;
}

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
.then(function(data) {
  console.log('The access token expires in ' + data.body['expires_in']);
  console.log('The access token is ' + data.body['access_token']);

  // Save the access token so that it's used in future calls
  spotifyApi.setAccessToken(data.body['access_token']);
})
.then(function() {
  fetch(0);
});
