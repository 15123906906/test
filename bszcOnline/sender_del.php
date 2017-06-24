<?php
	$staffID = $_REQUEST['staffID'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "DELETE FROM staffi WHERE staffID='$staffID'";
	$result = mysqli_query($conn,$sql);

	if($result){
		echo json_encode(true);
	}
?>