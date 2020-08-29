<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');


$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$categorie = $_POST['data'];
$arrayImages = array();

$testImages = $BDD->getall("SELECT nom FROM test_securite_image
                                WHERE dossier LIKE '%".$categorie."%'");
foreach($testImages as $rowTest){
    $arrayImages[]=$rowTest;
}


echo json_encode($arrayImages);
//echo $sousCategories[0];
?>
