// -----------------------------------------
// Combination Constructor/Prototype Pattern
// -----------------------------------------

// constructor function to create car objects
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// constructor prototype to share properties and methods
Car.prototype.sayCar = function() {
  console.log(
    'I have a ' + this.year + ' ' + this.make + ' ' + this.model + '.'
  );
};

// create 2 car objects for John and Jane
const johnCar = new Car('Ford', 'F150', '2011');
const janeCar = new Car('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Combination Constructor/Prototype Pattern solves the efficiency issues present in the Factory Pattern and Constructor Pattern
// by utilizing prototypal inheritance — or prototypal delegation

// It is among the most popular object oriented design patterns in JavaScript because it allows for unique (non-shared) instance properties
// to be created within a constructor function, as well as shared properties and methods on the constructor function’s prototype.

// NB: if you assign your constructor’s prototype to an object literal instead of using the dot notation, you will overwrite the default constructor property.

// Finally, the main complaint with the Combined Constructor/Prototype Pattern is that some developers perceive the
// separation of the constructor function and its prototype confusing. This problem led to the creation of the Dynamic Prototype Pattern.
