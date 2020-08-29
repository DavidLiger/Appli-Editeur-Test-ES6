<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');


$data = json_decode($_POST['data']);
$testNom = $data[0];
$fileName = $data[1];

$curdir = getcwd();
$oldPath = $curdir."/images/".$fileName;
$newPath = $curdir."/images/".$testNom."/".$fileName;

if(isset($_POST['data'])) {
    if(!file_exists($newPath)){
        if(rename($oldPath,$newPath)){
            echo "ok";
        }else{
            echo "oldPath : ".$oldPath." / newPath : ".$newPath;
        }
    }else{
        echo "file_exists";
        unlink($oldPath);
    }

}
?>
