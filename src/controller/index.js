const service = require('./../service');

async function registerStudents(teacher, students) {
  let result = await service.registerStudents(teacher, students);
  return result;
}


async function getCommonStudents(teacher) {
  let result = await service.getCommonStudents(teacher)
  if (result.status) {
    return {
      students: result.data
    }
  } else {
    return {
      ...result.data
    }
  }
}

async function suspendStudent(student) {
  let result = await service.suspendStudent(student);
  return result;
}
/**
 * retrive for notifications
 */

async function retrievefornotifications(teacher, notification) {
  let result = await service.retrievefornotifications(teacher, notification);
  if (result.status) {
    return {
      recipients: result.data
    }
  } else {
    return {
      ...result.data
    }
  }
}

module.exports = {
  registerStudents,
  retrievefornotifications,
  suspendStudent,
  getCommonStudents
}