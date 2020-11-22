const router = require('koa-router')()
const {
  registerHandler,
  commonstudentsHandler,
  suspendHanler,
  retrievefornotificationsHandler
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
router.post('/register', registerHandler)

//2. As a teacher, I want to retrieve a list of students common to a given list of teachers 
//(i.e. retrieve students who are registered to ALL of the given teachers).
router.get('/commonstudents', commonstudentsHandler)

//3. As a teacher, I want to suspend a specified student.
router.post('/suspend', suspendHanler)

//4. 4. As a teacher, I want to retrieve a list of students who can receive a given notification.
router.post('/retrievefornotifications',retrievefornotificationsHandler)

module.exports = router
