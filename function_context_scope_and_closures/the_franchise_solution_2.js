The Franchise - Solution 2

In the previous exercise, we had a situation where an anonymous method passed to map had an
undesirable execution context. We solved the problem by taking advantage of lexical scoping and
introducing a new variable self.

Solve the same problem again by passing a hard-bound anonymous function to map.

--------- My Solution -----------

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    const nameAndNumber = function(number) {
      return `${this.name} ${number}`;
    }.bind(this);
    return [1, 2, 3].map(nameAndNumber);
  }
};

-------- LS Solution ---------

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(
      function(number) {
        return this.name + " " + number;
      }.bind(this)
    );
  }
};

console.log(franchise.allMovies());

--------- Discussion --------

The two solutions provided for the same problem are both valid, usable solutions. 
That said, the map method and a few other methods on Array.prototype give us a 
convenient way to set the execution context of a callback: 
If you pass a second argument to these methods, it will be treated as the execution context of the passed in callback:

var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }, this);
  },
};

