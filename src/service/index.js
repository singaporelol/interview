const { Teacher, Student, TeacherStudent } = require('../dal/model');
const Sequelize = require('sequelize');
const { SuccessModel, ErrorModel } = require('./../model/resModel')
const {
  registerTeacherNotExistInfo,
  studentIsNotExist,
  studentIsRegistered
} = require('./../model/errorInfo')
/**
 * @param {string} teacher
 * @param {Array} student
 */

async function registerStudents(teacher, students) {
  try {
    const teacherEntity = await Teacher.findOne({
      where: {
        email: teacher
      }
    });
    if (!teacherEntity) {
      //teacher is not exist
      return {
        status: false,
        data: new ErrorModel(registerTeacherNotExistInfo)
      }
    }
    const studentEntityList = await Student.findAll({
      where: {
        email: {
          [Sequelize.Op.in]: [...students]
        },
        isSuspend: false
      }
    })
    console.log(studentEntityList)
    if (studentEntityList.length <= 0) {
      //student is not exist
      return {
        status: false,
        data: new ErrorModel(studentIsNotExist)
      }
    }
    //check if students are registered before.
    for (const key in studentEntityList) {
      if (studentEntityList.hasOwnProperty(key)) {
        const element = studentEntityList[key];
        const teacherStudentEntity = await TeacherStudent.findOne({
          where: {
            studentId: element.dataValues.id,
            teacherId: teacherEntity.dataValues.id
          }
        })
        if (teacherStudentEntity) {
          return {
            status: false,
            data: new ErrorModel(studentIsRegistered)
          }
        } else {
          await TeacherStudent.create({
            studentId: element.dataValues.id,
            teacherId: teacherEntity.dataValues.id,
          })
        }
      }
    }
    return {
      status: true
    };
  } catch (err) {
    console.log('error....')
  }




}

/**
 * @param {string||Array} teacher
 * 
 */
async function getCommonStudents(teacher) {
  let studentList = [];
  if (Array.isArray(teacher)) {
    let resultList = await Teacher.findAll({
      where: {
        email: {
          [Sequelize.Op.in]: teacher
        }
      },
      include: Student
    })
    //check if teach is exist
    if (resultList.length > 0) {
      resultList.forEach(val => {
        if (val.students.length > 0) {
          val.students.forEach(u => {
            !u.isSuspend && studentList.push(u.email)
          })
        }
      })
    } else {
      //teacher is not exist
      return {
        status: false,
        data: new ErrorModel(registerTeacherNotExistInfo)
      }
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
    } else {
      //teacher is not exist
      return {
        status: false,
        data: new ErrorModel(registerTeacherNotExistInfo)
      }
    }
  }
  return {
    status: true,
    data: studentList
  };

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
    await studentEntity.update({
      isSuspend: true
    })
    return {
      status: true
    };
  }

  return {
    status: false,
    data: new ErrorModel(studentIsNotExist)
  };


}

/**
 * @param {string} teacher
 * @param {Array} student
 */
async function retrievefornotifications(teacher, notification) {
  let notificationArr = notification.split(' @');
  notificationArr.shift();
  let studentList = [];
  let result = await Teacher.findOne({
    where: {
      email: teacher
    },
    include: Student
  });
  if (result && result.students.length > 0) {
    result.students.forEach(val => {
      !val.isSuspend && studentList.push(val.email)
    })
    return {
      status: true,
      data: studentList.concat(notificationArr)
    }
  }
  //teacher is not registered in database return error
  return {
    status: false,
    data: new ErrorModel(registerTeacherNotExistInfo)
  }
}

module.exports = {
  registerStudents,
  getCommonStudents,
  suspendStudent,
  retrievefornotifications,
}