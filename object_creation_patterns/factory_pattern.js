// ---------------
// Factory Pattern
// ---------------

// factory function to create car objects
function createCar(make, model, year) {
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
const johnCar = createCar('Ford', 'F150', '2011');
const janeCar = createCar('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// JavaScript’s Factory Pattern employs a factory function to create new objects.
// It was conceived as a DRY means to abstract the process of creating objects. However, there are couple problems with it:

// Efficiency — Methods created on the factory function are copied to all new object instances. This is inefficient.
// Type Determination — Because the factory function returns a new object, it makes type determination of object instances difficult.
//                      New object instances are typed as “Object”, with no indication of the instances’ context.
