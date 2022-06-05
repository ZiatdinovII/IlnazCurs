var Student = require("../models/student"), 
	StudentController = {},
	mongoose = require("mongoose");
 
StudentController.index = function(req, res) {
	console.log('Вызвано действие: UsersController.index');
	Student.find(function (err, users) {
  		if (err !== null) {
			res.json(500, err);
  		} else {
  			res.status(200).json(users);
  		}
  	});
};

// Создать нового пользователя 
StudentController.create = function(req, res) {
	console.log('Вызвано действие: создать студента');
	Student.find({"surname": req.body.surname,"name":req.body.name,"fatherName":req.body.fatherName,
                  "group":req.body.group,"cathedraName":req.body.cathedraName,"instituteName":req.body.instituteName,
                "date":req.body.date }, function (err, result) {
	    if (err) {
	        console.log(err);
	        res.send(500, err);
	    } else if (result.length !== 0) {
	        res.status(501).send("Студент уже существует");
	        console.log(err);   
	        console.log("Студент уже существует"); 
	    } else {
	        var newStudent = new Student({
	            "surname": req.body.surname,"name":req.body.name,"fatherName":req.body.fatherName,
                "date":req.body.date,
                "group":req.body.group,"cathedraName":req.body.cathedraName,"instituteName":req.body.instituteName
	        });
	        newStudent.save(function(err, result) {
	            console.log(err); 
	            if (err !== null) {
	                res.json(500, err); 
	            } else {
	                res.json(200, result);
	                console.log(result); 
	            }
	        });
	    }
	}); 
};

// Обновить существующего пользователя 
StudentController.update = function (req, res) { 
	var newStudent = {$set: {surname: req.body.surname,name:req.body.name,fatherName:req.body.fatherName,date:req.body.date,group:req.body.group,cathedraName:req.body.cathedraName,instituteName:req.body.instituteName}};
	Student.updateOne({"_id": req.params._id}, newStudent, function (err,user) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			res.json(200);
		}
	});
};

// Удалить существующего пользователя 
StudentController.destroy = function (req, res) { 
	console.log("Вызвано действие: удалить студента");
	var _id = req.params._id;
	Student.find({"_id": _id}, function (err, result) {
		if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
		        console.log("Удаляем пользователя");
				Student.deleteOne({"_id":_id}, function (err, user) {
					if (err !== null) {
						res.status(500).json(err);
					} else {
						res.json(200);
					}
				});
        } else {
            res.status(404).send("Пользователь не существует");
            console.log(err);   
        }
	});
}

module.exports = StudentController;