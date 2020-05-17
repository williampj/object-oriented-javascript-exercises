// pseudo-classical in an IIFE

const PseudoClassical = (function() {
  // statements, expressions, functions as part of closure
  return function(firstArg, secondArg) {
    this.firstArg = firstArg;
    this.secondArg = secondArg;
  };
})();

PseudoClassical.prototype.printOut = function() {
  console.log(`${this.firstArg} ${this.secondArg}`);
};

const pseudoExample = new PseudoClassical("hello", "world");
// pseudoExample.printOut(); // hello world

const OLOOPattern = (function() {
  // statements, expressions, functions as part of closure
  return {
    init(firstArg, secondArg) {
      this.firstArg = firstArg;
      this.secondArg = secondArg;
      return this;
    },
    printOut() {
      console.log(`${this.firstArg} ${this.secondArg}`);
    }
  };
})();

const OLOOExample = Object.create(OLOOPattern).init("hello", "world");
OLOOExample.printOut(); // hello world
