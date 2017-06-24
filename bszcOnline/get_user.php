<?php
	$userName = $_REQUEST['userName'];
	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	//发送SQL语句
	$sql = "SELECT name,telNum,IDCard,email FROM user WHERE userName='$userName'";
	$result = mysqli_query($conn,$sql);	
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);	
	if($row){
		echo json_encode($row);
	}
?>