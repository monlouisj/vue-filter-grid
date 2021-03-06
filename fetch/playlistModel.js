var playlistModel = function(override){
  var props = {
    name:"",
    albums_count: 0,
    tracks: []
  };

  for (var prop in override) {
    if (props.hasOwnProperty(prop)) {
      props[prop] = override[prop];
    }
  }
  return props;
}

module.exports = playlistModel;
