// -----------------------------
// Parasitic Constructor Pattern
// -----------------------------

// constructor function to create car objects
function Car(make, model, year) {
  const o = new Object();

  o.make = make;
  o.model = model;
  o.year = year;
  o.sayCar = function() {
    console.log(`I have a ${this.year} ${this.make} ${this.model}.`);
  };

  return o;
}

// create 2 car objects for John and Jane
const johnCar = new Car('Ford', 'F150', '2011');
const janeCar = new Car('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Parasitic Constructor Pattern is similar to the Factory Pattern in that a function is used to create and return a new object.
// They key difference is that a constructor function is used instead of a factory function.

// In the example above, the constructor function explicitly returns the new o object.
// This overrides the default behavior, which in the absence of the explicit return o; statement, would implicitly return a new Car object.

// The Parasitic Constructor Pattern is useful in situations where you want to abstract and encapsulate code (has own methods) in a safe way.

// It’s important to note that in the Parasitic Constructor Pattern, there is no relationship between the returned object and its constructor.
// Bottom line, the Parasitic Constructor Pattern should not be used when other patterns suffice.
