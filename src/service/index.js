const { Teacher, Student, TeacherStudent } = require('../model');
const Sequelize = require('sequelize');
/**
 * @param {string} teacher
 * @param {Array} student
 */

async function registerStudents(teacher, students) {

  const teacherEntity = await Teacher.findOne({
    where: {
      email: teacher
    }
  });
  // console.log(teacherEntity.dataValues);
  const studentEntityList = await Student.findAll({
    where: {
      email: {
        [Sequelize.Op.in]: [...students]
      }
    }
  })
  console.log('hellow')
  studentEntityList.forEach(async val => {
    try {
      await TeacherStudent.create({
        studentId: val.dataValues.id,
        teacherId: teacherEntity.dataValues.id,
      })
    } catch (err) {
      console.log('来了。。。。。。')
      console.log(err)
      return false;
    }
  })
  return true;


}



/**
 * @param {string||Array} teacher
 * 
 */
async function getCommonStudents(teacher) {
  let studentList = [];
  if (Array.isArray(teacher)) {
    let result = await Teacher.findAll({
      where: {
        email: {
          [Sequelize.Op.in]: teacher
        }
      },
      include: Student
    })
    // console.log('-----------')
    // console.log(result)
    if (result && result.length > 0) {
      result.forEach(val => {
        if (val.students.length > 0) {
          val.students.forEach(u => {
            !u.isSuspend && studentList.push(u.email)
          })
        }
      })
    }

  } else {
    let result = await Teacher.findOne({
      where: {
        email: teacher
      },
      include: Student
    })
    if (result && result.students.length > 0) {
      result.students.forEach(val => {
        !val.isSuspend && studentList.push(val.email)
      })
    }
  }
  return studentList;

}
/**
 * @param {string} student
 */
async function suspendStudent(student) {
  let studentEntity = await Student.findOne({
    where: {
      email: student,
      isSuspend: false
    }
  })
  if (studentEntity) {
    let result = await studentEntity.update({
      isSuspend: true
    })
    if (result) return true;
  }
  else {
    return false;
  }

}

/**
 * @param {string} teacher
 * @param {Array} student
 */
async function retrievefornotifications(teacher, student) {
  let studentList=[];
  let result = await Teacher.findOne({
    where: {
      email: teacher
    },
    include: Student
  });
  if (result && result.students.length > 0) {
    result.students.forEach(val=>{
      !val.isSuspend && studentList.push(val.email)
    })
  }
  return studentList.concat(student);
}



async function test() {
  return false;
}
module.exports = {
  registerStudents,
  getCommonStudents,
  suspendStudent,
  retrievefornotifications,
  test
}