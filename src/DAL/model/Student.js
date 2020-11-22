const Sequelize = require('sequelize');
const seq = require('../seq');

//build student model
const Student = seq.define('student', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isSuspend: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { timestamps: false })

module.exports = Student;