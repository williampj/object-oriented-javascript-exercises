Buggy Code 1
The code below is expected to output the following when run:

var helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
// = "Good Morning Victor"

function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
        default:
          return;
      }
      console.log(msg);
    }
  };
}

However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

----------- Solution ---------

The problem is that it didn't use this keyword to access the properties of the object returned by the createGreeter function.

// rest of code omitted for brevity

      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + this.name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + this.name;
          break;
        case 'evening':
          msg += this.evening + ' ' + this.name;
          break;
      }
      
// rest of code omitted for brevity


--------- Further Exploration: -----------

An alternative solution to this exercise is the following code:

// rest of code omitted for brevity

switch (timeOfDay) {
  case 'morning':
    msg += this.morning + ' ' + name;
    break;
  case 'afternoon':
    msg += this.afternoon + ' ' + name;
    break;
  case 'evening':
    msg += this.evening + ' ' + name;
    break;
}

// rest of code omitted for brevity
Why does it work? What concept does this demonstrate?

Answer: 

This code works also and demonstrates the concept of closures.

Indeed, name in the object that is returned from the object factory points to the local variable that was created inside the function. 
Even after the execution context of this function has disappeared, 
the object still has a closure on this variable that is not garbage collected.

------ Extra solution that takes advantage of closures -------

function createGreeter(name) {
  var morning = 'Good Morning';
  var afternoon = 'Good Afternoon';
  var evening = 'Good Evening';

  return {
    greet: function(timeOfDay) {
      var msg = ''
      switch (timeOfDay) {
        case 'morning':
          msg += morning + ' ' + name;  // no need for `this.` because the variables are closed over when object is created (part of object's closure)
          break;
        case 'afternoon':
          msg += afternoon + ' ' + name;
          break;
        case 'evening':
          msg += evening + ' ' + name;
          break;
      }

      console.log(msg);
    },
  };
}

var helloVictor = createGreeter('Victor');
helloVictor.greet('morning');