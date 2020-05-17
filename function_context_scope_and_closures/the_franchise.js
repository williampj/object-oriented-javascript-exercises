The Franchise

The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

Explain why this method will not return the desired object?
Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

var franchise = {
  name: "How to Train Your Dragon",
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + " " + number;
    });
  }
};

console.log(franchise.allMovies());
// => [ 'undefined 1', 'undefined 2', 'undefined 3' ]

--------- Solution ---------

Problem:
There is context loss when the map function is called. That callback set this to the global object
because inner functions do not retain the scope of their outer methods.

One solution is to set this to self and then use self inside the map function body.

const franchise = {
  name: "How to Train Your Dragon",
  allMovies() {
    const self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  }
};

------- LS Solution (same) ------
The current implementation will not work because this will be bound to the wrong object (window) 
when the anonymous function passed to map is invoked. 
We want to access the object franchise from within that anonymous function.

There are multiple ways to solve this problem but here we'll solve it by employing the lexical scoping of JavaScript 
to our advantage; specifically, the rule that a variable defined in an outer scope is available to an inner scope:

var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    var self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};