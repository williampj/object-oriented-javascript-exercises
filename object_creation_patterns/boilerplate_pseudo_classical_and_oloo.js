// pseudo-classical:

const PseudoClassical = function(firstArg, secondArg) {
  this.firstArg = firstArg;
  this.secondArg = secondArg;
};

PseudoClassical.prototype.printOut = function() {
  console.log(`${this.firstArg} ${this.secondArg}`);
};

const pseudoExample = new PseudoClassical("hello", "world");
pseudoExample.printOut(); // hello world

const OLOOPattern = {
  init(firstArg, secondArg) {
    this.firstArg = firstArg;
    this.secondArg = secondArg;
    return this;
  },
  printOut() {
    console.log(`${this.firstArg} ${this.secondArg}`);
  }
};

const OLOOExample = Object.create(OLOOPattern).init("hello", "world");
OLOOExample.printOut(); // hello world
