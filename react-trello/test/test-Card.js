var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();
var React = require('react');

var Card = require('../components/Card');

describe('Card component', function() {
    var result;
    var cards = [{
        person: "Angie",
        task: "Task One",
        dueDate: "ASAP"
    },
    {
        person: "Angie",
        task: "Task Two",
        dueDate: "ASAP"
    },
    {
        person: "Angie",
        task: "Task Three",
        dueDate: "ASAP"
    }]
    before(function(){
        var renderer = TestUtils.createRenderer();
        renderer.render(<Card task ={cards.task} person = {cards.person} dueDate = {cards.dueDate} />);
        result = renderer.getRenderOutput();
    })
    it('Renders Card', function(){
        console.log(result)
        result.props.className.should.equal('card')
        result.props.children.length.should.equal(cards.length)
        var div = result.props.children[1];
        div.type.should.equal('div');
    }) 
})