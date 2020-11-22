const server = require('./server');
const service = require('./../src/service')
/**
 * @description test teacher register students
 * @author Wei Xueqian
 */

test('should get register students to be true', async () => {
  const res = await server.post('/api/register').send({
    "teacher": "laoshi@gmail.com",
    "students":
      [
        "zhangsan@gmail.com",
        "lisi@gmail.com"
      ]
  });
  expect(res.status).toBe(204);
})

