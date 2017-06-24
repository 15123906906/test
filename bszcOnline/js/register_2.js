$(document).ready(function(){
	$("#button").click(function(){
		if($("#name").val() == '' || $("#id").val() == '' || $("#tel").val() == '' || $("#email").val() == ''){
			alert("姓名/省份证号/手机号/电子邮箱不能为空！");
		}else{
			$("#form").submit();
		}
	});
});