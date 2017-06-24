var name = '';
var IDCard = '';
var TelNum = '';
var email = '';

//页面加载时加载用户数据
$(document).ready(function(){
	//页面跳转按钮状态
	$("#per_head div").eq(1).addClass("car_per");
	$("#per_head div").eq(0).click(function(){
		self.location = 'personal.html';
	});


	var per_msg_aj = $.ajax({
		url:'per_msg_load.php',
		data:{userName:userName,password:password},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){
				name = data['name'];
				IDCard = data['IDCard'];
				TelNum = data['telNum'];
				email = data['email'];

				$("#per_name").html(name);
				$("#per_id").html(IDCard);
				$("#per_tel").html(TelNum);
				$("#per_email").html(email);
			}else{
				console.log("加载失败！");
			}
		},
		error:function(){
			console.log("加载失败！");
		}
	});
	

});
//页面加载时加载用户数据

//动态修改信息
var fixClick = 0;
$(document).ready(function(){
	
	$("#fix").click("click",function(){
		if (fixClick ==0 ) {
			$("#fix").removeClass("fix_bag");
			$("#fixed").addClass("fix_bag");
			fixClick = 1;
			fix();
		}
	});	
	$("#fixed").click("click",function(){
		if(fixClick == 1){
			$("#fixed").removeClass("fix_bag");
			$("#fix").addClass("fix_bag");
			fixClick = 0;
			fixed();
		}
	});	
});

function fix(){
	name = $("#per_name").html();
	IDCard = $("#per_id").html();
	TelNum = $("#per_tel").html();
	email = $("#per_email").html();

	$("#per_name").html("<input class='per_input' type='text' name='userName' value='"+name+"'/>");
	$("#per_id").html("<input class='per_input' type='text' name='IDCard' value='"+IDCard+"'/>");
	$("#per_tel").html("<input class='per_input' type='text' name='TelNum' value='"+TelNum+"'/>");
	$("#per_email").html("<input class='per_input' type='text' name='email' value='"+email+"'/>");
}

function fixed(){
	name = $("[name='userName']").val();
	IDCard = $("[name='IDCard']").val();
	TelNum = $("[name='TelNum']").val();
	email = $("[name='email']").val();

	//个人修改完成后，修改数据库数据
	var per_msg_aj_2 = $.ajax({
		url:'per_msg_fixed.php',
		data:{userName:userName,password:password,name:name,IDCard:IDCard,telNum:TelNum,email:email},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data == true){
				console.log("修改成功");
			}else{
				console.log("数据库更新失败！");
			}
		},
		error:function(){
			console.log("数据库更新失败！");
		}
	});

	$("#per_name").html(name);
	$("#per_id").html(IDCard);
	$("#per_tel").html(TelNum);
	$("#per_email").html(email);
}
//动态修改信息


