<?php
	$carID = $_REQUEST['carID'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "SELECT imgLink,imgLinkBig FROM img WHERE carID='$carID'";
	//执行SQL语句
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);
	if($row){
		$imgLink = $row['imgLink'];
		$imgLinkBig = $row['imgLinkBig'];
		
		$del_1 = unlink($imgLink);
		$del_2 = unlink($imgLinkBig);
	}
	
	//更改库存
	$sql_1 = "DELETE FROM img WHERE carID='$carID'";
	$result_1 = mysqli_query($conn,$sql_1);
	
	if($result_1){
		$sql_2 = "DELETE FROM producti WHERE carID='$carID'";
		$result_2 = mysqli_query($conn,$sql_2);
	}
	if($result_2){
		echo json_encode(true);
	}
?>