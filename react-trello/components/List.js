var React = require('react');
var Card = require('./Card')

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
        
    },
    cards: []
    
};

module.exports=List