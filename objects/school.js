School

Create a school object.
The school object uses the student object from the previous exercise.
It has methods that use and update information about the student.
Be sure to check out the previous exercise for the other arguments that might be needed by the school object.
Implement the following methods for the school object:

addStudent: Adds a student by creating a new student and adding the student to a collection of students.
  The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'.
  Returns a student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.

To test your code, use the three student objects listed below.
Using the three student objects, produces the following values from the getReportCard and courseReport methods respectively.

only returning the properties that aren't methods for the three objects

-------- My 2nd Solution -------

// Added a findCOurseByCode function to createStudent closure 
// Added findCourseByName method to createStudent 

function createStudent(name, year) {
  const findCourseByCode = (courses, code) =>
    courses.filter(course => course.code === code)[0];
  return {
    name,
    year,
    courses: [],
    findCourseByName(courseName) {
      return this.courses.filter(course => course.courseName === courseName)[0];
    },
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
      const selectedCourse = findCourseByCode(this.courses, code);
      if (selectedCourse) {
        selectedCourse.notes = selectedCourse.notes || [];
        selectedCourse.notes.push(note);
      }
    },
    updateNote(code, note) {
      const selectedCourse = findCourseByCode(this.courses, code);
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

// Turned school into IIFE in order to add findStudent function to closure 

const school = (function() {
  const findStudent = (students, studentObj) =>
    students.find(student => student === studentObj);
  return {
    students: [],
    addStudent(name, year) {
      if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        const newStudent = createStudent(name, year);
        this.students.push(newStudent);
        return newStudent;
      }
      console.log('Invalid Year');
    },
    enrollStudent(studentObj, courseName, courseCode) {
      findStudent(this.students, studentObj).addCourse({
        courseName,
        courseCode
      });
    },
    addGrade(studentObj, courseName, grade) {
      findStudent(this.students, studentObj).findCourseByName(
        courseName
      ).grade = grade;
    },
    getReportCard(studentObj) {
      const student = findStudent(this.students, studentObj);
      student.courses.forEach(function(course) {
        console.log(`${course.courseName}: ${course.grade || 'in progress'}`);
      });
    },
    courseReport(courseName) {
      const studentsInCourse = this.students.filter(student =>
        student.findCourseByName(courseName)
      );
      console.log(`Grades for ${courseName}`);
      studentsInCourse.forEach(studentObj => {
        const courseObj = studentObj.findCourseByName(courseName);
        console.log(`${studentObj.name}: ${courseObj.grade}`);
      });
    }
  };
})();

---------------- My 1st Solution ------------
// brought createStudent into school object as a method 

const school = {
  students: [],
  createStudent(name, year) {
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
          const courseIndex = this.courses.indexOf(selectedCourse);
          this.courses[courseIndex].notes =
            this.courses[courseIndex].notes || [];
          this.courses[courseIndex].notes.push(note);
        }
      },
      updateNote(code, note) {
        const selectedCourse = this.courses.filter(
          course => course.code === code
        )[0];
        const courseIndex = this.courses.indexOf(selectedCourse);
        this.courses[courseIndex].notes = [note];
      },
      viewNotes() {
        this.courses
          .filter(course => course.notes)
          .forEach(course =>
            console.log(`${course.name}: ${course.notes.join('; ')}`)
          );
      }
    };
  },
  addStudent(name, year) {
    const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
    if (!VALID_YEARS.includes(year)) {
      console.log('Invalid Year');
      return;
    }
    const newStudent = this.createStudent(name, year);
    this.students.push(newStudent);
    return newStudent;
  },
  enrollStudent(student, courseName, courseCode) {
    student.addCourse({ name: courseName, code: courseCode });
  },
  addGrade(student, courseName, grade) {
    const selectedCourse = student.courses.filter(
      course => course.name === courseName
    )[0];
    if (selectedCourse) {
      selectedCourse.grade = grade;
    }
  },
  getReportCard(student) {
    student.courses.forEach(course => {
      console.log(`${course.name}: ${course.grade || 'In progress'}`);
    });
  },
  courseReport(courseName) {
    const selectedStudents = this.students.filter(student =>
      student.courses.some(
        courseObject => courseObject.name === courseName && courseObject.grade
      )
    );
    if (selectedStudents.length === 0) {
      return; 
    }
    const namesAndGrades = selectedStudents.map(studentObject => {
      const { grade } = studentObject.courses.filter(
        courseObj => courseObj.name === courseName
      )[0];
      const { name } = studentObject;
      return { name, grade };
    });

    const courseAverage =
      namesAndGrades.reduce((sum, student) => sum + student.grade, 0) /
      namesAndGrades.length;

    console.log(`${courseName} Grades=`);
    namesAndGrades.forEach(student => {
      console.log(`${student.name}: ${student.grade}`);
    });
    console.log('---');
    console.log(`Course Average: ${courseAverage}`);
  }
};

// foo;
// {
//   name: 'foo',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

// bar;
// {
//   name: 'bar',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

// qux;
// {
//   name: 'qux',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

// algo for courseReport function:
// - input: coursename
// - output: string with every studentName and grade for that course
// - set an outputArray
// - iterate the students array
//   - if a student is enrolled in that class and has a grade for that class,
//     - push an obejct with single property of student's name (name) and grade (value) to outputarray
// - set course average equal to a reduction of student grades sum divided by array length
// - iterate outputarray
//   - log a string of name, colon, value of each of each property element
//   - log course average interpolated string


school.getReportCard(foo);

const foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

const bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);

const qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);

school.courseReport('Math');
school.courseReport('Advanced Math');

----------- LS Solution --------

- logs each student on first line of reduce function (smart)
- courseReport function: 
  - maps the students array first to make it easier to deal with, then filter 
  - creates helper function to retrieve the course 

  var school = {
    students: [],
    addStudent: function(name, year) {
      if (['1st', '2nd', '3rd', '4th', '5th'].indexOf(year) >= 0) {
        var student = createStudent(name, year);
        this.students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },
  
    enrollStudent: function(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode})
    },
  
    addGrade: function(student, courseName, grade) {
      var course = student.listCourses().filter(function(course) {
        return course.code === courseName;
      })[0];
  
      if (course) {
        course.grade = grade;
      }
    },
  
    getReportCard: function(student) {
      student.listCourses().forEach(function(course) {
        if (course.grade) {
          console.log(course.name + ': ' + String(course.grade));
        } else {
          console.log(course.name + ': In progress');
        }
      });
    },
  
    courseReport: function(courseName) {
      function getCourse(student, courseName) {
        return student.listCourses().filter(function(course) {
          return course.name === courseName;
        })[0];
      }
  
      var courseStudents = this.students.map(function(student) {
        var course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(function(student) {
        return student.grade;
      });
  
      if (courseStudents.length > 0) {
        console.log('=' + courseName + ' Grades=');
  
        var average = courseStudents.reduce(function(total, student) {
          console.log(student.name + ': ' + String(student.grade));
          return total + student.grade;
        }, 0) / courseStudents.length;
  
        console.log('---');
        console.log('Course Average: ' + String(average));
      }
    },
  };

-------- Discussion --------

The key to the enrollStudent, addGrade, and getReportCard method is the use of the student object as a parameter. 
With the student object, the three methods just use the methods and properties of the object to update the information on the student object. 

Although not passed as an argument, the key also for the courseReport method is using the methods on the student object and 
then using list processing techniques to convert the list of students to the appropriate data needed to log the scores and average for a course. 
Of note is the use of map to transform the student object to only contain the name and grade of the student for a course.