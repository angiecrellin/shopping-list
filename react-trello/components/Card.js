var React = require('react');

var Card = React.createClass({
    getInitialState: function() {
        return {
            highlight: false
        };
    },
    onClick: function() {
        this.setState({
            highlight: !this.state.highlight
        });
    },
    render: function() {
        var classes = 'card' + (this.state.highlight ? 'highlight' : '');
        return (
            <div className={classes} onClick={this.onClick}>
                <div className="card-task">{this.props.task}</div>
                <div className="card-person">{this.props.person}</div>
                <div className="card-dueDate">{this.props.dueDate}</div>
            </div>
        );
    }
});

module.exports=Card