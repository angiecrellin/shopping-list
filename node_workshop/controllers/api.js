const path = require('path');
const fs = require('fs');
function getDinosaurs(cb) {
    var filename = path.join(
        __dirname,
        '../data/dinosaurs.json')

fs.readFile(filename,function(err,data) {
    if (err) {
        throw err;
    }
    
    var dinosaurs = JSON.parse(data);
    cb(dinosaurs);
});
}
    
exports.all = function(req, res) {
    getDinosaurs(function (dinos) {
        res.json(dinos);
        
    });
}

exports.getDino = function(req, res) {
    getDinosaurs(function(dinos) {
        var dino = req.params.id;
        res.send(dinos.dinosaurs[id]);
    })
}