var main = function (UsersObjects) {
	"use strict";
	var $input = $("<input placeholder='Имя пользователя'>").addClass("username"),
		$butLogin = $("<button>").text("Войти")

	// $butRegister.on("click", function() {
	// 	var username = $input.val();
	// 	console.log(username);

	// 	if (username !== null && username.trim() !== "") {
	// 		var newUser = {"username": username};
	// 		$.post("users", newUser, function(result) {
	// 			console.log(result);
	// 			// отправляем на клиент
	// 			UsersObjects.push(newUser);
	// 		}).done(function(responde) {
	// 			console.log(responde);
	// 			alert('Аккаунт успешно создан!');
	// 			$butLogin.trigger("click");
	// 		}).fail(function(jqXHR, textStatus, error) {
	// 			console.log(error);
	// 			if (jqXHR.status === 501) {
	// 				alert("Такой логин уже зарегистрирован в системе!\nВведите другой ");
	// 			} else {					
	// 				alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
	// 			}
	// 		});
	// 	}
		
	// });

	$butLogin.on("click", function() {
		var username = $input.val();
		var user = null,flag = false;
		if (username !== null && username.trim() !== "") {
			for(var i = 0;i < UsersObjects.length;i++){
				if(UsersObjects[i].username === username){
					user = UsersObjects[i];
					flag = true;
				}
			}
			if(flag){
				if(user.mode === "admin"){
					$.ajax({
						'url': '/users/'+ user.username,
						'type': 'GET'
					}).done(function(responde) {
						window.location.replace('users/' + user.username + '/admin.html');
					}).fail(function(jqXHR, textStatus, error) {
						console.log(error);
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
					});
				}
				if(user.mode === "person"){
					$.ajax({
						'url': '/users/'+ user.username,
						'type': 'GET'
					}).done(function(responde) {
						window.location.replace('users/' + user.username + '/person.html');
					}).fail(function(jqXHR, textStatus, error) {
						console.log(error);
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
					});
				}
			}
			else{
				alert("Такого пользователя не существует.");
			}	
		}
	})
	// $butDestroy.on("click", function() {
	// 	if ($input.val() !== "") {
	// 		if ($input.val() !== null && $input.val().trim() !== "") {
	// 			var username = $input.val();
	// 			if (confirm("Вы уверены, что хотете удалить профиль " + username + "?")) {
	// 				$.ajax({
	// 					'url': '/users/'+username,
	// 					'type': 'DELETE',
	// 				}).done(function(responde) {
	// 					console.log(responde);
	// 					$input.val("");
	// 					alert('Ваш профиль успешно удален');
	// 				}).fail(function(jqXHR, textStatus, error) {
	// 					console.log(error);
	// 					alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
	// 				});
	// 			}
	// 		}
	// 	}
	// });

	$("main .authorization").append($input);
	// $("main .authorization").append($butDestroy);
	$("main .authorization").append($butLogin);
	// $("main .authorization").append($butRegister);

}

$(document).ready(function() {
	$.getJSON("/users", function (UsersObjects) {
		main(UsersObjects);
	});
}); 
