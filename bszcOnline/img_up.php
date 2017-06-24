<?php
	if(isset($_FILES["myfile"]))  {  
		$ret = array();  
		$uploadDir = 'img'.DIRECTORY_SEPARATOR;  
		$dir = dirname(__FILE__).DIRECTORY_SEPARATOR.$uploadDir;  
		file_exists($dir) || (mkdir($dir,0777,true) && chmod($dir,0777));  
		if(!is_array($_FILES["myfile"]["name"])){  
			$fileName = $_FILES["myfile"]["name"];  
			move_uploaded_file($_FILES["myfile"]["tmp_name"],$dir.$fileName);   //将文件移动到--位置(文件,位置)
			$ret['file'] = DIRECTORY_SEPARATOR.$uploadDir.$fileName;  
		}  
		echo json_encode($ret);  
	} 
?>