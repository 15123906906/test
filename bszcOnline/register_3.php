<?php
	$userName = $_REQUEST['userName'];
	$name = $_REQUEST['name'];
	$IDCard = $_REQUEST['id'];
	$telNum = $_REQUEST['telephone'];
	$email = $_REQUEST['email'];
	if (strlen($IDCard) == 15){
		if ((int)substr($IDCard, 14, 1)%2==1){
			$gender = "男";
		}else{
			$gender = "女";
		}
	}else if(strlen($IDCard) == 18){
		if ((int)substr($IDCard, 16, 1)%2==1){
			$gender = "男";
		}else{
			$gender = "女";
		}
	}
	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	
	//发送SQL语句
	$sql = "UPDATE user 
			SET name='$name',IDCard='$IDCard',telNum='$telNum',gender='$gender',email='$email' WHERE userName=$userName";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);
	//读取结果
	$msg = '';
	if($gender=="男"){
		$msg = "$name"."先生";
	}else{
		$msg = "$name"."女士";
	}
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册</title>
	<link rel="shortcut icon" href="images/icon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="CSS/register_3.css">
	<script type="text/javascript" src="jquery-1.11.1.js"></script>
	<script type="text/javascript" src="js/login_check_1.js"></script>
	<script type="text/javascript" src="js/register_3.js"></script>
</head>
<body>
	<!--LOGO与导航栏与登录-->
	<div id="top">
		<div id="top_bar">
			<img src="images/LOGO.png" class="lt"/>
			<ul id="nav" class="lt">
				<li><a href="index.html">首页</a></li>
				<li><a href="online_rental.html">网上租车</a></li>
				<li><a href="rental.html">租车须知</a></li>
				<li><a href="service.html">服务范围</a></li>
				<li><a href="contact.html">联系我们</a></li>
				<li><a href="about_us.html">关于我们</a></li>
			</ul>
			<div class="rt">
				<span id="login_name"></span> / <span id="register_quit"></span>
			</div>
			<div class="clr">
			</div>
		</div>
	</div>

	<!--主体区-->
	<div id="main">
		<div id="register">
			<h1>用户注册</h1>
			<div id="step">
				<div class="step_1 step_0">
					<div>1</div>
					<h2>账号密码</h2>
				</div>
				<div class="step_2 step_0">
					<div>2</div>
					<h2>个人信息</h2>
				</div>
				<div class="step_3 step_0">
					<div>3</div>
					<h2>注册成功</h2>
				</div>
				<div class="clr"></div>
			</div>	
			<div id="form_in">
				<h3>欢迎加入百圣租车网，尊敬的<span><?php echo $msg; ?></span>!</h3>
				<button>返回首页</button>
			</div>
		</div>
	</div>
	<!--页脚-->
	<div id="footer">
		<div id="footer_bar">
			<div class="foot_1"><a href="#">租车须知</a> | <a href="#">服务范围</a> | <a href="#">联系我们</a> | <a href="#">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：420-58965412 </div>
			<div>京ICP备15002038号-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京公网安备 11010102001081号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有：百圣租车</div>
		</div>
	</div>
</body>
</html> 