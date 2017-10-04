<?php
error_reporting(E_ALL); 		//вывод всех ошибок
ini_set("display_errors", 1);	//показ всех ошибок
set_time_limit(0);				//время выполнения скрипта

$url="https://amoprodaved.amocrm.ru/";	//читает отсюда
$url="https://amoprodaved.amocrm.ru/todo/list/?filter_date_switch=created&filter_date_from=01.11.2016&filter_date_to=07.11.2016&filter%5Bstatus%5D%5B%5D=compl&filter%5Bmain_user%5D%5B%5D=1014453&useFilter=y";
$file_data="data.html"; 				    //записывается в файл
$file_cookies="cookiesjar_ph";			//файл с куками
$time_timer=3000;						        //время ожидания тайммера

$cmd="phantomjs.exe /script1.js $url $file_data $file_cookies $time_timer";

$data=shell_exec($cmd);

echo $data."<br>";

if(trim($data)=="success"){
	echo "success download<br>";
}
else{
	echo "failed download<br>";
}

$data=file_get_contents(dirname(__FILE__).'/'.$file_data);
echo "$data <br>";
die();

?>