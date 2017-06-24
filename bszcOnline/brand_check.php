<?php
	$brand = $_REQUEST['brand'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "SELECT carStyleID FROM producti WHERE brand='$brand'";
	//执行SQL语句
	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_array($result,MYSQL_ASSOC);//存放账号密码

	/*if (!$row) {
 	printf("Error: %s\n", mysqli_error($conn));

	}*/
	if(count($row)>0){
		echo json_encode($row['carStyleID']);
	}else{
		$result_2 = mysqli_query($conn,"SELECT max(carStyleID) maxID FROM producti");
		$row_2 = mysqli_fetch_object($result_2);
		$maxID = ($row_2->maxID)+1;
		echo json_encode($maxID);
	}
?>