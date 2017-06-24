<?php
	$userName = $_REQUEST['userName'];
	$password = $_REQUEST['password'];
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	
	//发送SQL语句
	$sql = "SELECT AdminUserName,AdminPwd FROM admin WHERE AdminUserName=$userName";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_array($result,MYSQL_ASSOC);//存放账号密码
	if($row['AdminUserName'] != $userName){
		echo "账号错误";
	}else if($row['AdminPwd'] != $password)
	{
		echo "密码错误";
	}else{
		//cookie保存账号密码
		setcookie("AdminUserName","$userName",time()+7*24*3600);
		setcookie("AdminPwd","$password",time()+7*24*3600);
		echo "登录成功";
		//header("location:index.html");
	}
?>