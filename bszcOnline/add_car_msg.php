<?php
	$brand = $_REQUEST['brand'];
	$carStyleID = $_REQUEST['carStyleID'];
	$car = $_REQUEST['car'];
	$stock = $_REQUEST['stock'];
	$pirce = $_REQUEST['pirce'];
	$summary = $_REQUEST['summary'];
	$imgLink = $_REQUEST['imgLink'];
	$imgLinkBig = $_REQUEST['imgLinkBig'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');
	//查询用户ID
	$sql = "INSERT INTO producti(brand,carStyleID,car,stock,pirce,summary) VALUES('$brand','$carStyleID','$car','$stock','$pirce','$summary')";
	$result = mysqli_query($conn,$sql);	
	$carID = mysqli_insert_id($conn);

	if($imgLink == '不加' and $imgLinkBig == '不加' ){
		$sql_1 = "INSERT INTO img(carID,imgLink,imgLinkBig) VALUES('$carID','无','无')";
	}elseif($imgLink != '不加' and $imgLinkBig == '不加' ){
		//存储位置格式修改
		$imgLink_1 = '';
		$arr = explode("\\", $imgLink);
		$imgLink_1 = $arr[1]."/".$arr[2];	
		$sql_1 = "INSERT INTO img(carID,imgLink,imgLinkBig) VALUES('$carID','$imgLink_1','无')";
	}elseif($imgLink == '不加' and $imgLinkBig != '不加' ){
		//存储位置格式修改
		$imgLinkBig_1 = '';
		$arr_1 = explode("\\", $imgLinkBig);
		$imgLinkBig_1 = $arr_1[1]."/".$arr_1[2];	
		$sql_1 = "INSERT INTO img(carID,imgLink,imgLinkBig) VALUES('$carID','无','$imgLinkBig_1')";
	}elseif($imgLink != '不加' and $imgLinkBig != '不加' ){
		$imgLink_1 = '';
		$arr = explode("\\", $imgLink);
		$imgLink_1 = $arr[1]."/".$arr[2];	
		$imgLinkBig_1 = '';
		$arr_1 = explode("\\", $imgLinkBig);
		$imgLinkBig_1 = $arr_1[1]."/".$arr_1[2];
		$sql_1 = "INSERT INTO img(carID,imgLink,imgLinkBig) VALUES('$carID','$imgLink_1','$imgLinkBig_1')";
	}



	//发送SQL语句
	
	$result_1 = mysqli_query($conn,$sql_1);	
	$msg = '';
	if($result_1){
		$msg = '添加记录成功！新留言的自增编号为'.mysqli_insert_id($conn);
		echo json_encode($msg);
	}
?>