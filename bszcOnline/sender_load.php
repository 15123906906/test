<?php


	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	$sql = "SELECT staffID,staffName,staffTel FROM staffi";
	$result = mysqli_query($conn,$sql);
	$data=array(); //用于存放查询结果集的二位数组
	while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)){
		$data[] = $row;
	}
	echo json_encode($data);
?>