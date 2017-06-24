var carID='';
var orderStart='';
var orderStop='';
var getTime='';
var orderNum='';
var stock='';
var pirce='';
var addr='';
var car='';

$(document).ready(function(){
	url_get_carID();
	words_load();	//留言加载

	var start = {
		skinCell:"jedatered",
	    format: 'YYYY-MM-DD',
	    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
	    //festival:true,
	    maxDate: '2099-06-16 23:59:59', //最大日期
	    choosefun: function(elem,datas){
	        end.minDate = datas; //开始日选好后，重置结束日的最小日期
	        endDates();
	    },
	    okfun:function (elem,datas) {
	        alert(datas)
	    }
	};
	var end = {
		skinCell:"jedatered",
	    format: 'YYYY-MM-DD',
	    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
	    //festival:true,
	    maxDate: '2099-06-16 23:59:59', //最大日期
	    choosefun: function(elem,datas){
	        start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
	    }
	};
	function endDates() {
	    end.trigger = false;
	    $("#inpend").jeDate(end);
	}
	//租车时长日期选择
	$("#inpstart").jeDate(start);
	$("#inpend").jeDate(end);

	//取车整点时间
	$("#datehz").jeDate({
		skinCell:"jedatered",
	    //isinitVal:true,
	    //festival:true,
	    //ishmsVal:false,
	    minDate: $.nowDate({DD:0}),
	    maxDate: '2099-06-16 23:59:59',
	    format:"hh:zz",
	    zIndex:3000,
	});

	//加载汽车租赁信息
	car_msg_load();

	//信息添加按钮变化
	$("#in_msg").children().eq(0).keyup(function(){
		var words_in = $("#in_msg").children().eq(0).val();
		if( words_in.length<5){
			$("#add_msg").removeClass("add_msg_in");
		}else if(words_in.length>=5){
			$("#add_msg").addClass("add_msg_in");
		}
	});

	//添加留言
	$("#add_msg").click(function(){
		var words_in = $("#in_msg").children().eq(0).val();
		if(userName == null){
			alert("请先登录!");
		}else if(words_in == ''){
			alert("请输入留言！");
		}else if(words_in.length > 150){
			alert("请将字数限制在150字以内！");
		}else if(words_in.length>=5){
			var words_upload_aj = $.ajax({
				url:'words_upload.php',
				data:{words:words_in,userName:userName,carID:carID},
				cache:false,
				dataType:'json',
				success:function(data){
					if(data){
						$("#in_msg").children().eq(0).val('');//清空输入框
						$("#add_msg").removeClass("add_msg_in");
						words_load();//重新加载留言
						alert("留言添加成功！");
					}else{
						console.log("留言上传失败1");
					}
				},
				error:function(){
					console.log("留言上传失败2");
				}
			});
				
		}		
	});

	//确认下单
	$("#pro_pay").click(function(){
		if($("#inpstart").val() == ''){
			alert("请输入开始时间!");
		}else if($("#inpend").val() == ''){
			alert("请输入结束时间!");
		}else if($("#datehz").val() == ''){
			alert("请输入取车时间!");
		}else if(stock == 0){
			alert("库存不足");
		}else{
			orderStart = $("#inpstart").val();
			orderStop = $("#inpend").val();
			getTime = $("#datehz").val();
			orderNum = $("#pro_num").val();
			addr = $("#address").val();
			console.log(orderNum);
			var order_sure_aj = $.ajax({
				url:'order_sure.php',
				data:{addr:addr,userName:userName,carID:carID,pirce:pirce,stock:stock,orderNum:orderNum,orderStart:orderStart,orderStop:orderStop,getTime:getTime},
				cache:false,
				dataType:'json',
				success:function(data){
					if(data){
						console.log(data);
						car_msg_load();
						alert("订单已提交，页面将跳转到个人订单中心！");
						self.location = 'personal.html';
					}else{
						console.log("订单上传失败1");
					}
				},
				error:function(){
					console.log("订单上传失败2");
				}	
			});
		}
	});
});

//加载汽车租赁信息
function car_msg_load(){
	var car_msg_load_aj = $.ajax({
		url:'car_msg_load.php',
		data:{carID:carID},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){
				pirce = data['pirce'];
				stock = data['stock'];
				car = data['car']
				$("#product_detail h2").eq(0).html(car);
				$("#pro_price").html("￥"+pirce+"/日");
				$("#pro_num").empty();
				if(stock == 0)
				{
					$("#pro_num").append("<option value='0'>0</option>");
				}else{
					for(var i=1; i<=stock; i++){
						$("#pro_num").append("<option value='"+i+"'>"+i+"</option>");
					}
				}
			}else{
				console.log("汽车信息加载失败1");
			}
		},
		error:function(){
			console.log("汽车信息加载失败2");
		}
	});
	var car_img_load_aj = $.ajax({
		url:'car_img_load.php',
		data:{carID:carID},
		cache:false,
		dataType:'json',
		success:function(data1){
			if(data1){
				$("#product_detail img").attr("src",data1['imgLinkBig']);
			}else{
				console.log("汽车图片信息加载失败1");
			}
		},
		error:function(){
			console.log("汽车图片加载失败2");
		}
	});
}

function url_get_carID(){
	var url = location.search;
	var getID = url.split("=");
	carID = getID[1];
}

//留言加载函数
function words_load(){
	var words_load_aj = $.ajax({
		url:'words_load.php',
		data:{carID:carID},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){
				words_loaded(data);
			}else{
				console.log("留言加载失败1");
			}
		},
		error:function(){
			console.log("留言加载失败2");
		}
	});
}

//完成加载
function words_loaded(data){
	$("#word_box").empty();
	for(var i=0; i<data.length; i++){
		var userID = data[i]['userID'];
		var words = data[i]['words'];
		var wordsDate = data[i]['wordsDate'];
		var user_msg = '';

		//ajax请求用户信息
		var user_msg_aj = $.ajax({
			url:'user_msg_get.php',
			data:{userID:userID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data){
				if(data){
					if(data['gender'] == '男'){
						user_msg = data['name'].charAt(0)+"先生";
					}else if(data['gender'] == '女'){
						user_msg = data['name'].charAt(0)+"女士";
					}
				}else{
					console.log("留言加载失败3");
				}
			},
			error:function(){
				console.log("留言加载失败4");
			}
		});
		//动态刷新页面
		$("#word_box").append("<div class='words_box'><img src='images/uer_img.png'><div class='text_box'><h3>"+user_msg+"</h3><p>"+words+"</p></div><h4>"+wordsDate+"</h4></div>");
	}
}