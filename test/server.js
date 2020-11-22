/**
 * @description jest server
 * @author Wei Xueqian
 * 
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);