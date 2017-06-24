var brand = '不限';
var car = '不限';
var sort = 1;
var search_word = '';


$(document).ready(function(){
	select_inload();//品牌条件加载
	carStyle_select_inload();//车型条件加载
	inload();//产品加载

	$("#add_car_box").mouseenter(function(){
		$("#add_car").children().eq(0).attr("src","images/add_car_msg_click.png");
	}).mouseleave(function(){
		$("#add_car").children().eq(0).attr("src","images/add_car_msg.png")
	});

	$("#add_car_box").click(function(){
		$("body").append("<div id='back'></div>");
		$("body").append("<div id='ifr'><iframe src='add_car_msg.html'></iframe><div>")
	});
});

function ifrdel(){
	$("#back").remove();
	$("#ifr").remove();
	select_inload();//品牌条件加载
	carStyle_select_inload();//车型条件加载
	inload();
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
		async:false,
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
		var brand = data[i]['brand'];
		var imgLink = '';
		var imgLinkBig = '';


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
					imgLinkBig = data['imgLinkBig'];
				}else{
					console.log("加载失败1！");
				}
			},
			error:function(){
				console.log("加载失败2！");
			}
		});
		$("#product_box").append("<div class='product'><img src='"+imgLink+"'/><ul><li><span>车型</span><div>"+car+"</div></li><li><span>品牌</span><div>"+brand+"</div></li><li><span>库存</span><div>"+stock+"</div></li><li><span>日租价格</span><div>"+pirce+"</div></li><li><span>汽车简介</span><div>"+summary+"</div></li><li><span>小图</span><div>"+imgLink+"</div></li><li><span>大图</span><div>"+imgLinkBig+"</div></li></ul><div class='car_fix_btn'><div class='fix_btn'>修改信息</div><input type='hidden' value='"+carID+"'/><div class='del_btn'>删除车型</div></div><div class='clr'></div></div>");	
	}

	//修改租赁汽车信息
	$(".fix_btn").click(function(){
		var $_stockfix = $(this).parent().prev().children().eq(2).children().eq(1);
		var $_pircefix = $(this).parent().prev().children().eq(3).children().eq(1);
		var $_summaryfix = $(this).parent().prev().children().eq(4).children().eq(1);
		var $_imgLinkfix = $(this).parent().prev().children().eq(5).children().eq(1);
		var $_imgLinkBigfix = $(this).parent().prev().children().eq(6).children().eq(1);

		var stock = $_stockfix.html();
		var pirce = $_pircefix.html();
		var summary = $_summaryfix.html();
		var imgLink = $_imgLinkfix.html();
		var imgLinkBig = $_imgLinkBigfix.html();
		var carID = $(this).next().val();
		
		$_stockfix.html("<input type='text' value='"+stock+"' />");
		$_pircefix.html("<input type='text' value='"+pirce+"' />");
		$_summaryfix.html("<textarea>"+summary+"</textarea>");
		$_imgLinkfix.html("<input type='file' value='"+imgLink+"' />");
		$_imgLinkBigfix.html("<input type='file' value='"+imgLinkBig+"' />");
		$(this).html("确认修改");
		$(this).unbind("click");
		$(this).addClass("fixed_btn").removeClass("fix_btn");
		
		$(".fixed_btn").click(function(){
			var stock = $(this).parent().prev().children().eq(2).children().eq(1).children().eq(0).val();
			var pirce = $(this).parent().prev().children().eq(3).children().eq(1).children().eq(0).val();
			var summary = $(this).parent().prev().children().eq(4).children().eq(1).children().eq(0).val();
			var $_imgLink = $(this).parent().prev().children().eq(5).children().eq(1).children().get(0);
			var $_imgLinkBig = $(this).parent().prev().children().eq(6).children().eq(1).children().get(0);
		
			//上传小图片
			var imglittle = $_imgLink.files[0];
			if(imglittle != null){ 
	        	var formData = new FormData(); 
	        	var imgLink = '';
	        	var imgLinkBig = '';
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
        		imgLink = "不改";
        	}
     
		    //上传大图片
		    var imgBig = $_imgLinkBig.files[0]; 
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
        		imgLinkBig = "不改";
        	}
			//console.log(imgLink);
			//console.log(imgLinkBig);

		    //修改数据库数据
		    var car_msg_fixed_aj = $.ajax({
		    	url:'car_msg_fixed.php',
				data:{carID:carID,stock:stock,pirce:pirce,summary:summary,imgLink:imgLink,imgLinkBig:imgLinkBig},
				cache:false,
				async:false,
				dataType:'json',
				success:function(data){
					if(data){
						alert("修改成功！");
						select_inload();//品牌条件加载
						carStyle_select_inload();//车型条件加载
						inload();//产品加载
					}else{
						console.log("更改失败1！");
					}
				},
				error:function(){
					console.log("更改失败2！");
				}	

		    });
		});			
	});	


	//租赁汽车信息删除
	$(".del_btn").click(function(){
		var carID = $(this).prev().val();

		var car_msg_del_aj = $.ajax({
			url:'car_msg_del.php',
			data:{carID:carID},
			cache:false,
			async:false,
			dataType:'json',
			success:function(data){
				if(data){
					alert("成功删除！");
					select_inload();//品牌条件加载
					carStyle_select_inload();//车型条件加载
					inload();//产品加载
				}else{
					alert("删除失败1！");
				}
			},
			error:function(){
				alert("删除失败2！");
			}
		});
	});
}