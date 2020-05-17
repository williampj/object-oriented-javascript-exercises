// Algo:
// - loop
// - get prototype object
// - if prototype object is equal to base object
//   - add 'Object.prototype' and break
// - else
//   - add the name to the array
//   - set prototype to next prototype

Object.prototype.ancestors = function() {
  const ancestorAry = ['Object.prototype'];
  let prototype = Object.getPrototypeOf(this);
  while (prototype !== Object) {
    ancestorAry.unshift(prototype.name);
    console.log(prototype.name);
    prototype = Object.getPrototypeOf(prototype);
  }
  return ancestorAry;
};

const foo = { name: 'foo' };
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
// console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
// console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
// console.log(foo.ancestors()); // returns ['Object.prototype']
