var React = require('react');
var List = require('./List')

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

module.exports=ListContainer