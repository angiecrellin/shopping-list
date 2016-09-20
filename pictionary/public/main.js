/* global $ */

$(document).ready(function() {
var socket = io();
var drawing = null;
var words = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];

var getRandomWord = function () {
    return words[Math.floor(Math.random() * words.length)];
};

var word = getRandomWord();

console.log(word);

$('#randomWord').text(word)

// first person to connect is drawer, everyone else connected is a guesser


var pictionary = function() {
    var canvas, context;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousedown', function(){
         drawing === true;
    });
    canvas.on('mouseup', function(){
         drawing === false;
    });
    canvas.on('mousemove', function(event) {
        if (drawing === true) {
        }
        socket.emit('drawing', position);
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        socket.on('drawing', function(){
            draw(position);
        });
        
    });
    
    var guessBox;


    var onKeyDown = function(event) {
    if (event.keyCode != 13) { 
        return;
    }
    socket.on('guess',function(guess){
        console.log(guess);
    });
    
    function addGuessToList () {
    var guessList = guessBox.val();
    $('#guesses').append('<li>'+ guessList + '</li>')

    }

    console.log(guessBox.val());
    guessBox.val('');
    addGuessToList();
    
    };

    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);
    
    };
    pictionary();
});
