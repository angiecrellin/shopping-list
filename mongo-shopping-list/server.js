var express = require('express');


var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};
Storage.prototype.delete = function(id) {
    var index = this.getIndexById(id)
    if (index > -1) {
        this.items.splice(index, 1);
    }

};

Storage.prototype.getIndexById = function(id) {
    var itemIndex = -1
    this.items.forEach(function(item, index) {
        if (item.id === Number(id)) {
            itemIndex = index
        }
    })
    return itemIndex;
};

Storage.prototype.put = function(item) {
    var index = this.getIndexById(item.id)
    if (index > -1) {
        this.items.splice(index, 1, item);
    }
    else {
        this.items.push(item)
    }
    return item;
};


var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(request, response) {

    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {

    var itemIndex = storage.getIndexById(request.params.id)
    if (itemIndex === -1) {
        
        return response.status(404).json({
            message: 'id does not exist'
        });
    }
    storage.delete(request.params.id);


    response.status(200).json({});

});

app.put('/items/:id', jsonParser, function(request, response) {
    var item = request.body;
    var itemIndex = storage.getIndexById(request.params.id)

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


    storage.put(item);
    if (itemIndex === -1) {
         return response.status(201).json(item);

     }
    

    response.status(200).json(item);
})


app.listen(process.env.PORT, process.env.IP);

exports.app = app;
exports.storage = storage;