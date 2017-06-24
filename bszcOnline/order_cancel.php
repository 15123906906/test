<?php
	$orderID = $_REQUEST['orderID'];
	$orderNum = $_REQUEST['orderNum'];
	$car = $_REQUEST['car'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "SELECT stock FROM producti WHERE car='$car'";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);
	$stock = $row['stock']+$orderNum;
	
	if($row){
		//更改库存
		$sql_1 = "UPDATE producti SET stock='$stock' WHERE car='$car'";
		$result_1 = mysqli_query($conn,$sql_1);
	}
	if($result_1){
		$sql_2 = "DELETE FROM orderi WHERE orderID='$orderID'";
		$result_2 = mysqli_query($conn,$sql_2);
	}
	if($result_2){
		$sql_3 = "DELETE FROM orders WHERE orderID='$orderID'";
		$result_3 = mysqli_query($conn,$sql_3);
	}
	if($result_3){
		echo json_encode($row);
	}
?>