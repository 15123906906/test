var brand_check='';
var carStyleID_check='';
var car_check='';

$(document).ready(function(){

	$("#add_cancel").click(function(){
		window.parent.ifrdel();
	});
	$("#brand div textarea").blur(function(){
		var brand = $("#brand div textarea").val();
		brandCheck(brand);
		$("#carStyleId div textarea").val(brand_check);
	});

	$("#add_sure").click(function(){
		var brand = $("#brand div textarea").val();
		var carStyleID = $("#carStyleId div textarea").val();
		var car = $("#car div textarea").val();
		var stock = $("#stock div textarea").val();
		var pirce = $("#pirce div textarea").val();
		var summary = $("#summary div textarea").val();
		var imgLink = '';
		var imgLinkBig = '';

		brandCheck(brand);
		carStyleIDCheck(carStyleID);
		carCheck(car);

		if(brand_check != 'false' && brand_check != carStyleID){
			alert("改品牌以创建品牌编号");
			$("#carStyleId div textarea").val(brand_check);
		}

		if(brand == '' || carStyleID == '' || car == '' || stock == '' || pirce == '' || summary == ''){
			alert("输入不能有空值")
		}else if(carStyleID_check != 'false' && carStyleID_check != brand){
			alert("该品牌编号已被"+carStyleID_check+"占用，请重新输入！");
		}else if(car_check == 'true'){
			alert("车型重复，请重新输入！");
		}else if(carStyleID != parseInt(carStyleID) || carStyleID <= 0 ){
			alert("品牌编号请输入大于零的整数！");
		}else if(stock != parseInt(stock) || stock <= 0){
			alert("库存请输入大于零的整数！");
		}else if(pirce != parseInt(pirce) || pirce <= 0){
			alert("请输入大于零的整数作为价格！");
		}else{
			//上传小图片
			var imglittle = $("#add_img").children().get(0).files[0];
			if(imglittle != null){ 
	        	var formData = new FormData(); 	
	        	formData.append("myfile",imglittle);
	        	$.ajax({
	        		url:'img_up.php',  
		            type:'POST',  
		            data:formData,  
		            cache:false,  
		            async:false,
		            contentType: false,  
	      			processData: false, 
	      			dataType:'json',
		       		success:function(data){
		       			if(data){
		       				imgLink = data['file'];
		       				//console.log(data['file']);
		       			}else{
		       				console.log("l上传失败1");
		       			}
		       		},
		       		error:function(){
		       			console.log("l上传失败2");
		       		}
			    }); 
        	}else{
        		imgLink = "不加";
        	}
     
		    //上传大图片
		    var imgBig = $("#add_imgBig").children().get(0).files[0]; 
		    if(imgBig != null){
	        	var formData = new FormData(); 
	        	formData.append("myfile1",imgBig);
	        	$.ajax({
	        		url:'imgBig_up.php',  
		            type:'POST',  
		            data:formData,  
		            cache:false,  
		            async:false,
		            contentType: false,  
	      			processData: false, 
	      			dataType:'json',
		       		success:function(data1){
		       			if(data1){
		       				imgLinkBig = data1['file1'];
		       				//console.log(imgLinkBig);
		       			}else{
		       				console.log("b上传失败1");
		       			}
		       		},
		       		error:function(){
		       			console.log("b上传失败2");
		       		}
			    }); 
        	}else{
        		imgLinkBig = "不加";
        	}

        	//插入数据库数据
		    var add_car_msg_aj = $.ajax({
		    	url:'add_car_msg.php',
				data:{brand:brand,carStyleID:carStyleID,car:car,stock:stock,pirce:pirce,summary:summary,imgLink:imgLink,imgLinkBig:imgLinkBig},
				cache:false,
				async:false,
				dataType:'json',
				success:function(data){
					if(data){
						alert("汽车信息上传成功！");
						console.log(data);
						window.parent.ifrdel();
					}else{
						console.log("汽车信息上传失败1！");
					}
				},
				error:function(){
					console.log("汽车信息上传失败2！");
				}	

		    });

		}
	});
});
function brandCheck(brand){
	var brand_check_aj = $.ajax({
		url:'brand_check.php',
		data:{brand:brand},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				brand_check = data;
			}else{
				console.log("品牌编号重复查询失败1");
			}
		},error:function(){
			console.log("品牌编号重复查询失败2");
		}
	});
}

function carStyleIDCheck(carStyleID){
	var carStyleID_aj = $.ajax({
		url:'carStyleID_check.php',
		data:{carStyleID:carStyleID},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				carStyleID_check = data;
			}else{
				console.log("品牌编号重复查询失败1");
			}
		},error:function(){
			console.log("品牌编号重复查询失败2");
		}
	});
}
function carCheck(car){
	var carcheck_aj = $.ajax({
		url:'car_check.php',
		data:{car:car},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				car_check = data;
			}else{
				console.log("品牌编号重复查询失败1");
			}
		},error:function(){
			console.log("品牌编号重复查询失败2");
		}
	});
}