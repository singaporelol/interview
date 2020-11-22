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
async function test(){
  return false;
}
module.exports = {
  registerStudents,
  test
}