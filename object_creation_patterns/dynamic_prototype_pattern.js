// -------------------------
// Dynamic Prototype Pattern
// -------------------------

// constructor function to create car objects
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;

  // constructor prototype to share properties and methods
  if (typeof this.sayCar !== 'function') {
    Car.prototype.sayCar = function() {
      console.log(
        'I have a ' + this.year + ' ' + this.make + ' ' + this.model + '.'
      );
    };
  }
}

// create 2 car objects for John and Jane
const johnCar = new Car('Ford', 'F150', '2011');
const janeCar = new Car('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Dynamic Prototype Pattern encapsulates all information within a constructor,
// and has the benefits of both unique instance properties and shared prototypal properties and methods.
// In the Dynamic Prototype Pattern, the prototype is initialized inside of a constructor function.
// Then, conditional logic is implemented to ensure the prototype is initialized only on the first object instance created by a constructor.
