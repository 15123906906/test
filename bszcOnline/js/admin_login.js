
$(document).ready(function(){
	$("#login").children().eq(0).children().eq(4).children().eq(0).click(function(){
		var name = $("#login_name").children().eq(1).val();
		var pwd = $("#login_pwd").children().eq(1).val();
		if( name == '' || pwd ==''){
			alert("用户名/密码不能为空");
		}else{
			var login_aj = $.ajax({
				url:'admin_login.php', 
		        type:'POST',  
		       	data:$('#login').serialize(),
				async:false,
		   		success:function(data){
		   			if(data){
		   				console.log(data);
		   				if(data == '账号错误')
		   					alert("账号错误");
		   				else if(data == '密码错误')
		   					alert("密码错误");
		   				else if(data == '登录成功'){
		   					window.location.href='back_car_control.html';
		   				}
		   			}else{
		   				console.log("上传失败1");
		   			}
		   		},
		   		error:function(){
		   			console.log("上传失败2");
		   		}
			});
		}
	});
});