var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./components/Board')





document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Board title="Beginner" lists={["Beginning", "Intermediate", "Expert"]} />, document.getElementById('app'));
});

