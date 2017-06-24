var select = "全部订单";

$(document).ready(function(){
	order_load();//订单加载

	$("#select li span").click(function(){
		$("#select li span").removeClass("clicked");
		$(this).addClass("clicked");
		select = $(this).html();
		order_load()
	});
});

//加载翻页按钮
function page(data){
	$("#page_box").empty();
	var productNum = data.length;
	var pageNum = parseInt(productNum/10)+1;
	var pageOn = 1;
	var pageWidth = (pageNum+2)*45+1;
	$("#page_box").css("width",pageWidth);
	//console.log(pageNum);
	$("#page_box").append("<span id='subling_page'></span>");
	if(pageNum <= 10){
		for(var i=1; i<=pageNum; i++){
			$("#page_box").append("<span class='page_click'>"+i+"</span>");
		}
	}else if(pageNum > 10){
		for(var i=1; i<=10; i++){
			$("#page_box").append("<span class='page_click'>"+i+"</span>");
		}
	}
	$("#page_box").append("<span id='next_page'></span>");
	$("#page_box").append("<div class='clr'></div>");

	page_change(pageOn,pageNum,productNum);
	$("#next_page").click(function(){//下一页
		if(pageOn<pageNum){
			pageOn++;
		}
		page_change(pageOn,pageNum,productNum);
	});
	$("#subling_page").click(function(){//上一页
		if(pageOn>1){
			pageOn--;
		}
		page_change(pageOn,pageNum,productNum);
	});
	$(".page_click").click(function(){//点击页数
		pageOn = $(this).html();
		page_change(pageOn,pageNum,productNum);
	});
	/*var $_product = $(".product");
	console.log(product[0]);*/
}

function page_change(pageOn,pageNum,productNum){
	$("body").scrollTop(0);
	var $_product = $(".product")
	var product_start = (pageOn-1)*10;
	var last_pageNum = productNum-(pageNum-1)*10;
	$_product.css("display","none");
	if(pageOn < pageNum){
		for(var i=0; i<10; i++){
			$_product.eq(product_start).css("display","block");
			product_start++;
		}
	}else if(pageOn == pageNum){
		for(var i=0; i<last_pageNum; i++){
			$_product.eq(product_start).css("display","block");
			product_start++;
		}
	}
	$(".page_click").removeClass("page_on");
	$(".page_click").eq(pageOn-1).addClass("page_on");
}


//加载订单
function order_load(){
	$("#order_list").empty();
	var order_load_aj = $.ajax({
		url:'order_load.php',
		data:{select:select},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){	
				load(data);
				//console.log(data);
				page(data);//调用翻页按钮函数
			}else{
				console.log("加载失败1！");
			}
		},
		error:function(){
			console.log("加载失败2！");
		}
	});
}

function load(data){
	for(var i=0; i<data.length; i++){
		var orderID = data[i]['orderID'];
		var orderDate = data[i]['orderDate'];
		var orderStart = data[i]['orderStart'];
		var orderStop = data[i]['orderStop'];
		var getTime = data[i]['getTime'];
		var dispatching = data[i]['dispatching'];
		var address = data[i]['address'];
		var send = data[i]['send'];
		var arrive = data[i]['arrive'];
		var confirmDate = data[i]['confirmDate'];
		var orderPay = data[i]['orderPay'];
		var carID = '';
		var orderNum = '';
		var orderPirce = '';
		var userName = '';
		var imgLink = '';
		var car = '';
		var pirce = '';
		var name = ''
		var telNum = '';
		var IDCard = '';
		var email = '';

		//更据订单号查询汽车信息，与用户信息
		var orders_aj = $.ajax({
			url:'get_orders.php',
			data:{orderID:orderID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data1){
				if(data1){
					carID = data1['carID'];
					orderNum = data1['orderNum'];
					orderPirce = data1['orderPirce'];
					userName = data1['userName'];
				}else{
					console.log("加载失败2！");
				}
			},
			error:function(){
				console.log("加载失败4！");
			}
		});

		var img_aj = $.ajax({//图片信息
			url:'img_addr_get.php',
			data:{carID:carID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data2){
				if(data2){
					imgLink = data2['imgLink'];
				}else{
					console.log("加载失败1！");
				}
			},
			error:function(){
				console.log("加载失败2！");
			}
		});

		var img_aj = $.ajax({//汽车信息
			url:'car_msg_get.php',
			data:{carID:carID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data3){
				if(data3){
					car = data3['car'];
					pirce = data3['pirce'];
				}else{
					console.log("加载失败1！");
				}
			},
			error:function(){
				console.log("加载失败2！");
			}
		});

		var user_aj = $.ajax({//用户信息
			url:'get_user.php',
			data:{userName:userName},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data4){
				if(data4){
					name = data4['name'];
					telNum = data4['telNum'];
					IDCard = data4['IDCard'];
					email = data4['email'];
				}else{
					console.log("加载失败1！");
				}
			},
			error:function(){
				console.log("加载失败2！");
			}
		});
		if(orderPay == 0){
			orderPay = "未支付";
		}
		else if(orderPay == 1){
			orderPay = "已支付";		
		}
		if(send == 0){
			send = "<input class='car_send' type='button' value='请选择汽车派送员'/>";
		}else{
			send = "<input type='button' value='"+send+"号派送员派送'/>";
		}
		if(arrive == 0){
			arrive = "<input class='order_finish' type='button' value='完成订单'/>";
		}else{
			arrive = "<input type='button' value='"+confirmDate+"已完成'/>"
		}
		if(select == "过时订单" && data !=''){
			arrive = '';
			send = '';
			over = "<input class='order_del' type='button' value='删除订单'>";
		}else{
			over = '';
		}
		$("#order_list").append("<div class='order_box'><img src='"+imgLink+"'/><ul class='order_msg'><li><span class='car_name'>"+car+"</span><span class='ar_pirce'>￥"+pirce+"/日</span></li><li>数量：<span>"+orderNum+"</span></li><li>租车时长：<span>"+orderStart+"</span> 至 <span>"+orderStop+"</span></li><li>取车时间：<span>"+getTime+"</span></li><li><span class='addr'><span class='addr_name'>取车地址：</span>"+address+"</span></li></ul><ul class='user_msg'><li><span class='user_name'>用户名：</span><span class='user_name_msg'>"+userName+"</span></li><li>姓名：<span>"+name+"</span></li><li>电话号码：<span>"+telNum+"</span></li><li>身份证号：<span>"+IDCard+"</span></li><li>电子邮件：<span>"+email+"</span></li></ul><ul class='order_btn'><li><span class='order_pirce'>"+orderPirce+"</span><span class='paying'>"+orderPay+"</span></li><li>"+send+over+"<input type='hidden' value='"+orderID+"' /></li><li>"+arrive+"</li></ul><div class='clr'></div></div>");
		

	}

	$(".car_send").click(function(){
		orderID = $(this).next().val();
		orderPay = $(this).parent().prev().children().eq(1).html();
		if(orderPay == "已支付"){
			car_send(orderID);
		}else{
			alert("用户尚未支付，请勿配送车辆！");
		}
	});

	$(".order_finish").click(function(){
		orderID = $(this).parent().prev().children().eq(1).val();
		send = $(this).parent().prev().children().eq(0).val();
		if(send=="请选择汽车派送员"){
			alert("汽车尚未派送");
		}else{
			order_finished(orderID);
		}
	});

	$(".order_del").click(function(){
		orderID = $(this).next().val();
		order_del(orderID);
	});
}
 
function car_send(orderID){
	$("#order_staff").removeClass("dis")
	var senderID_get_aj = $.ajax({
		url:'sender_id_get.php',
		data:{},
		cache:false,
		async:false,
		dataType:'json',
		success:function(data){
			if(data){
				$("#order_text select").empty();
				$("#order_text select").append("<option value='0'>请选择</option>")
				for(var i=0; i<data.length; i++){
					$("#order_text select").append("<option value='"+data[i]['staffID']+"'>"+data[i]['staffID']+"号派送员</option>")
				}
				
			}else{
				console.log("派送员加载失败1！");
			}
		},
		error:function(){
			console.log("派送员加载失败2！");
		}
	});

	$("#add_sure").click(function(){
		var staffID = $("#order_text select").val();
		if( staffID == 0){
			alert("请选择汽车派送员");
		}else{
			var order_send_aj = $.ajax({
				url:'order_send_fix.php',
				data:{orderID:orderID,staffID:staffID},
				cache:false,
				async:false,
				dataType:'json',
				success:function(data4){
					if(data4){
						alert("派送修改成功");
						self.location = 'back_order_control.html';
					}else{
						console.log("派送修改失败1！");
					}
				},
				error:function(){
					console.log("派送修改失败2！");
				}
			});
		}
	});
	$("#add_cancel").click(function(){
		$("#order_staff").addClass("dis");
	});
}

function order_finished(orderID){
	var order_send_aj = $.ajax({
		url:'order_finshed_fix.php',
			data:{orderID:orderID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data5){
				if(data5){
					alert("订单完成");
					order_load();
				}else{
					console.log("订单完成修改失败1！");
				}
			},
			error:function(){
				console.log("订单完成修改修改失败2！");
			}
	});
}

function order_del(orderID){
	var order_send_aj = $.ajax({
		url:'order_del.php',
			data:{orderID:orderID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data5){
				if(data5){
					alert("成功删除过时订单");
					order_load();
				}else{
					console.log("过时订单删除失败1！");
				}
			},
			error:function(){
				console.log("过时订单删除失败2！");
			}
	});
}