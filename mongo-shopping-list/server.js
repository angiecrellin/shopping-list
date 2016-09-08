var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var Item = require('./models/item');

Item.prototype.put = function(item) {
    var index = this.getIndexById(item.id)
    if (index > -1) {
        this.items.splice(index, 1, item);
    }
    else {
        this.items.push(item)
    }
    return item;
};

Item.prototype.delete = function(id) {
    var index = this.getIndexById(id)
    if (index > -1) {
        this.items.splice(index, 1);
    }

};

Item.prototype.getIndexById = function(id) {
    var itemIndex = -1
    this.items.forEach(function(item, index) {
        if (item.id === Number(id)) {
            itemIndex = index
        }
    })
    return itemIndex;
};

app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/items', function(request, response) {
    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }
    Item.create({
        name: request.body.name
    }, function(err, item) {
        if (err) {
            return response.status(500).json({
                message: 'Internal Server Error'
            });
        }
        response.status(201).json(item);
    });
});
app.put('/items/:id', function(request, response) {
    
    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }
    else if (request.body._id !== (request.params.id)) {
        return response.status(400).json({
            message: 'id does not match'
        });
    }


    Item.findOneAndUpdate({
        _id: request.params.id
    }, {
        name: request.body.name
    }, {
        new: true,
        upsert: true,
    }, function(err, result) {
        if (err) {
            return response.status(404).json({
                message: 'id does not exist'
            });

        }
        
        response.status(200).json(result);

    });





})



app.delete('/items/:id', function(request, response) {

    Item.remove({
        _id: request.params.id
    }, function(err) {
        if (err) {
            return response.status(404).json({
                message: 'id does not exist'
            });

        }
        response.status(200).json({});

    });






});





app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

var runServer = function(callback) {
    
    mongoose.connect(config.DATABASE_URL, function(err) {
        
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;