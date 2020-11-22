const Sequelize = require('sequelize');
const { dbConf,
  dbName,
  dbUsername,
  dbPassword } = require('../conf/db');


const seq = new Sequelize(dbName, dbUsername, dbPassword, dbConf);

module.exports = seq;
//test connection:
// seq.authenticate().then(()=>{
//   console.log('ok')
// }).catch((err)=>{
//   console.log(err)
// })