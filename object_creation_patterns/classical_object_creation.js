// Classical Object Creation

// Implement the following diagram using the pseudo-classical approach.
// Subclasses should inherit everything from the superclass and not just the methods.
// Reuse the constructors of the superclass when implementing a subclass.

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}
Person.prototype.eat = function() {
  console.log('Eating');
};
Person.prototype.communicate = function() {
  console.log('Communicating');
};
Person.prototype.sleep = function() {
  console.log('Sleeping');
};
Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.apply(this, [firstName, lastName, age, gender]);
  this.specialization = specialization;
}
Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = () => {
  console.log('Diagnosing');
};

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}
Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.teach = () => console.log('Teaching');

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function() {
  console.log('Studying');
};

function GraduateStudent(
  firstName,
  lastName,
  age,
  gender,
  degree,
  graduateDegree
) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}
GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function() {
  console.log('Researching');
};

const graduateStudent = new GraduateStudent(
  'foo',
  'bar',
  21,
  'gender',
  'BS Industrial Engineering',
  'MS Industrial Engineering'
);

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person); // logs true
person.eat(); // logs 'Eating'
person.communicate(); // logs 'Communicating'
person.sleep(); // logs 'Sleeping'
console.log(person.fullName()); // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person); // logs true
console.log(doctor instanceof Doctor); // logs true
doctor.eat(); // logs 'Eating'
doctor.communicate(); // logs 'Communicating'
doctor.sleep(); // logs 'Sleeping'
console.log(doctor.fullName()); // logs 'foo bar'
doctor.diagnose(); // logs 'Diagnosing'

// // logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat(); // logs 'Eating'
graduateStudent.communicate(); // logs 'Communicating'
graduateStudent.sleep(); // logs 'Sleeping'
console.log(graduateStudent.fullName()); // logs 'foo bar'
graduateStudent.study(); // logs 'Studying'
graduateStudent.research(); // logs 'Researching'

---------- LS Solution (same) -----------

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

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function() {
  console.log('Studying');
};
Student.prototype.constructor = Student;

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.research = function() {
  console.log('Researching');
};
GraduateStudent.prototype.constructor = GraduateStudent;

--------- Discussion -----------

The solution is a bit long, but it's not complicated. The points to note are the following:

Use of Function.prototype.call to have the subclass "inherit" properties from the parent class.
Use of Function.prototype = Object.create(obj) to "inherit" methods from the parent class.
Use of Function.prototype.constructor to manually reset the property to point back to the appropriate constructor.

------ Notes ------
NB:
- we are linking constructors here, so therefore setting prototypes equal to Object.create(ParentClassPrototype)

- if we had an object that we wish to make an instance of a class, then we can set its proto to the constructor prototype using Object.create 
  ex: let obj = {}; 
      obj.__proto__ = Object.create(Constructor.prototype)
      or 
      Object.setPrototypeOf(obj, Constructor.prototype)

- this example sets the person object from the example by first creating it and then linking it to Person constructor. 

const person = {};
person.__proto__ = Object.create(Person.prototype);
Person.call(person, 'foo', 'bar', 21, 'gender');
console.log(person instanceof Person); // logs true
person.eat(); // logs 'Eating'
person.communicate(); // logs 'Communicating'
person.sleep(); // logs 'Sleeping'
console.log(person.fullName()); // logs 'foo bar'