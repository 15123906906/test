var inputname = $("#userName");
var inputpwd = $("#password");
var inputpwd_1 = $("#password_1");

$(document).ready(function(){
	var verifyCode = new GVerify("code");
	$("#button").click(function(){
		var res = verifyCode.validate(document.getElementById("verify").value)
		if(inputname.val().trim().length<8){
			inputname.css("border","1px solid red");
			inputname.focus();
			//alert("用户名长度不合法");
		}else{
			if(inputpwd.val().trim().length<6){
				inputpwd.css("border","1px solid red");
				inputpwd.focus();
			}else if(inputpwd.val().trim() != inputpwd_1.val().trim()){
				inputpwd_1.css("border","1px solid red");
				inputpwd_1.focus();
			}else if(!res){
				alert("验证码错误");
			}else {
				$("#form").submit();
			}
		}
	});

	inputname.blur(function(){
		var uname = inputname.val().trim();

		//验证用户是否存在
		var aj = $.ajax({
			url:'userName_ajax.php',
			data:{userName:uname},
			cache:false,
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data == "true"){
					alert("用户已存在");
					inputname.val('');
					inputname.focus();
				}else{
					
				}
			},
			error:function(){
				console.log("yichang");
			}
		});

		if(uname.length<8 || uname.length>16){
			inputname.css("border","1px solid red");
			//inputname.focus();
		}else{
			inputname.css("border","1px solid green");
		}
	});
	inputpwd.keyup(function(){
		var pwd = inputpwd.val().trim();
		if(pwd.length<6){
			inputpwd.css("border","1px solid red");
		}else{
			var strength = pwdStrength(pwd);
			if(strength == 1){
				inputpwd.css("border","1px solid yellow");
			}
			if(strength == 2){
				inputpwd.css("border","1px solid #f0f000");
			}
			if(strength == 3){
				inputpwd.css("border","1px solid green");
			}
		}
	});

	function pwdStrength(pwd){
		var patt = /^([a-z]*|\d*|[^a-z0-9]*)$/i;
		if(patt.test(pwd)){
			return 1;
		}else{
			patt = /^[a-z0-9]*$/i;
			if(patt.test(pwd)){
				return 2;
			}else{
				return 3;
			}
		}
	}
	inputpwd_1.blur(function(){
		if(inputpwd.val().trim() != inputpwd_1.val().trim()){
			inputpwd_1.css("border","1px solid red");
		}else{
			inputpwd_1.css("border","1px solid green");
		}
	});
});