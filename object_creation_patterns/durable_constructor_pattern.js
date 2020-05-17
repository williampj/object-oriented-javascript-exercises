// -----------------------------
// Durable Constructor Pattern
// -----------------------------

// constructor function to create car objects
function Car(make, model, year) {
  const o = new Object();

  // private variable
  const condition = 'used';

  // public method
  o.sayCar = function() {
    console.log(`I have a ${condition} ${year} ${make} ${model}.`);
  };

  return o;
}

// create 2 car objects for John and Jane
const johnCar = Car('Ford', 'F150', '2011');
const janeCar = Car('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Durable Constructor Pattern is similar to the Factory Pattern and Parasitic Constructor Pattern in that it creates and explicitly returns a new object.

// The two key differences in the Durable Constructor Pattern are:
// 1) The this keyword is never used on constructor methods.
// 2) The new keyword is never called before the constructor.

// The unique aspect of the Durable Constructor Pattern is that it allows for private data that can be accessed through the process of closure.
// The private nature of variables in the Durable Constructor Pattern is also evident for arguments passed to the constructor function — make, model and year are all private.
//   For this reason, the Durable Constructor Pattern is most often used in environments which require more security than other design patterns provide.

// Finally, as with the Parasitic Constructor Pattern, there is no relationship between the returned object and its constructor:
