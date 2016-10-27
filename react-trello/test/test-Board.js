var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();
var React = require('react');

var Board = require('../components/Board');

describe('Board component', function() {
    var result;
    var title = "Sample Board"
    var lists = ["Beginning", "Intermediate", "Expert"]
    before(function(){
        var renderer = TestUtils.createRenderer();
        renderer.render(<Board title={title} lists={lists} />);
        result = renderer.getRenderOutput();
    })
    it('Renders the Board with a Title',  function() {
        result.props.children[0].props.children.should.equal(title)
    });
    it('Renders Board with a ListContainer', function(){
        result.props.children[1].length.should.equal(lists.length)
        
    })
})