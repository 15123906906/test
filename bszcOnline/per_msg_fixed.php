<?php
	$userName = $_REQUEST['userName'];
	$name = $_REQUEST['name'];
	$IDCard = $_REQUEST['IDCard'];
	$telNum = $_REQUEST['telNum'];
	$email = $_REQUEST['email'];
	if (strlen($IDCard) == 15){
		if ((int)substr($IDCard, 14, 1)%2==1){
			$gender = "男";
		}else{
			$gender = "女";
		}
	}else if(strlen($IDCard) == 18){
		if ((int)substr($IDCard, 16, 1)%2==1){
			$gender = "男";
		}else{
			$gender = "女";
		}
	}
	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	
	//发送SQL语句
	$sql = "UPDATE user 
			SET name='$name',IDCard='$IDCard',telNum='$telNum',gender='$gender',email='$email' WHERE userName=$userName";
	//执行SQL语句
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	$result = mysqli_query($conn,$sql);
	if($result){
		echo json_encode($result);
	}else{
		echo json_encode(false);
	}
?>