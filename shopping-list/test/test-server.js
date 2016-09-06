var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;


chai.use(chaiHttp);




 describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
     });

     describe('POST', function() {

        it('should add an item on POST', function(done) {
            chai.request(app)
                .post('/items')
                .send({
                    'name': 'Kale'
                })
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id');
                    res.body.name.should.be.a('string');
                    res.body.id.should.be.a('number');
                    res.body.name.should.equal('Kale');
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    storage.items[3].should.be.a('object');
                    storage.items[3].should.have.property('id');
                    storage.items[3].should.have.property('name');
                    storage.items[3].id.should.be.a('number');
                    storage.items[3].name.should.be.a('string');
                    storage.items[3].name.should.equal('Kale');
                    done();
                });
         });

        it('should return an error when posting to id that exists', function(done) {
            chai.request(app)
                .post('/items/0')
                .send({
                    'name': 'Kale'
                })
                .end(function(err, res) {


                    res.should.have.status(404);

                    done();
                });
        });

        it('should return an error when post without body data', function(done) {
            chai.request(app)
                .post('/items')

            .end(function(err, res) {


                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('no data sent');


                done();
            });
        });

        it('should return an error if not valid JSON', function(done) {
            chai.request(app)
                .post('/items')
                .send('{"name":"kale"}')
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.message.should.equal('no data sent')
                    done();
                });
        });


    });




     describe('PUT', function() {

        it('should edit an item on PUT', function(done) {
            chai.request(app)
                .put('/items/0')
                .send({
                    'name': 'Beans',
                    'id': 0
                })
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id');
                    res.body.name.should.be.a('string');
                    res.body.id.should.be.a('number');
                    res.body.name.should.equal('Beans');
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    storage.items[0].should.be.a('object');
                    storage.items[0].should.have.property('id');
                    storage.items[0].should.have.property('name');
                    storage.items[0].id.should.be.a('number');
                    storage.items[0].name.should.be.a('string');
                    storage.items[0].name.should.equal('Beans');
                    done();
                });

        });

        it('should return an error if endpoint without id', function(done) {
            chai.request(app)
                .put('/items')
                .send({
                    'name': 'Beans'
                })
                .end(function(err, res) {
                    res.should.have.status(404);
                    done();
                });


        });

        it('should return an error if id in endpoint is not equal to id in body', function(done) {
            chai.request(app)
                .put('/items/0')
                .send({
                    'name': 'Beans',
                })
                .end(function(err, res) {

                    res.should.have.status(400);
                    res.body.message.should.equal('id does not match')
                    done()
                });

        });

        it('should return an error if not valid JSON', function(done) {
            chai.request(app)
                .put('/items/0')
                .send('{"name":"kale"}')
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.message.should.equal('no data sent')
                    done();
                });
        });

        it('should create if id does not exist', function(done) {
            chai.request(app)
                .put('/items/8')
                .send({
                    'name': 'Kale',
                    id: 8
                })
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id');
                    res.body.name.should.be.a('string');
                    res.body.id.should.be.a('number');
                    res.body.name.should.equal('Kale');
                    res.body.id.should.equal(8)
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(5);
                    storage.items[4].should.be.a('object');
                    storage.items[4].should.have.property('id');
                    storage.items[4].should.have.property('name');
                    storage.items[4].id.should.be.a('number');
                    storage.items[4].name.should.be.a('string');
                    storage.items[4].name.should.equal('Kale');
                    storage.items[4].id.should.equal(8);
                    done();
                });
        });

        it('should return an error if request without body data', function(done) {
            chai.request(app)
                .put('/items/0')
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.message.should.equal('no data sent')

                    done();
                });
        });


     });





     describe('DELETE', function() {

        it('should delete an item on DELETE', function(done) {
            chai.request(app)
                .delete('/items/1')
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    storage.items[1].should.be.a('object');
                    storage.items[1].should.have.property('id');
                    storage.items[1].id.should.be.a('number');
                    storage.items[1].id.should.not.equal(1);

                    done();
                });

        });

        it('should return an error when id does not exist', function(done) {
            chai.request(app)
                .delete('/items/10')
                .end(function(err, res) {

                    res.should.have.status(404);
                    res.should.be.json;

                    res.body.message.should.equal('id does not exist')


                    done();
                });

        });

        it('should return an error if endpoint without id', function(done) {
            chai.request(app)
                .delete('/items')
                .send({
                    'name': 'Beans'
                })
                .end(function(err, res) {
                    res.should.have.status(404);
                    done();
                });

        });

    })



 });