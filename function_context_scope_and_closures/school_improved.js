const school = (function() {
  const students = [];
  const ALLOWED_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
  function getCourse(student, courseName) {
    return student.listCourses().filter(function(course) {
      return course.name === courseName;
    })[0];
  }
  return {
    addStudent(name, year) {
      if (ALLOWED_YEARS.indexOf(year) >= 0) {
        const student = createStudent(name, year);
        students.push(student);
        return student;
      }
      console.log('Invalid Year');
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({ name: courseName, code: courseCode });
    },

    addGrade(student, courseName, grade) {
      const course = student.listCourses().filter(function(course) {
        return course.code === courseName;
      })[0];

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard(student) {
      student.listCourses().forEach(function(course) {
        if (course.grade) {
          console.log(`${course.name}: ${String(course.grade)}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      const courseStudents = students
        .map(function(student) {
          const course = getCourse(student, courseName) || { grade: undefined };
          return { name: student.name, grade: course.grade };
        })
        .filter(function(student) {
          return student.grade;
        });

      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);

        const average =
          courseStudents.reduce(function(total, student) {
            console.log(`${student.name}: ${String(student.grade)}`);
            return total + student.grade;
          }, 0) / courseStudents.length;

        console.log('---');
        console.log('Course Average: ' + String(average));
      }
    }
  };
})();
