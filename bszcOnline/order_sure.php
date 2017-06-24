	<?php
	$carID = $_REQUEST['carID'];
	$orderStart = $_REQUEST['orderStart'];
	$orderStop = $_REQUEST['orderStop'];
	$getTime = $_REQUEST['getTime'];
 	$orderNum = $_REQUEST['orderNum'];
 	$userName = $_REQUEST['userName'];
 	$stock = $_REQUEST['stock'];
 	$pirce = $_REQUEST['pirce'];
 	$address = $_REQUEST['addr'];
 	$orderDate = date('y-m-d',time());
 	$orderId = '';
 	//数据运算
 	$day = (strtotime($orderStop)-strtotime($orderStart))/86400+1;
 	$stock = $stock-$orderNum;
 	$orderPirce = $pirce*$orderNum*$day;
 	if($address == ''){
 		$dispatching = false;
 		$address = "上门取车";
 	}else{
 		$dispatching = true;
 	}
 	$send = false;
 	$arrive = false;
 	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	//插入订单表
	$sql_1 = "INSERT INTO orders(carID,orderNum,orderPirce,userName) VALUES('$carID','$orderNum','$orderPirce','$userName')";
	$result_1 = mysqli_query($conn,$sql_1);	
	//查询orderID
	$orderId = mysqli_insert_id($conn);

	//修改库存
	$sql_2 = "UPDATE producti 
			SET stock='$stock' WHERE carID='$carID'";
	$result_2 = mysqli_query($conn,$sql_2);	
	//插入详细订单表
	$sql = "INSERT INTO orderi(orderID,orderDate,orderStart,orderStop,getTime,dispatching,address,send,arrive) VALUES('$orderId','$orderDate','$orderStart','$orderStop','$getTime','$dispatching','$address','$send','$arrive')";
	$result = mysqli_query($conn,$sql);	
	if($result && $result_1 && $result_2){
		$msg = "添加记录成功!";
		echo json_encode($msg);
	}
	?>