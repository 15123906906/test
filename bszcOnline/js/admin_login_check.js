var adminlogincookie = document.cookie;
var AdminUserName = null;	
var AdminPwd = null;
$(document).ready(function(){
	if(adminlogincookie == ''){
		window.location.href='admin_login.html';
	}
	if (adminlogincookie){
		var arr = adminlogincookie.split(';');
		for( var i=0; i<arr.length; i++){
			var cookie = arr[i];
			var cookiePair = cookie.split('=');
			if (cookiePair[0].trim() == 'AdminUserName'){
				AdminUserName = cookiePair[1];
			}else if (cookiePair[0].trim() == 'AdminPwd'){
				AdminPwd = cookiePair[1];
			}
		}

		//ajax验证用户存在
		var aj = $.ajax({
			url:'admin_login_ajax.php',
			data:{AdminUserName:AdminUserName,AdminPwd:AdminPwd},
			cache:false,
			dataType:'json',
			success:function(data){
				//console.log(data);
				if(data){
					login_in(data);
				}else{
					console.log("shibai");
					window.location.href='admin_login.html';
				}
			},
			error:function(){
				console.log("yichang");
				window.location.href='admin_login.html';
			}
		});
	}
});
function login_in(name){
	//console.log(name);
	$("#login_name").html("<a href=''>你好！"+name+"管理员</a>");
	$("#register_quit").html("<a href='admin_login.html'>退出</a>");
	$("#register_quit").click(function(){
		//退出登录状体
		console.log(123);
		var myDate = new Date();
		if (adminlogincookie){
			var arr = adminlogincookie.split(';');
			for( var i=0; i<arr.length; i++){
				var cookie = arr[i];
				var cookiePair = cookie.split('=');
				document.cookie=cookiePair[0]+"=''; expires="+myDate.toGMTString(); 
			}
		}
		history.go(0);
	});
}