<?php
	$orderID = $_REQUEST['orderID'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	
	$sql_1 = "SELECT orderNum,carID FROM orders WHERE orderID='$orderID'";
	$result_1 = mysqli_query($conn,$sql_1);
	$row_1 = mysqli_fetch_array($result_1,MYSQL_ASSOC);
	$orderNum = $row_1['orderNum'];
	$carID = $row_1['carID'];

	$sql_2 = "SELECT stock FROM producti WHERE carID='$carID'";
	$result_2 = mysqli_query($conn,$sql_2);
	$row_2 = mysqli_fetch_array($result_2,MYSQL_ASSOC);
	$stock = $orderNum+$row_2['stock'];

	$sql_3 = "UPDATE producti SET stock='$stock' WHERE carID='$carID'";
	$result_3 = mysqli_query($conn,$sql_3);

	if($row_1 and $row_2 and $result_3){
		$sql_4 = "DELETE FROM orderi WHERE orderID='$orderID'";
		$result_4 = mysqli_query($conn,$sql_4);
	}
	if($result_4){
		$sql_5 = "DELETE FROM orders WHERE orderID='$orderID'";
		$result_5 = mysqli_query($conn,$sql_5);
	}
	if($result_5){
		echo json_encode("true");
	}
?>