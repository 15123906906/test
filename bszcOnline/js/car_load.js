var brand = '不限';
var car = '不限';
var sort = 1;
var search_word = '';


$(document).ready(function(){
	select_inload();//品牌条件加载
	carStyle_select_inload();//车型条件加载
	inload();//产品加载+排序方式
	//选择排序
	$("#sort ul li").click(function(){
		sort = $(this).html();
		$("#sort ul li").removeClass("clicked");
		$(this).addClass("clicked");
		//console.log(sort);
		if(sort == "综合"){
			sort=1;
		}else if(sort == "类型"){
			sort=2;
		}else if(sort == "价格↑"){
			sort=3;
		}else if(sort == "价格↓"){
			sort=4;
		}
		inload();
	});

	//搜索点击事件绑定
	$("#search").click(function(){
		search_word = $("#search_box input").val();
		if (search_word != ''){
			brand = '不限';
			car = '不限';
			select_inload();//品牌条件加载
			carStyle_select_inload();//车型条件加载
			inload();
			$("#search_box input").val('');
		}else{
			alert("请填写搜索关键词！");
		}
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

//加载产品筛选条件
function select_inload(){
	//加载品牌条件
	var brand_select = $.ajax({
		url:'brand_select.php',
		data:{brand:brand},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){	
				var data1 = new Array();
				for(var i in data){
					if(data1.indexOf(data[i])==-1){
						data1.push(data[i]);
					}
				}
				select_load(data1);
			}else{
				console.log("选项加载失败1！");
			}
		},
		error:function(){
			console.log("选项加载失败2！");
		}
	});
}

function select_load(data1){
	$("#brand").empty();
	$("#brand").append("<li><div>品牌</div></li>");
	$("#brand").append("<li><span class='clicked'>不限</span></li>");
	for(var i=0; i<data1.length; i++){
		$("#brand").append("<li><span>"+data1[i]+"</span></li>");
	}
	$("#brand").append("<div class='clr'></div>");

	//车型点击事件
	$("#brand li span").click(function(){
		search_word = '';
		brand = $(this).html();
		car = '不限';
		$("#brand li span").removeClass("clicked");
		$(this).addClass("clicked");
		inload();
		carStyle_select_inload();
		//console.log(brand);
	});
}	

//加载车类型筛选条件
function carStyle_select_inload(){
	var carStyle_select = $.ajax({
		url:'carStyle_select.php',
		data:{brand:brand},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){	
				carStyle_select_load(data);
			}else{
				console.log("选项加载失败1！");
			}
		},
		error:function(){
			console.log("选项加载失败2！");
		}
	});
}

function carStyle_select_load(data){
	$("#carStyle").empty();
	$("#carStyle").append("<li><div>车型</div></li>");
	$("#carStyle").append("<li><span class='clicked'>不限</span></li>");
	for(var i=0; i<data.length; i++){
		$("#carStyle").append("<li><span>"+data[i]+"</span></li>");
	}
	$("#carStyle").append("<div class='clr'></div>");

	//品牌点击事件
	$("#carStyle li span").click(function(){
		search_word = '';
		car = $(this).html();
		$("#carStyle li span").removeClass("clicked");
		$(this).addClass("clicked");
		inload();
		//console.log(car);
	});
}

//加载产品
function inload(){
	$("#product_box").empty();
	var car_load_aj = $.ajax({
		url:'car_load.php',
		data:{brand:brand,car:car,sort:sort,search_word:search_word},
		cache:false,
		dataType:'json',
		success:function(data){
			if(data){	
				
				load(data);
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
	for(var i=0 ;i<data.length; i++){
		var car = data[i]['car'];
		var stock = data[i]['stock'];
		var summary = data[i]['summary'];
		var pirce = data[i]['pirce'];
		var carID = data[i]['carID'];
		var imgLink = '';


		//ajax请求图片地址
		var img_aj = $.ajax({
			url:'img_addr_get.php',
			data:{carID:carID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data){
				if(data){
					imgLink = data['imgLink'];
				}else{
					console.log("加载失败1！");
				}
			},
			error:function(){
				console.log("加载失败2！");
			}
		});
		$("#product_box").append("<div class='product'><input type='hidden' value='"+carID+"'/><img src='"+imgLink+"'/><div class='text'><h1>"+car+"</h1><h2>库存 : <span>"+stock+"辆</span></h2><p>"+summary+"</p></div><div class='price'>￥<span>"+pirce+"</span>元/日</div><h3 class='clr'></h3></div>");
	}
	//点击进入产品详情页
	$(".product").click(function(){
		var carID = $(this).children().eq(0).attr("value");
		window.location.href="product_detail.html?carID="+carID;
	});
}