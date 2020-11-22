const seq = require('../DAL/seq');
const { Student, Teacher, TeacherStudent } = require('.');


; (async function () {
  await seq.sync({ force: true });
  //initialize data
  await Teacher.create({
    email: 'teacherken@gmail.com'
  });
  // await Teacher.bulkCreate([{
  //   email: 'teacherken@gmail.com'
  // }, {
  //   email: 'laoshi@gmail.com'
  // }
  // ]);
  await Student.bulkCreate([
    {
      email: 'studentjon@gmail.com',
    },
    {
      email: 'studenthon@gmail.com'
    }
  ]);
  await TeacherStudent.bulkCreate([
    {
      studentId: 1,
      teacherId: 1,
    },
    {
      studentId: 2,
      teacherId: 1,
    },
  ])
})()

