var React = require('react');
var ListContainer = require('./ListContainer')

var Board = React.createClass({
    
    render: function() {
        return (
            <div className="board">
                <h1>{this.props.title}</h1>
                {this.props.lists.map(function(title,i){
                    return (<ListContainer title={title} key={i} />)
                
                },this)}
                
            </div>
        );
    }
});

module.exports=Board