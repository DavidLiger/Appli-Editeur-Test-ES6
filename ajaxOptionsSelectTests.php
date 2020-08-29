<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');


$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$ope = $_POST['data'];

if($ope == "write"){
    $testsQuery = $BDD->getall("SELECT theme FROM test_securite_test
                            GROUP BY theme");
}else{
    $testsQuery = $BDD->getall("SELECT theme FROM test_securite_test
                            WHERE theme NOT IN ('accueil','general')
                            GROUP BY theme");
}

$arrayTests = array();

foreach($testsQuery as $rowTest){
    $arrayTests[]=$rowTest;
}

echo json_encode($arrayTests);

?>
