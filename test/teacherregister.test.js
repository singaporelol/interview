const server = require('./server')
const service = require('../src/service')
/**
 * @description test teacher register students
 * @author Wei Xueqian
 */
//test true
test('should get register students to be 200', async () => {
  const res = await server.post('/api/register').send({
    'teacher': 'laoshi@gmail.com',
    'students':
      [
        'zhangsan@gmail.com',
        'lisi@gmail.com'
      ]
  })
  expect(res.status).toBe(200)
})
//test failure
// test('should not get student studenthon@gmail.com', async () => {
//   const res = await server.get('api/commonstudents?teacher=teacherken%40gmail.com&teacher=laoshi@gmail.com')
//   expect(res.body).toEqual(
//     expect.not.arrayContaining(['studenthon@gmail.com'])
//   )
// })
//test set up
test('test jest', async () => {
  const res = await server.get('/api/testjest')
  expect(res.body).toEqual({
    title: 'test'
  })
})

