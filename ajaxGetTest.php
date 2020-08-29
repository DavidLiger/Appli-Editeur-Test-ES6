<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
$testNom = $data[0];
$testLangue = $data[1];

$test = $BDD->getRow("SELECT id, datapage
                        FROM test_securite_test
                        WHERE theme LIKE '%".$testNom ."%'
                          AND langue LIKE '%".$testLangue."%'");

if(isset($test)) {
    $array = array();
    $array[] = $test['id'];
    $array[] = $test['datapage'];

    echo json_encode($array);
}
?>
