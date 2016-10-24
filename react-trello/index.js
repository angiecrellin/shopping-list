var React = require('react');
var ReactDOM = require('react-dom');



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
        var classes = 'card ' + (this.state.highlight ? 'highlight' : '');
        return (
            <div className={classes} onClick={this.onClick}>
                <div className="card-task">{this.props.task}</div>
                <div className="card-person">{this.props.person}</div>
                <div className="card-dueDate">{this.props.dueDate}</div>
            </div>
        );
    }
});


var List = React.createClass({
    onAddSubmit: function(event){
        event.preventDefault();
        this.props.onAddSubmit();
    },
    
    render: function() {
        return (
            <div className="list">
                {this.props.cards.map(function(card, i){
                    return (<Card task={card.task} person={card.person} dueDate={card.dueDate} key={i} />)
                
                },this)}
                <form onSubmit={this.onAddSubmit}>  <input type="text" onChange={this.props.onAddInputChanged}/>
                        <button>Submit</button>
                        
                </form>
            </div>
            
            
        );
    }
});


List.defaultProps={
    onAddInputChanged:function(){
    
    },
    onAddSubmit: function(){
        
    }
    
};

var ListContainer = React.createClass({
    getInitialState: function(){
        return {
            text:"",
            cards:[]
        }
    },
    onListAddInputChanged: function(event){
        this.setState({text:event.target.value})
    },
    onListAddSubmit: function(){
        var newCards = this.state.cards
        newCards.push({
            task: this.state.text,
            person: "Angie",
            dueDate: "ASAP"
            
        })
        this.setState({
            cards:newCards,
            text: ""
        })
    },
    render: function(){
        return (
            <List cards={this.state.cards} onAddInputChanged={this.onListAddInputChanged} onAddSubmit={this.onListAddSubmit} />
            )
    }
    
    
})


var Board = React.createClass({
    
    render: function() {
        return (
            <div className="board">
                {this.props.title}
                {this.props.lists.map(function(title,i){
                    return (<ListContainer title={title} key={i} />)
                
                },this)}
                
            </div>
        );
    }
});


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Board title="Beginner" lists={["Beginning", "Intermediate", "Expert"]} />, document.getElementById('app'));
});

