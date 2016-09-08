var stream = require('stream');

function Numbers(options) {
    stream.Readable.call(this, options);
    this._start = 1;
    this._end = 100;
    this._curr=this._start


};
Numbers.prototype = Object.create(stream.Readable.prototype);
Numbers.prototype.constructor = Numbers;

Numbers.prototype.getRandom = function() {
    return Math.floor(Math.random() * 500);
}

/*Numbers.prototype._read = function() {
    var number = (this._curr);
    var buf = new Buffer(number, 'utf8');
    this.push(buf);
    this._curr++;
    //  if (number ){
        
    // }
    
    if (number === this._end) {
        this.push(null);
     }
};*/

Numbers.prototype._read = function() {
    var number = (this.getRandom());
    console.log('number',number);
    if (number <100){
        var buf = new Buffer(number, 'utf8');
    this.push(buf);
    
      
    }
   
    else if (this._curr === this._end) {
        this.push(null);
    }
    else {
        var buf = new Buffer('invalid', 'utf8');
        this.push(buf)
    }
    this._curr++;
    
    
    
    
};
module.exports = Numbers