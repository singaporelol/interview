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
const registerHandler = async ctx => {
  let { teacher, students } = ctx.request.body;
  let result = await registerStudents(teacher, students);
  if (result.status) {
    ctx.response.status = 204;
  } else {
    ctx.body = {
      ...result.data
    }
  }
}
const commonstudentsHandler = async ctx => {
  let { teacher } = ctx.request.query;
  let result = await getCommonStudents(teacher)
  ctx.body = {
    ...result
  }

}
const suspendHanler = async ctx => {
  let { student } = ctx.request.body;
  let result = await suspendStudent(student);
  if (result.status) {
    ctx.response.status = 204;
  } else {
    ctx.body = {
      ...result.data
    }
  }
}
const retrievefornotificationsHandler = async ctx => {
  let { teacher, notification } = ctx.request.body;
  let result = await retrievefornotifications(teacher, notification);
  ctx.body = {
    ...result
  }
}
module.exports = {
  registerHandler,
  commonstudentsHandler,
  suspendHanler,
  retrievefornotificationsHandler
}