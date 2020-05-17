// ------------
// OLOO Pattern
// ------------

// constructor object to create car objects
const Car = {
  // optional default values on properties here (eg: const make = 'mazda')
  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  },
  sayCar() {
    console.log(
      'I have a ' + this.year + ' ' + this.make + ' ' + this.model + '.'
    );
  }
};

// create 2 car objects for John and Jane
const johnCar = Object.create(Car);
const janeCar = Object.create(Car);

// call init method on John and Jane
johnCar.init('Ford', 'F150', '2011');
janeCar.init('Audi', 'A4', '2007');

// call method on Jane's car
janeCar.sayCar();

// OLOO stands for Objects Linked to Other Objects.
// The OLOO pattern simplifies the predominant class-based design patterns by creating objects directly from other objects, instead of using constructor functions.

// Because there is no constructor in the OLOO Pattern, calling johnCar instanceof Car will throw an error.
// Also, calling johnCar.constructor will delegate up the prototype chain to Object.prototype.constructor and return the native method.
// You can test the Car object’s relationship to johnCar with Car.isPrototypeOf(johnCar), which returns true.

// In the OLOO Pattern there are just pure objects that delegate to one another.
// It’s important to note that in OLOO there are no constructors. While the first letter of the object is still capitalized,
// it is done so only to remain consistent with the accepted convention.

// In OLOO, rather than the implicit initialization that occurs in constructor patterns,
// we have explicit initialization using a method (init in the example above).
// The result is that OLOO allows/forces you to create and initialize your objects at separate times,
// rather than bundling both object creation and initialization together.
