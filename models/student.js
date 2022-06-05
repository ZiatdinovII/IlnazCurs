var mongoose = require("mongoose");
// Это модель Mongoose для пользователей
var StudentSchema = mongoose.Schema({
	surname: String,
	name: String,
    fatherName: String,
    date: String,
    group: String,
    cathedraName: String,
    instituteName: String
});
var Student = mongoose.model("Student", StudentSchema);
module.exports = Student;