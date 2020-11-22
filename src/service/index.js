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
    if (result.length > 0) {
      result.forEach(val => {
        if (val.students.length > 0) {
          val.students.forEach(u => {
            studentList.push(u.email)
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
      result.students.forEach(val=>{
        studentList.push(val.email)
      })
    }
  }
  return studentList;

}
async function test() {
  return false;
}
module.exports = {
  registerStudents,
  getCommonStudents,
  test
}