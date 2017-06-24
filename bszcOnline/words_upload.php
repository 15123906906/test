<?php
	$words = $_REQUEST['words'];
	$userName = $_REQUEST['userName'];
	$carID = $_REQUEST['carID'];
	$wordsDate = date('y-m-d',time());
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');
	//查询用户ID
	$sql_1 = "SELECT userID FROM user WHERE userName='$userName'";
	$result_1 = mysqli_query($conn,$sql_1);	
	$row_1 = mysqli_fetch_array($result_1,MYSQL_ASSOC);	
	$userID = $row_1['userID'];

	//发送SQL语句
	$sql = "INSERT INTO wordsi(userID,carID,words,wordsDate) VALUES('$userID','$carID','$words','$wordsDate')";
	$result = mysqli_query($conn,$sql);	
	$msg = '';
	if($result){
		$msg = '添加记录成功！新留言的自增编号为'.mysqli_insert_id($conn);
		echo json_encode($msg);
	}
?>