<?php
	$carID = $_REQUEST['carID'];
	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	//发送SQL语句
	$sql = "SELECT car,pirce FROM producti WHERE carID='$carID'";
	$result = mysqli_query($conn,$sql);	
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);	
	if($row){
		echo json_encode($row);
	}
?>