const Student=require('./Student');
const Teacher=require('./Teacher');
const TeacherStudent=require('./TeacherStudent');

//create foreignKey many to many
Student.belongsToMany(Teacher, { through: TeacherStudent });
Student.hasMany(TeacherStudent);
Teacher.belongsToMany(Student, { through: TeacherStudent });
Teacher.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Student);
TeacherStudent.belongsTo(Teacher);

module.exports = {
  Student,
  Teacher,
  TeacherStudent
}