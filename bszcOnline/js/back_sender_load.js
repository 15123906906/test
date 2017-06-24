
$(document).ready(function(){
	sender_load();
	$("#add_sender_box").mouseenter(function(){
		$("#add_sender").children().eq(0).attr("src","images/add_car_msg_click.png");
	}).mouseleave(function(){
		$("#add_sender").children().eq(0).attr("src","images/add_car_msg.png")
	});

	$("#add_sender_box").click(function(){
		$("body").append("<div id='back'></div>");
		$("body").append("<div id='ifr'><iframe src='add_sender_msg.html'></iframe><div>")
	});
});

function ifrdel(){
	$("#back").remove();
	$("#ifr").remove();
	sender_load();
}
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

function sender_load(){
	var sender_load_aj = $.ajax({
		url:'sender_load.php',
		data:{},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){	
				sender_loaded(data);
				page(data);//调用翻页按钮函数
			}else{
				console.log("选项加载失败1！");
			}
		},
		error:function(){
			console.log("选项加载失败2！");
		}
	});
}

function sender_loaded(data){
	var staffID='';
	var staffName='';
	var staffTel='';
	$("#sender_box").empty();
	for(var i=0; i<data.length; i++){
		staffID = data[i]['staffID'];
		staffName = data[i]['staffName'];
		staffTel = data[i]['staffTel'];

		$("#sender_box").append("<div class='sender'><div class='sender_msg'><div class='sender_num'>派送员编号："+staffID+"</div><div class='sender_name'>派送员姓名："+staffName+"</div><div class='sender_tel'>派送员电话："+staffTel+"</div><div class='sender_del'>删除派送员</div></div></div>");
	}

	//绑定删除派送员点击事件
	$(".sender_del").click(function(){
		var senderID = $(this).prev().prev().prev().html();
		var staff = [];
		staff = senderID.split("：");
		staffID = staff[1];

		var sender_del_aj = $.ajax({
			url:'sender_del.php',
			data:{staffID:staffID},
			cache:false,
			dataType:'json',
			success:function(data){
				if(data){	
					alert("成功删除该派送员！");
					sender_load();
				}else{
					console.log("删除失败1！");
				}
			},
			error:function(){
				console.log("删除失败2！");
			}
		});
	});
}