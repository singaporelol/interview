const router = require('koa-router')()
const {
  retrievefornotifications,
  suspendStudent,
  getCommonStudents,
  registerStudents
} = require('./../controller')
router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/testjest', (ctx) => {
  let result = true;
  if (result) {
    ctx.body = {
      title: 'a'
    }
  }
});

// 1. As a teacher, I want to register one or more students to a specified teacher.
router.post('/register', async ctx => {

  let { teacher, students } = ctx.request.body;
  let result = await registerStudents(teacher, students);
  if (result.status) {
    ctx.response.status = 204;
  } else {
    ctx.body = {
      ...result.data
    }
  }
})

//2. As a teacher, I want to retrieve a list of students common to a given list of teachers 
//(i.e. retrieve students who are registered to ALL of the given teachers).
router.get('/commonstudents', async ctx => {
  let { teacher } = ctx.request.query;
  let result = await getCommonStudents(teacher)
  ctx.body = {
    ...result
  }

})
//3. As a teacher, I want to suspend a specified student.
router.post('/suspend', async ctx => {
  let { student } = ctx.request.body;
  let result = await suspendStudent(student);
  if (result.status) {
    ctx.response.status = 204;
  } else {
    ctx.body = {
      ...result.data
    }
  }
})
//4. 4. As a teacher, I want to retrieve a list of students who can receive a given notification.
router.post('/retrievefornotifications', async ctx => {
  let { teacher, notification } = ctx.request.body;
  let result = await retrievefornotifications(teacher, notification);
  ctx.body = {
    ...result
  }
})



module.exports = router
