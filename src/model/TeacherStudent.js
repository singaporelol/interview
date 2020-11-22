const Sequelize = require('sequelize');
const seq = require('../DAL/seq');
const TeacherStudent = seq.define('teacherstudent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
}, { timestamps: false });

module.exports=TeacherStudent;