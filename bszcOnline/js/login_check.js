var logincookie = document.cookie;
var userName = null;	
var password = null;
$(document).ready(function(){
	//console.log(logincookie);
	if (logincookie){
		var arr = logincookie.split(';');
		for( var i=0; i<arr.length; i++){
			var cookie = arr[i];
			var cookiePair = cookie.split('=');
			if (cookiePair[0].trim() == 'userName'){
				userName = cookiePair[1];
			}else if (cookiePair[0].trim() == 'password'){
				password = cookiePair[1];
			}
		}

		//ajax验证用户存在
		var aj = $.ajax({
			url:'login_ajax.php',
			data:{userName:userName,password:password},
			cache:false,
			dataType:'json',
			success:function(data){
				//console.log(data);
				if(data){
					login_in(data);
				}else{
					console.log("shibai");
				}
			},
			error:function(){
				console.log("yichang");
			}
		});
	}
});
function login_in(name){
	//console.log(name);
	$("#login_name").html("<a href='personal.html'>"+name+"</a>");
	$("#register_quit").html("<a href='#'>退出</a>");
	$("#register_quit").click(function(){
		//退出登录状体
		console.log(123);
		var myDate = new Date();
		if (logincookie){
			var arr = logincookie.split(';');
			for( var i=0; i<arr.length; i++){
				var cookie = arr[i];
				var cookiePair = cookie.split('=');
				document.cookie=cookiePair[0]+"=''; expires="+myDate.toGMTString(); 
			}
		}
		history.go(0);
	});
}