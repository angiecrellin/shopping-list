var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();
var React = require('react');

var List = require('../components/List');

describe('List component', function() {
    var result;
    var text = "Sample card"
    var cards = [{
        name: "Angie",
        task: "Task One",
        dueDate: "ASAP"
    },
    {
        name: "Angie",
        task: "Task Two",
        dueDate: "ASAP"
    },
    {
        name: "Angie",
        task: "Task Three",
        dueDate: "ASAP"
    }]
    before(function(){
        var renderer = TestUtils.createRenderer();
        renderer.render(<List cards={cards} />);
        result = renderer.getRenderOutput();
    })
    it('Renders List with a Card', function(){
        result.props.children[0].length.should.equal(cards.length)
    }) 
    it('Renders even without cards', function(){
        var renderer = TestUtils.createRenderer();
        renderer.render(<List  />);
        result = renderer.getRenderOutput();
        result.props.children[0].length.should.equal(0)
        
    })
    
        
    
})

