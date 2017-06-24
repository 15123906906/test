<?php
	$carID = $_REQUEST['carID'];
	$stock = $_REQUEST['stock'];
	$pirce = $_REQUEST['pirce'];
	$summary = $_REQUEST['summary'];
	$imgLink = $_REQUEST['imgLink'];
	$imgLinkBig = $_REQUEST['imgLinkBig'];
		

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	//告诉数据库接下来的SQL语句的编码方式
	mysqli_query($conn,'SET NAMES utf8');
	
	//发送SQL语句
	$sql = "UPDATE producti 
			SET stock='$stock',pirce='$pirce',summary='$summary' WHERE carID='$carID'";
	//执行SQL语句
	$result = mysqli_query($conn,$sql);
	if($imgLink == '不改' and $imgLinkBig == '不改' ){
		$sql_1 = "SELECT imgLink,imgLinkBig FROM img WHERE carID='$carID'";
	}elseif($imgLink != '不改' and $imgLinkBig == '不改' ){
		//存储位置格式修改
		$imgLink_1 = '';
		$arr = explode("\\", $imgLink);
		$imgLink_1 = $arr[1]."/".$arr[2];	
		$sql_1 = "UPDATE img SET imgLink='$imgLink_1' WHERE carID='$carID'";
	}elseif($imgLink == '不改' and $imgLinkBig != '不改' ){
		//存储位置格式修改
		$imgLinkBig_1 = '';
		$arr_1 = explode("\\", $imgLinkBig);
		$imgLinkBig_1 = $arr_1[1]."/".$arr_1[2];	
		$sql_1 = "UPDATE img SET imgLinkBig='$imgLinkBig_1' WHERE carID='$carID'";
	}elseif($imgLink != '不改' and $imgLinkBig != '不改' ){
		$imgLink_1 = '';
		$arr = explode("\\", $imgLink);
		$imgLink_1 = $arr[1]."/".$arr[2];	
		$imgLinkBig_1 = '';
		$arr_1 = explode("\\", $imgLinkBig);
		$imgLinkBig_1 = $arr_1[1]."/".$arr_1[2];
		$sql_1 = "UPDATE img SET imgLink='$imgLink_1',imgLinkBig='$imgLinkBig_1' WHERE carID='$carID'";
	}


	//执行SQL语句
	$result_1 = mysqli_query($conn,$sql_1);

	if($result && $result_1){
		echo json_encode(true);
	}else{
		echo json_encode(false);
	}
?>