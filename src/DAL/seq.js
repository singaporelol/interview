const Sequelize = require('sequelize');
const { dbConf,
  dbName,
  dbUsername,
  dbPassword } = require('../conf/config');


const seq = new Sequelize(dbName, dbUsername, dbPassword, dbConf);

module.exports = seq;
