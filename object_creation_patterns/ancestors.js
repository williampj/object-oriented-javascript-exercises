Ancestors

Implement an ancestors method that returns the prototype chain (ancestors) of a calling object
as an array of object names. Here's an example output:

// name property added to make objects easier to identify
const foo = { name: 'foo' };
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
console.log(foo.ancestors()); // returns ['Object.prototype']

--------------- My Solution ----------

foo.ancestors = function(array = []) {
  const ancestorAry = array;
  const proto = Object.getPrototypeOf(this);
  if (proto.name === undefined) {
    ancestorAry.push('Object.prototype');
    return ancestorAry;
  }
  ancestorAry.push(proto.name);
  return this.ancestors.call(proto, ancestorAry);
};

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
console.log(foo.ancestors()); // returns ['Object.prototype']

---------- LS Solution --------

Good, but problematic to monkey-patch built-in objects, especially Object which is read-only in node. 

Object.prototype.ancestors = function ancestors() {
  var ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
};

--------- Discussion ----------

The problem lends itself well to a recursive solution. 
The resulting array is incrementally built by recursively calling on the Object.prototype.ancestors method. 
The base case is when ancestor does not have a name property anymore because it means that ancestor is Object.prototype already. 
When this is the case, there are no more prototype objects to add. 

The key for this solution is recognizing that the value of this is the calling object and 
that we have to add the ancestors method on Object.prototype so that all objects have access to it.

Be mindful when adding methods to built-in Objects (e.g, String.prototype, Object.prototype. 
It may lead to confusing code and can have unintended consequences.

---------- Student solutions -------

1) simple, elegant recursion 

Object.prototype.ancestors = function ancestors() {
  var ancestor = Object.getPrototypeOf(this);
  if (ancestor.name === undefined) return ['Object.prototype'];
  return [ancestor.name].concat(ancestor.ancestors());
};

//

2) awesome solution with a closure, an IIFE and a recursion :

Object.prototype.ancestors = function () {
  var familyTree = []; // the IIFE function has a closure on this variable
  (function searchAncestors(obj) { // named anonymous function to use in a recursion
    let proto = Object.getPrototypeOf(obj);
    if (!proto) return;
    familyTree.push(proto);
    searchAncestors(proto);
  }(this)); // as a method, this will points to the receiver
  return familyTree;
}


//

3) while loop and map function 

Object.prototype.ancestors = function(){
  var result = [];
  var parent = Object.getPrototypeOf(this);
  while(parent){
      result.push(parent);
      parent = Object.getPrototypeOf(parent);
  }
  return result.map(function(ele){
      return ele.name ? ele.name : 'Object.prototype';
  });
}

// 

4) similar to 3)

Object.prototype.ancestors = function() {
  var array = [];
  var parent = Object.getPrototypeOf(this);

  while (parent) {
    array.push(parent.name || 'Object.prototype');
    parent = Object.getPrototypeOf(parent);
  }

  return array;
};

//

5) interesting use of for loop solution 
Since it's a method can be called on any objects
so we can defined it on Object.prototype

- No matter how long the inheritance chain is, the Object.prototype is always at the top, so the original result array contains it
- Since it returns ancestor objects from bottom to top
  - so we can use a loop to go upstream one object at a time and see if there is a name property
    - set a variable self to store current calling object(this)
    - if current calling object's prototype object has a name property: push it into the result array
    - if it doesn't: exit loop
    - update self to current object's __proto__(one step up to the chain)

Object.prototype.ancestors = function() {
  let ancestors = ['Object.prototype'];

  for(let self = this; self.__proto__.name; self = self.__proto__) {
    ancestors.unshift(self.__proto__.name);
  };

  return ancestors;
}

Rigorously we should use Object.getPrototypeOf().




