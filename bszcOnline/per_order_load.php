<?php
	$userName = $_REQUEST['userName'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	
	//发送SQL语句
	$sql = "SELECT orderID,carID,orderNum,orderPirce FROM orders WHERE userName='$userName' ORDER BY orderID DESC";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);
	$data=array(); //用于存放查询结果集的二位数组
	while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)){
		$data[] = $row;
	}
	echo json_encode($data);
?>