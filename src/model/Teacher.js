const Sequelize = require('sequelize');
const seq = require('../DAL/seq');
const Teacher = seq.define('teacher', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
},{ timestamps: false })

module.exports=Teacher;