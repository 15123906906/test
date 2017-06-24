<?php
	$staffName = $_REQUEST['staffName'];
	$staffTel = $_REQUEST['staffTel'];
	
	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');
	
	$sql = "INSERT INTO staffi(staffName,staffTel) VALUES('$staffName','$staffTel')";
	$result = mysqli_query($conn,$sql);	
	/*if (!$result) {
 	printf("Error: %s\n", mysqli_error($conn));

	}*/
	$msg = '';
	if($result){
		$msg = '添加记录成功！新留言的自增编号为'.mysqli_insert_id($conn);
		echo json_encode($msg);
	}
?>