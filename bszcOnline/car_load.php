<?php
	$brand = $_REQUEST['brand'];
	$car = $_REQUEST['car'];
	$sort = $_REQUEST['sort'];
	$search_word = $_REQUEST['search_word'];

	//链接数据库
	$conn = mysqli_connect('bdm256312113.my3w.com','bdm256312113','liujiang33','bdm256312113_db');
	mysqli_query($conn,'SET NAMES utf8');

	if($sort == 1){
		$sort = " ";
	}else if($sort == 2){
		$sort = " ORDER BY carStyleID ASC";
	}else if($sort == 3){
		$sort = " ORDER BY pirce ASC";
	}else if($sort == 4){
		$sort = " ORDER BY pirce DESC";
	}
	if($search_word == ''){
		if($brand == '不限' && $car == '不限'){
			//发送SQL语句
			$sql = "SELECT car,brand,stock,summary,pirce,carID FROM producti".$sort;
		}else if($brand == '不限' && $car != '不限'){
			$sql = "SELECT car,brand,stock,summary,pirce,carID FROM producti WHERE car='$car'".$sort;
		}else if($brand != '不限' && $car == '不限'){
			$sql = "SELECT car,brand,stock,summary,pirce,carID FROM producti WHERE brand='$brand'".$sort;
		}else if($brand != '不限' && $car != '不限'){
			$sql = "SELECT car,brand,stock,summary,pirce,carID FROM producti WHERE brand='$brand' AND car='$car'".$sort;
		}
	}else{
		$sql = "SELECT car,brand,stock,summary,pirce,carID FROM producti WHERE car LIKE '%".$search_word."%'".$sort;
	}

	$result = mysqli_query($conn,$sql);
	$data=array(); //用于存放查询结果集的二位数组
	while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)){
		$data[] = $row;
		
	}
	echo json_encode($data);
?>