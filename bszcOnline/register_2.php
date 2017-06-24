<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册</title>
	<link rel="shortcut icon" href="images/icon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="CSS/register_2.css">
	<script type="text/javascript" src="jquery-1.11.1.js"></script>
	<script type="text/javascript" src="js/register_2.js"></script>
</head>
<body>
	<!--LOGO与导航栏与登录-->
	<div id="top">
		<div id="top_bar">
			<img src="images/LOGO.png" class="lt"/>
			<ul id="nav" class="lt">
				<li><a href="index.html">首页</a></li>
				<li><a href="#">网上租车</a></li>
				<li><a href="rental.html">租车须知</a></li>
				<li><a href="service.html">服务范围</a></li>
				<li><a href="contact.html">联系我们</a></li>
				<li><a href="about_us.html">关于我们</a></li>
			</ul>
			<div class="rt">
				<span><a href="login.html">登录</a></span> / <span><a href="register.html">注册</a></span>
			</div>
			<div class="clr"></div>
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
			<form action='register_3.php?userName=<?php echo "$_GET[userName]"; ?>'method="post" id="form">
				<ul>
					<li><span>姓名</span><input type="text" name="name" id="name" /></li>
					<li><span>身份证号</span><input type="text" name="id" id="id" /></li>
					<li><span>手机号</span><input type="text" name="telephone" id="tel" /></li>
					<li><span>电子邮箱</span><input type="text" name="email" id="email" /></li>
					<div class="clr"></div>
				</ul>
				<div id="button">下一步</div>
			</form>
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