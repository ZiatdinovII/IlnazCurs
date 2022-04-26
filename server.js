var express = require("express"),
	http = require("http"),
    user_controller = require("./controllers/user_controller")
	mongoose = require("mongoose"),
	database = 'Ilnaz'; 
	app = express(); 

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

app.get("/users", user_controller.index); 
app.post("/users", user_controller.create); 
app.get("/users/:username", user_controller.show);
app.put("/users/:username", user_controller.update);
app.delete("/users/:username", user_controller.destroy);  

// подключаемся к хранилищу данных Books в Mongo
mongoose.connect('mongodb://localhost/' + database, {
		useNewUrlParser: true,
		useUnifiedTopology: true 
}).then(res => {
	console.log("DB ", database, " Connected!")
}).catch(err => {
	console.log(Error, err.message);
});
http.createServer(app).listen(3000);
