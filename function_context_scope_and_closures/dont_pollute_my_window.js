Don't Pollute My Window

Consider the following code:

var name = 'Naveed';
var greeting = 'Hello';

var greeter = {
  message: greeting + ' ' + name + '!',
  sayGreetings: function() {
    console.log(this.message);
  }
};

Note that the message property uses the result of concatenation as its value.
As a result, we have two global variables: name, and greeting that pollute the global scope.
As we already know, we should limit the use of global variables as much as we can.
Here we can avoid using the global variables by simply setting the message property to the value "Hello Naveed!".
But let's pretend that we must use variables and concatenation to accomplish this.
Can you think of a way to refactor this code so we don't have any other variables in the global scope besides greeter?

---------- Solution ----------

const greeter = (function() {
  const name = 'Naveed';
  const greeting = 'Hello';

  return {
    message: `${greeting} ${name}!`,
    sayGreetings() {
      console.log(this.message);
    }
  };
})();

greeter.sayGreetings();

---------- LS Solution ----------

var greeter = {
  message: (function() {
    var name = 'Naveed';
    var greeting = 'Hello';

    return greeting + ' ' + name + '!';
  })(),

  sayGreetings: function() {
    console.log(this.message);
  }
};

--------- Discussion ----------

Here we use an IIFE to set the value of the message property. 
This allows us to do all the work necessary for setting the value 
without using any extra global variables.

This is of course, a toy example, but this pattern can be useful in cases where 
setting a property requires some sort of "pre-work" that introduces extra variables.
