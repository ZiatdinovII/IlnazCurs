var main = function () {
	"use strict";
	var $input = $("<input placeholder='Имя пользователя'>").addClass("username"),
		$butRegister = $("<button>").text("Зарегистрироваться"),
		$butLogin = $("<button>").text("Войти"),
		$butDestroy = $("<button>").text("Удалить из системы");
	$("main .authorization").append($input);
	$("main .authorization").append($butDestroy);
	$("main .authorization").append($butLogin);
	$("main .authorization").append($butRegister);

};

$(document).ready(function() {
		main();
});
