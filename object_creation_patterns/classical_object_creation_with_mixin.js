Classical Object Creation with Mixin

In this exercise, you'll make an extend function and use it to add a mixin to the previous exercise. 
The mixin adds an invoice and payTax methods.

Check out the example run and note how the professional mixin is applied to the Doctor and Professor constructors via extend:

var doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'S
doctor.diagnose();                         // logs 'Diagnosing'

var professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function() {
  console.log(this.fullName() + ' is Asking customer to pay');
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'

------- Code from previou exercise --------

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};

Person.prototype.communicate = function() {
  console.log('Communicating');
};

Person.prototype.eat = function() {
  console.log('Eating');
};

Person.prototype.sleep = function() {
  console.log('Sleeping');
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.diagnose = function() {
  console.log('Diagnosing');
};
Doctor.prototype.constructor = Doctor;

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = function() {
  console.log('Teaching');
};
Professor.prototype.constructor = Professor;

------- My Solution ------
// a little more concise than LS, but really the same

const professional = {
  invoice() {
    console.log(`${this.fullName()} is billing customer`);
  },
  payTax() {
    console.log(`${this.fullName()} is paying taxes`);
  }
};

function extend(object, mixin) {
  Object.keys(mixin).forEach(function(methodName) {
    object[methodName] = function(...args) {
      return mixin[methodName].apply(object, args);
    };
  });
  return object;
}


-------- LS Solution -------

function delegate(callingObject, methodOwner, methodName) {
  var args = Array.prototype.slice.call(arguments, 3)
  return function() {
    return methodOwner[methodName].apply(callingObject, args);
  };
}

function extend(object, mixin) {
  var methodNames = Object.keys(mixin);

  methodNames.forEach(function(name) {
    object[name] = delegate(object, mixin, name);
  });

  return object;
}

var professional = {
  invoice: function() {
    console.log(this.fullName() + ' is Billing customer');
  },

  payTax: function() {
    console.log(this.fullName() + ' is Paying taxes');
  },
};

------------ Discussion -----------

The solution leverages a modified delegate function from an earlier exercise. 
It was modified so that we can mimic how mixins are expected to behave — that is, 
methods from the mixin use state from the object they are being called on and 
call on other methods on the object they are mixed in to. 
The delegate function now accepts three arguments: callingObject, methodOwner, and methodName. 
The callingObject is added so that the method is called with it as the context. 
Related to this, it's worth noting that extend is used with the object returned by the new constructor. 
This is done so that the object extended has the states.

The key here is observing the code and the result from the example run; 
that changes to a method on the professional mixin (i.e., profesional.invoice) 
were also reflected on the method call on the object created from either the Doctor or Professor constructors and 
that the mixin uses state (i.e, firstName) and methods (i.e., fullName) from the object that it extended. 
The extend function simply iterates over all the keys of the mixin object and uses that to create and, consequently, delegate methods.

---------- Student solutions -------

1) extension of prototype 

function extend(object, extension) {
  for (let property in extension) {
    if (extension.hasOwnProperty(property)) {
      Object.getPrototypeOf(object)[property] = function (...args) {
        return extension[property].call(this, ...args);
      }
    }
  }
}

//

2) also extension of prototype 

Similar to the solutions below I interpreted this problem as adding the mixin behaviors to the constructor's prototype object 
so that any newly constructed functions would have the mixin methods available. 
The main difference from the solutions below is the use of Object.getOwnPropertyNames to keep things a bit more concise. 
However Object.getOwnPropertyNames returns enumerable and non-enumerable properties.

function extend(obj, mixinObj) {
  let dunderProto = Object.getPrototypeOf(obj);

  Object.getOwnPropertyNames(mixinObj).forEach(key => {
    dunderProto[key] =
      function(...args) {
        return mixinObj[key].call(this, ...args);
      }
  });

  return obj;
}

