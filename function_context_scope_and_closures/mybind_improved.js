myBind() Improved

Our earlier implementation of the Function.prototype.bind was simplistic.
Function.prototype.bind has another trick up its sleeve besides hard-binding functions to context objects.
It's called partial function application.
Read this assignment and the MDN documentation to learn more about partial function application.

Alter the myBind function written in the previous exercise to support partial function application.

------------ Solution -----------

function myBind(func, ctx, ...partialArgs) {
  return function(...userArgs) {
    const fullArgs = partialArgs.concat(userArgs);
    return func.apply(ctx, fullArgs); 
  }; 
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10)); // 15


---------- LS Solution ---------

function myBind(func, ctx) {
  const partialArgs = [].slice.apply(arguments, [2]); // [5] partial argument
  return function() {
    const remainingArgs = [].slice.apply(arguments); //  [10] user arguments
    const fullArgs = partialArgs.concat(remainingArgs); // partial + user arguments => [5, 10]
    return func.apply(ctx, fullArgs); // apply passes extra arguments in an array,
  };
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null);

console.log(addFive(10)); // 15

--------- Discussion -----------

The key here is visualizing what happens to the arguments when myBind is called and 
when the bound function is eventually called. 
The first thing to visualize is when myBind is executed, it creates the partialArgs array. 
This array contains the pre-specified initial arguments. 
Next, when the bound function is called, the remaining arguments are then concatenated with the partialArgs. 
Notice that the key here is to cache the initial set of arguments and 
have it accessible via the closure formed by myBind.

With the complete args, the solution again leverages Function.prototype.apply to execute the function 
passed to myBind with its this set to ctx.