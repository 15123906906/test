$(document).ready(function(){
	$("#per_head div").eq(0).addClass("car_per");
	$("#per_head div").eq(1).click(function(){
		self.location = 'personal_1.html';
	});
	per_order_load();
	//添加取消订单事件
	$(".order_cancel").click(function(){
		var orderID = $(this).parent().prev().children().eq(1).val();
		var car = $(this).parent().parent().prev().children().eq(0).children().eq(0).html();
		var orderNum = $(this).parent().parent().prev().children().eq(1).children().eq(0).html();
		order_cancel(orderID,orderNum,car);
		//取消订单函数
	});

	//添加支付按钮事件
	$(".order_pay").click(function(){
		var orderID = $(this).next().val();
		order_pay(orderID);
		self.location = 'personal.html';
	});

});

//订单支付
function order_pay(orderID){
	var order_pay_aj = $.ajax({
		url:'order_pay.php',
		data:{orderID:orderID},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				per_order_load();
				alert("订单支付成功!");
			}else{
				console.log("个人订单确认支付失败1！");
			}
		},
		error:function(){
			console.log("个人订单确认支付失败2！");
		}
	});
}

//取消订单
function order_cancel(orderID,orderNum,car){
	var order_cancel_aj = $.ajax({
		url:'order_cancel.php',
		data:{orderID:orderID,orderNum:orderNum,car:car},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				per_order_load();
				alert("订单取消成功!");
			}else{
				console.log("个人订单取消失败1！");
			}
		},
		error:function(){
			console.log("个人订单取消失败2！");
		}
	});
}

//获取订单ID、汽车ID、数量、总价
function per_order_load(){
	var per_order_load_aj = $.ajax({
		url:'per_order_load.php',
		data:{userName:userName},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				per_order_loading(data);
			}else{
				console.log("个人订单加载失败2！");
			}
		},
		error:function(){
			console.log("个人订单加载失败2！");
		}
	});
}

//获取租车时长、取车时间、取车地址、是否付款、汽车图片、汽车单价、汽车车型
function per_order_loading(data){
	$("#per_order_box").empty();
	for(var i=0; i<data.length; i++){
		var orderID = data[i]['orderID'];
		var per_orderi_load = $.ajax({
			url:'per_orderi_load.php',
			data:{orderID:orderID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data1){
				if(data1){
					per_order_loaded(data[i],data1);
				}else{
					console.log("个人订单加载失败3！");
				}
			},
			error:function(){
				console.log("个人订单加载失败4！");
			}
		});
	}
}

//汽车图片、汽车单价、汽车车型
function per_order_loaded(data,data1){
	var orderID = data['orderID'];
	var carID = data['carID'];
	var orderNum = data['orderNum'];
	var orderPirce = data['orderPirce'];
	var orderStart = data1['orderStart'];
	var orderStop = data1['orderStop'];
	var getTime = data1['getTime'];
	var address = data1['address'];
	var orderPay = data1['orderPay'];

	var car_msg_order_aj = $.ajax({
		url:'car_msg_order.php',
		data:{carID:carID},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data2){
			if(data2){
				var Pirce = data2['Pirce'];
				var imgLink = data2['imgLink'];
				var car = data2['car'];
				//动态添加订单
				if(orderPay == false ){
					orderPay = "未支付";
					$("#per_order_box").append("<div class='per_order'><img src='"+imgLink+"'/><ul class='per_order_text'><li><span class='car_name'>"+car+"</span><span class='car_pirce'>￥"+Pirce+"/日</span></li><li>数量：<span>"+orderNum+"</span></li><li>租车时长：<span>"+orderStart+"</span> 至 <span>"+orderStop+"</span></li><li>取车时间：<span>"+getTime+"</span></li><li>取车地址：<span>"+address+"</span></li></ul><ul class='per_order_btn'><li><span class='order_pirce'>￥"+orderPirce+"</span><span class='paying'>"+orderPay+"</span></li><li><input class='order_pay' type='button' value='订单支付'/><input type='hidden' value='"+orderID+"'/></li><li><input class='order_cancel' type='button' value='取消订单'/></li></ul><div class='clr'></div></div>");
				}else if(orderPay == true){
					orderPay = "已支付";
					$("#per_order_box").append("<div class='per_order'><img src='"+imgLink+"'/><ul class='per_order_text'><li><span class='car_name'>"+car+"</span><span class='car_pirce'>￥"+Pirce+"/日</span></li><li>数量：<span>"+orderNum+"</span></li><li>租车时长：<span>"+orderStart+"</span> 至 <span>"+orderStop+"</span></li><li>取车时间：<span>"+getTime+"</span></li><li>取车地址：<span>"+address+"</span></li></ul><ul class='per_order_btn'><li><span class='order_pirce'>￥"+orderPirce+"</span><span class='paying'>"+orderPay+"</span></li><li><input type='hidden' value='"+orderID+"'/></li></ul><div class='clr'></div></div>");
				}
			}else{
				console.log("个人订单加载失败5！");
			}
		},
		error:function(){
			console.log("个人订单加载失败6！");
		}
	});
}