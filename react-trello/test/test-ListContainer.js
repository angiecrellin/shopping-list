var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();
var React = require('react');

var ListContainer = require('../components/ListContainer');

describe('List Container component', function() {
    var result;
    var text = "Sample List"
    var card = []
    var list = " "
    before(function(){
        var renderer = TestUtils.createRenderer();
        renderer.render(<ListContainer list ={list} />);
        result = renderer.getRenderOutput();
    })
    it('Renders List Container with a List', function(){
        result.type.displayName.should.equal('List')
    }) 
})