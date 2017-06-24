var staffName = '';
var staffTel = '';

$(document).ready(function(){

	$("#add_cancel").click(function(){
		window.parent.ifrdel();
	});

	$("#add_sure").click(function(){
		staffName = $("#add_sure").parent().prev().children().eq(1).val();
		staffTel = $("#add_sure").parent().prev().children().eq(3).val();

		if(staffName == ''){
			alert("派送员姓名不能为空");
		}
		else if(staffTel == ''){
			alert("派送员电话不能为空");
		}else{
			console.log(staffName)
			console.log(staffTel)
			var add_sender_aj = $.ajax({
				url:'add_sender.php',
				data:{staffName:staffName,staffTel:staffTel},
				cache:false,
				async:false,
				dataType:'json',
				success:function(data){
					if(data){
						alert("派送员信息上传成功！");
						console.log(data);
						window.parent.ifrdel();
					}else{
						console.log("派送员信息上传失败1！");
					}
				},
				error:function(){
					console.log("派送员信息上传失败2！");
				}	
			});
		}
	});

});