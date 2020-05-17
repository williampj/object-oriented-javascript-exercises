// -------------------
// Constructor Pattern
// -------------------

// constructor function to create car objects
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.sayCar = function() {
    console.log(
      'I have a ' + this.year + ' ' + this.make + ' ' + this.model + '.'
    );
  };
}

// create 2 car objects for John and Jane
const johnCar = new Car('Ford', 'F150', '2011');
const janeCar = new Car('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Constructor Pattern solves the Factory Pattern’s type determination problem by replacing the factory function with a constructor function to create new objects.

// The main problem with the Constructor Pattern is, as in the Factory Pattern, inefficiency.
// In the Constructor Pattern, methods are [still] copied to all new object instances.
// This problem led to the creation of the Combination Constructor/Prototype Pattern (aka pseudo-classical pattern).
