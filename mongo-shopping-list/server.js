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

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});
 app.put('/items/:id', function(request, response) {
    var item = request.body;
    var itemIndex = Item.getIndexById(request.params.id)

    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }
    
    else if (item.id !== Number(request.params.id)) {
        return response.status(400).json({
            message: 'id does not match'
        });

    }
    item.id = Number(request.params.id)


    Item.put(item);
    if (itemIndex === -1) {
         return response.status(201).json(item);

     }
    

    response.status(200).json(item);
})
 
 
 
 app.delete('/items/:id', function(request, response) {

    var itemIndex = Item.getIndexById(request.params.id);
    if (itemIndex === -1) {
        
        return response.status(404).json({
            message: 'id does not exist'
        });
    }
    Item.delete(request.params.id);


    response.status(200).json({});

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