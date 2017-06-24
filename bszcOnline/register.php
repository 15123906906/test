<?php
	//var_dump($_REQUEST);
	$userName = $_REQUEST['userName'];
	$password = $_REQUEST['password'];
	$date=date('y-m-d',time());
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//发送SQL语句
	$sql = "INSERT INTO user(userName,userPwd,name,IDCard,gender,telNum,email,userDate) VALUES('$userName','$password','xx','xxx','x','xxx','xx','$date')";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);
	//读取结果
	$msg = '';
	if($result){
		$msg = '添加记录成功！新用户的自增编号为：'.mysqli_insert_id($conn);
		//cookie保存账号密码
		setcookie("userName","$userName",time()+7*24*3600);
		setcookie("password","$password",time()+7*24*3600);	
		header("location:register_2.php?userName=$userName");
	}else{
		echo "失败";
	}

?>