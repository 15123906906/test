<?php
	$select = $_REQUEST['select'];
	$taday =  date('y-m-d',strtotime("-3 day"));


	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	if($select == "全部订单"){
		$sql = $sql = "SELECT orderID,orderDate,orderStart,orderStop,getTime,dispatching,address,send,arrive,confirmDate,orderPay FROM orderi ORDER BY orderID DESC";
	}else if($select == "已派送订单"){
		$sql = $sql = "SELECT orderID,orderDate,orderStart,orderStop,getTime,dispatching,address,send,arrive,confirmDate,orderPay FROM orderi WHERE send!=0 AND arrive=0 ORDER BY orderID DESC";
	}else if($select == "已完成订单"){
		$sql = $sql = "SELECT orderID,orderDate,orderStart,orderStop,getTime,dispatching,address,send,arrive,confirmDate,orderPay FROM orderi WHERE arrive=1 ORDER BY orderID DESC";
	}else if($select == "过时订单"){
		$sql = $sql = "SELECT orderID,orderDate,orderStart,orderStop,getTime,dispatching,address,send,arrive,confirmDate,orderPay FROM orderi WHERE orderDate<='$taday' and orderPay=0 ORDER BY orderID DESC";
	}
	


	$result = mysqli_query($conn,$sql);
	$data=array(); //用于存放查询结果集的二位数组
	while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)){
		$data[] = $row;
	}
	echo json_encode($data);
?>