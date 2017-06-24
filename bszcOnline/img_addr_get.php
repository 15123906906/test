<?php
	$carID = $_REQUEST['carID'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');

	$sql = "SELECT imgLink,imgLinkBig FROM img WHERE carID=$carID";
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_array($result,MYSQL_ASSOC);//存放图片地址
	if($row){
		echo json_encode($row);
	}else{
		echo json_encode("false");
	}
	

?>