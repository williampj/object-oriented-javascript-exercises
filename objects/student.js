Student

Create an object factory for a student object.
The student object should have the following methods and it should produce the expected results demonstrated in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.

------- Solution ---------

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    listCourses() {
      console.log(this.courses);
    },
    addCourse(course) {
      this.courses.push(course); //  foo.viewNotes(); // // = "Math: Fun Course; Remember to study for algebra"
    },
    addNote(code, note) {
      const selectedCourse = this.courses.filter(
        course => course.code === code
      )[0];
      if (selectedCourse) {
        selectedCourse.notes = selectedCourse.notes || []
        selectedCourse.notes.push(note);
      }
    },
    updateNote(code, note) {
      const selectedCourse = this.courses.filter(
        course => course.code === code
      )[0];
      selectedCourse.notes = [note];
    },
    viewNotes() {
      this.courses
        .filter(course => course.notes)
        .forEach(course =>
          console.log(`${course.name}: ${course.notes.join('; ')}`)
        );
    }
  };
}

foo = createStudent('Foo', '1st');
foo.info();
// = 'Foo is a 1st year student'
foo.listCourses();
// // = [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// // = [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// // = "Math: Fun Course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// // = "Math: Fun Course; Remember to study for algebra"
// // = "Advance Math: Difficult Subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// // = "Math: Fun Course"
// // = "Advance Math: Difficult Subject"

------------ LS Solution -----------

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    info: function() {
      console.log(this.name + " is a " + this.year + " year student");
    },
    
    listCourses: function() {
      return this.courses;
    },
    
    addCourse: function(course) {
      this.courses.push(course);
    },
    
    addNote: function(courseCode, note) {
      var course = this.courses.filter(function(course) {
        return course.code === courseCode;
      })[0];
      
      if (course) {
        if (course.note) {
          course.note += '; ' + note;
        } else {
          course.note = note;
        } 
      }

    },
    
    viewNotes: function() {
      this.courses.forEach(function(course) {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      });
    },
    
    updateNote: function(courseCode, note) {
      var course = this.courses.filter(function(course) {
        return course.code === courseCode;
      })[0];
      
      if (course) {
        course.note = note;
      }
    },
  };
}

----------- Discussion -----------

All the methods are straightforward. 
The main thing to handle is the mutation of the specific course when adding and updating a note. 
The solution does this by filtering the array of courses and returning the course object itself. 

Another thing to note, is the conditional for checking if a course was found for both the addNote and updateNotes method. 
This conditional ensures that a note will only be added when a student has the course.


