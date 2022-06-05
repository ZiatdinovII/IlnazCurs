var main = function (Objects) {
	"use strict";
	var tabs = [];

	tabs.push({
		"name": "Список всех пользователей",
	});
	tabs.push({
		"name": "Добавить пользователя",
	});

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
                $pricelist = $("<div class = \"users\">");
                $pricelist.append($("<h4>").text("Логин"));
                $pricelist.append($("<h4>").text("Роль"));
                $pricelist.append($("<p>"));
                $pricelist.append($("<p>"));
                for (var i = 0; i <Objects.length; i++) {
                    if(Objects[i].username === location.href.split("/")[4]) continue;
                    $pricelist.append($("<p>").text(Objects[i].username));
                    $pricelist.append($("<p>").text(Objects[i].mode));
                    $pricelist.append(RedUser(Objects[i],function(){
                        console.log("Пользователь изменён!");
                    }));
                    $pricelist.append(DelUser(Objects[i],function(){
                        console.log("Пользователь удалён!");
                    }));
                }    
                $("main .content").append($pricelist);
            } 
            else if ($element.parent().is(":nth-child(2)")) {
                var $input = $("<input placeholder='Имя пользователя'>").addClass("username"),
                $butRegister = $("<button>").text("Зарегистрировать"),
                $select1 = $("<select>").addClass("role");
                $select1.append(($("<option>")).text("admin"));
                $select1.append(($("<option>")).text("person"));
                $butRegister.on("click", function() {
                    var username = $input.val(),
                        mode = $select1.val();
                    console.log(username);
                    if (username !== null && username.trim() !== "" ) {
                        var newUser = {"username": username,"mode":mode};
                        $.post("/users", newUser, function(result) {
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
                    else{
                        alert("Ошибка ввода!");
                    }
                })
                $("main .content").append($input);
                $("main .content").append($select1);
                $("main .content").append($butRegister);                       
            };        
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
}
var RedUser = function(user, callback) {
    var $buttonRed = $("<button>").attr("href", "users/" + user._id);
    $buttonRed.text("Редактировать");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Сохранить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Логин");
        $lableFName = $("<label>").text("Роль");
        $select1 = $("<select>");
        $select1.append(($("<option class = \"option1\">")).text("admin"));
        $select1.append(($("<option class = \"option2\">")).text("person"));
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            var login = $(".content_popup_input_login").val(),
            role = $(".content_popup_input_role").val();
            console.log(role);
            if (login.trim() !== "") {
                $.ajax({
                    "url": "/users/" + user.username,
                    "type": "PUT",
                    "data": { "username": login, "mode": role },
                    success: function(responde){
                        popUpHideWithSuccess();
                    },
                    error: function(responde){
                        alert("error");
                    }
                }).done(function(responde) {
                    console.log(responde);
                }).fail(function(err) {
                    console.log("Произошла ошибка: " + err);
                });
            }
        });
        
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName);
            $popup.append($("<input>").attr("value",user.username).addClass("content_popup_input_login"));
            $popup.append($lableFName);
            $popup.append($select1.addClass("content_popup_input_role"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            
            $("main").append($content);
            if(user.mode === "admin") $(".option1").attr("selected","");
            else if(user.mode === "person") $(".option2").attr("selected","");
    
        return false;
    });

    return $buttonRed;
}
var DelUser = function(user, callback) {
    var $buttonDel = $("<button>").attr("href", "manager/" + user.username);
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
                'url': '/users/' + user.username,
                'type': 'DELETE',
                success: function(responde){
                    popUpHideWithSuccess();
                },
                error: function(responde){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            });    
        })
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
    setTimeout(() => {
    $(".content_container_popup").hide();
    location.reload();
    }, 3000);
    };
$(document).ready(function() {
	$.getJSON("/users",function(Objects){
        main(Objects);
    })
}); 