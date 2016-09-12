var unirest = require('unirest');
var express = require('express');
var events = require('events');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};
var app = express();
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        var artist = item.artists.items[0];
        res.json(artist);
    });

    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.get('/artists/{id}/related-artists/:name', function(req,res){
    var relatedArtist = getFromApi('artists', {
        id: 'id'
    });
    relatedArtist.on('end', function(artist){
        var artistsRelated = artist.artistsRelated.id;
        res.json(artistsRelated);
    });
     relatedArtist.on('error', function(code) {
        res.sendStatus(code);
    });
});


app.get('artists/{id}/top-tracks/:name', function(req, res) {
    var topTracks = getFromApi('tracks', {
        q: 'country'
    
        
    });

    topTracks.on('end', function(tracks) {
        var artist = tracks.artists.country;
        res.json(topTracks);
    });

    topTracks.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(process.env.PORT || 8080);
