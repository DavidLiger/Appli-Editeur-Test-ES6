<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');


$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$categorie = $_POST['data'];
$arrayLangues = array();

$categorieMultiple = $BDD->getone("SELECT multi FROM test_securite_test
                                  WHERE theme LIKE '%".$categorie."%'
                                  AND langue LIKE '%français%'");


if($categorieMultiple != null){
    $sousCategories = explode('#', $categorieMultiple);
    $testLangues = $BDD->getall("SELECT langue FROM test_securite_test
                                WHERE theme LIKE '%".$sousCategories[0]."%'");
    foreach($testLangues as $rowTest){
        $arrayLangues[]=$rowTest;
    }
}else{
    $testLangues = $BDD->getall("SELECT langue FROM test_securite_test
                                WHERE theme LIKE '%".$categorie."%'");
    foreach($testLangues as $rowTest){
        $arrayLangues[]=$rowTest;
    }
}

echo json_encode($arrayLangues);
//echo $sousCategories[0];
?>
