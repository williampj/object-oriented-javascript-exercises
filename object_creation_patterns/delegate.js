Delegate

Write a delegate function that can be used to delegate the behavior of a method or function to another object's method.
delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object.
The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.

Note that this is not the same as using bind. bind returns a new function, whereas delegate maintains the reference.

Here's a sample run;

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  }
};

const baz = {
  qux: delegate(foo, 'bar', 'hello') // calls foo.bar('hello')
};

foo.bar('hello');
baz.qux(); // logs 'hello test';

foo.bar = function() {
  console.log('changed');
};

baz.qux(); // logs 'changed'

-------- My Solution ----------

function delegate(obj, method, ...args) {
  return function() {
    return obj[method](...args);
  };
}

-------- LS Solution -------

function delegate(context, methodName) {
  var args = Array.prototype.slice.call(arguments, 2)
  return function() {
    return context[methodName].apply(context, args); // ES6 means we don't need to use apply because we can use rest assignment on arrays 
  };
}

-------- Discussion ---------

The main challenge of this exercise is maintaining the reference to the function and its context. 
Our solution handles this by using the concept of closures so that we can return, and consequently assign to a method, 
a function that maintains a reference to the context object. 
Using the context and the method name, the solution then uses Function.prototype.apply to execute the method on the context object.

-------- Student solutions ------

dividing it up into steps: 

const delegate = (object, method, ...methodArgs) => {
  let context = object;
  const delegation = () => {
    let delegateTo = object[method];
    return delegateTo.apply(context, methodArgs); // allows to keep methodArgs as an array 
  }
  return delegation;
}

