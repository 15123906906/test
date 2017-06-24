<?php 
	$userName = $_REQUEST['userName'];
	$password = $_REQUEST['password'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	
	//发送SQL语句
	$sql = "SELECT userName,userPwd,name FROM user WHERE userName=$userName";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_array($result,MYSQL_ASSOC);//存放账号密码
	if($row['userName'] == $userName && $row['userPwd'] == $password ){
		echo json_encode($row['name']);
	}else{
		echo json_encode("false");
	}
?>