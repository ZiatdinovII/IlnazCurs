var main = function (Objects) {
	"use strict";
	var tabs = [];

	tabs.push({
		"name": "Список всех студентов",
	});
	tabs.push({
		"name": "Список с поиском",
	});
    tabs.push({
        "name": "Добавить студента"
    })

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);
	});
    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click", function() {
            var $element = $(element),
            $pricelist;
            $butRegister = $("<button>").text("Изменить");

            $("main .content").empty();
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            if ($element.parent().is(":nth-child(1)")) {
                $pricelist = $("<div class = \"students\">");
                $pricelist.append($("<h4>").text("Фамилия"));
                $pricelist.append($("<h4>").text("Имя"));
                $pricelist.append($("<h4>").text("Отчество"));
                $pricelist.append($("<h4>").text("Дата рождения"));
                $pricelist.append($("<h4>").text("Номер группы"));
                $pricelist.append($("<h4>").text("Кафедра"));
                $pricelist.append($("<h4>").text("Институт"));
                $pricelist.append($("<p>"));
                $pricelist.append($("<p>"));
                for (var i = 0; i <Objects.length; i++) {
                    $pricelist.append($("<p>").text(Objects[i].surname));
                    $pricelist.append($("<p>").text(Objects[i].name));
                    $pricelist.append($("<p>").text(Objects[i].fatherName));
                    $pricelist.append($("<p>").text(Objects[i].date));
                    $pricelist.append($("<p>").text(Objects[i].group));
                    $pricelist.append($("<p>").text(Objects[i].cathedraName));
                    $pricelist.append($("<p>").text(Objects[i].instituteName));
                    $pricelist.append(RedUser(Objects[i],function(){
                        console.log("Студент изменён!");
                    }));
                    $pricelist.append(DelUser(Objects[i],function(){
                        console.log("Студент удалён!");
                    }));
                }    
                $("main .content").append($pricelist);
            } 
            else if ($element.parent().is(":nth-child(3)")) {
                var $input = $("<input placeholder='Фамилия'>").addClass("surname"),
                    $input1 = $("<input placeholder='Имя'>").addClass("name"),
                    $input2 = $("<input placeholder='Отчество'>").addClass("fatherName"),
                    $input3 = $("<input placeholder='Дата рождения'>").addClass("date"),
                    $input4 = $("<input placeholder='Группа'>").addClass("group"),
                    $input5 = $("<input placeholder='Кафедра'>").addClass("cathedraName"),
                    $input6 = $("<input placeholder='Институт'>").addClass("instituteName"),
                    $butRegister = $("<button>").text("Добавить");
                $butRegister.on("click", function() {
                    var surname = $input.val(),
                        name = $input1.val(),
                        fatherName = $input2.val(),
                        date = $input3.val(),
                        group = $input4.val(),
                        cathedraName = $input5.val(),
                        instituteName = $input6.val();
                    if (surname.trim() !== "" && name.trim() !== "" && fatherName.trim() !== "" && date.trim() !== "" && group.trim() !== "" && cathedraName.trim() !== "" && instituteName.trim() !== "") {
                        var newUser = {"surname": surname,"name":name,"fatherName":fatherName,"date":date,"group":group,"cathedraName":cathedraName,"instituteName":instituteName};
                        $.post("/students", newUser, function(result) {
                            console.log(result);
                            // отправляем на клиент
                            Objects.push(newUser);
                        }).done(function(responde) {
                            console.log(responde);
                            alert('Успешно!');
                        }).fail(function(jqXHR, textStatus, error) {
                            console.log(error);
                            if (jqXHR.status === 501) {
                                alert("Такой логин уже зарегистрирован в системе!\nВведите другой ");
                            } else {					
                                alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
                            }
                        });
                    }
                })
                $("main .content").append($input);
                $("main .content").append($input1);
                $("main .content").append($input2);
                $("main .content").append($input3);
                $("main .content").append($input4);
                $("main .content").append($input5);
                $("main .content").append($input6);
                $("main .content").append($butRegister);  
                $(".date").mask('99.99.9999'); 
                $(".group").mask('9999');                 
            }
            else if ($element.parent().is(":nth-child(2)")){
                        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Сохранить"),
                $buttonCancle = $("<button>").text("Отмена"),
                $lableName = $("<label>").text("Введите категорию: "),
                $lableFName = $("<label>").text("Введите критерий поиска: "),
                $select1 = $("<select>");
                $select1.append(($("<option>")).text("Фамилия"));
                $select1.append(($("<option>")).text("Имя"));
                $select1.append(($("<option>")).text("Отчетсво"));
                $select1.append(($("<option>")).text("Дата рождения"));
                $select1.append(($("<option>")).text("Группа"));
                $select1.append(($("<option>")).text("Кафедра"));
                $select1.append(($("<option>")).text("Институт"));
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button"); 
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($select1.addClass("content_popup_input_role"));
        $popup.append($lableFName);
        var $input1 = $("<input>").addClass("content_popup_input_login");
        $popup.append($input1);
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $content.append($popup);
        $buttonZap.on("click", function() {
            popUpHideWithSuccess();
            var category = $select1.val(),
            poisk = $input1.val();
            if (poisk.trim() !== "") {
                var temp = [];
                    for(var i = 0;i<Objects.length;i++){
                        if(category === "Фамилия"){
                            if(Objects[i].surname === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Имя"){
                            if(Objects[i].name === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Отчество"){
                            if(Objects[i].fatherName === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Дата рождения"){
                            if(Objects[i].date === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Группа"){
                            if(Objects[i].group === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Кафедра"){
                            if(Objects[i].cathedraName === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                        if(category === "Институт"){
                            if(Objects[i].instituteName === poisk){
                                temp.push(Objects[i]);
                            }
                        }
                    }
                    $pricelist = $("<div class = \"students\">");
                    $pricelist.append($("<h4>").text("Фамилия"));
                    $pricelist.append($("<h4>").text("Имя"));
                    $pricelist.append($("<h4>").text("Отчество"));
                    $pricelist.append($("<h4>").text("Дата рождения"));
                    $pricelist.append($("<h4>").text("Номер группы"));
                    $pricelist.append($("<h4>").text("Кафедра"));
                    $pricelist.append($("<h4>").text("Институт"));
                    $pricelist.append($("<p>"));
                    $pricelist.append($("<p>"));
                    for (var i = 0; i <temp.length; i++) {
                        $pricelist.append($("<p>").text(temp[i].surname));
                        $pricelist.append($("<p>").text(temp[i].name));
                        $pricelist.append($("<p>").text(temp[i].fatherName));
                        $pricelist.append($("<p>").text(temp[i].date));
                        $pricelist.append($("<p>").text(temp[i].group));
                        $pricelist.append($("<p>").text(temp[i].cathedraName));
                        $pricelist.append($("<p>").text(temp[i].instituteName));
                        $pricelist.append(RedUser(temp[i],function(){
                            console.log("Студент изменён!");
                        }));
                        $pricelist.append(DelUser(temp[i],function(){
                            console.log("Студент удалён!");
                        }));
                    }    
                    $("main .content").append($pricelist);
                    }
            });
        $("main").append($content);
            }        
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
}
var RedUser = function(student, callback) {
    var $buttonRed = $("<button>").attr("href", "student/" + student._id);
    $buttonRed.text("Изменить");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Сохранить"),
        $buttonCancle = $("<button>").text("Отмена");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            var newStudentSurname = $(".content_popup_input_surname").val(),
            newStudentName = $(".content_popup_input_name").val(),
            newStudentFather = $(".content_popup_input_fatherName").val(),
            newStudentDate = $(".content_popup_input_date").val(),
            newStudentGroup = $(".content_popup_input_group").val(),
            newStudentCathedra = $(".content_popup_input_cathedraName").val(),
            newStudentInstitute = $(".content_popup_input_instituteName").val();
            if (newStudentName.trim() !== "" &&  newStudentCathedra.trim() !== "" && newStudentDate.trim() !== "" && newStudentFather.trim() !== "" && newStudentGroup.trim() !== "" && newStudentInstitute.trim() !== "" && newStudentSurname.trim() !== "") {
                $.ajax({
                    "url": "/students/" + student._id,
                    "type": "PUT",
                    "data": { "surname": newStudentSurname,"name":newStudentName,"fatherName":newStudentFather,"date":newStudentDate,"group":newStudentGroup,"cathedraName":newStudentCathedra,"instituteName":newStudentInstitute },
                    success: function(responde){
                        popUpHideWithSuccess1();
                    },
                    error: function(responde){
                        alert("error");
                    }
                }).done(function(responde) {
                    console.log(responde);
                }).fail(function(err) {
                    console.log("Произошла ошибка: " + err);
                });
                location.reload();
            }
        });
        
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($("<input>").attr("value",student.surname).addClass("content_popup_input_surname"));
            $popup.append($("<input>").attr("value",student.name).addClass("content_popup_input_name"));
            $popup.append($("<input>").attr("value",student.fatherName).addClass("content_popup_input_fatherName"));
            $popup.append($("<input>").attr("value",student.date).addClass("content_popup_input_date"));
            $popup.append($("<input>").attr("value",student.group).addClass("content_popup_input_group"));
            $popup.append($("<input>").attr("value",student.cathedraName).addClass("content_popup_input_cathedraName"));
            $popup.append($("<input>").attr("value",student.instituteName).addClass("content_popup_input_instituteName"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);
    
        return false;
    });

    return $buttonRed;
}
var DelUser = function(student, callback) {
    var $buttonDel = $("<button>").attr("href", "students/" + student._id);
    $buttonDel.text("Удалить");
    $buttonDel.on("click", function() {
    var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Удалить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Точно удалить?");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            $.ajax({
                'url': '/students/' + student._id,
                'type': 'DELETE',
                success: function(responde){
                    popUpHideWithSuccess1();
                },
                error: function(responde){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            })
        }
        )
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName);
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);

        return false;
    });
    return $buttonDel;
}
var popUpHideWithCancle = function(){
    $(".content_container_popup").remove();
    }
    
 var popUpHideWithSuccess =  function(){
    $(".content_popup").empty();
    $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
    $(".content_container_popup").remove();
    };
    var popUpHideWithSuccess1 =  function(){
        $(".content_popup").empty();
        $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
        setTimeout(() => {
        $(".content_container_popup").remove();
        }, 3000);
        location.reload();
        };
$(document).ready(function() {
	$.getJSON("/students",function(Objects){
        main(Objects);
    })
}); 