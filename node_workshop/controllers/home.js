const path = require('path');

module.exports.index = function(req, res) {
    var filename = path.join(
    __dirname,
    '../templates',
    'index.html')
    res.sendFile(filename);
};

   

exports.notFound = function(req, res){
    res.status(404);
    res.send('oops!');
};

exports.about = function(req, res){
    res.send('This is what we are about!')
};


exports.notFound = function(req, res){
    res.status(404);
    res.send('Oops!');
};