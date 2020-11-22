const router = require('koa-router')()
const service = require('../service');

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
  let result = service.registerStudents(teacher, students);
  if (result) {
    ctx.response.status = 204;
  }
})

//2. As a teacher, I want to retrieve a list of students common to a given list of teachers 
//(i.e. retrieve students who are registered to ALL of the given teachers).
router.get('/commonstudents', async ctx => {
  let { teacher } = ctx.request.query;
  let students = await service.getCommonStudents(teacher)
  ctx.body = {
    students
  }

})
//3. As a teacher, I want to suspend a specified student.
router.post('/suspend', async ctx => {
  let { student } = ctx.request.body;
  console.log(student)
  let result = await service.suspendStudent(student);
  if (result) {
    ctx.response.status = 204;
  }
})
module.exports = router
