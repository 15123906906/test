<?php
	$carID = $_REQUEST['carID'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "SELECT car,Pirce FROM producti WHERE carID='$carID'";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);

	$sql_1 = "SELECT imgLink FROM img WHERE carID='$carID'";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	$result_1 = mysqli_query($conn,$sql_1);
	$row_1= mysqli_fetch_array($result_1,MYSQL_ASSOC);
	if($row && $row_1){
		$data = array_merge($row,$row_1);
		echo json_encode($data);
	}
	
?>