	
var main = function () {
	"use strict";
	var tabs = [];

	tabs.push({
		"name": "Список всех студентов",
	});

	tabs.push({
		"name": "Студенты по кафедрам",
	});

	tabs.push({
		"name": "Добавить студента",
	});

	tabs.push ({
		"name": "Выйти",
		"content":function() {
			document.location.href = "/index.html";
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);
	});

	
	// $(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	main();
}); 
