global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


 describe('Shopping List', function() {
    
    before(function(done) {
       
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });

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
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
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
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Kale');
                    
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
         var results = []
         before(function(done){
             
             chai.request(app)
            .get('/items')
            .end(function(err, res) {
                results = res.body
                
                done()
               
            });
         }) 

        it('should edit an item on PUT', function(done) {
            
            chai.request(app)
                .put('/items/' + results[0]._id)
                .send({
                    'name': 'Beans',
                    '_id': results[0]._id
                })
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Beans');
                    
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
                .put('/items/' + results[0]._id)
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
                .put('/items/57c6f3b27f5e25a11dff9441')
                .send({
                    'name': 'Kale',
                    _id: '57c6f3b27f5e25a11dff9441'
                })
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Kale');
                    res.body._id.should.equal('57c6f3b27f5e25a11dff9441')
                    
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
                .delete('/items/57c6f3b27f5e25a11dff9441')
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    

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