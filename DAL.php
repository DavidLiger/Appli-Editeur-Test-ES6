<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
if($data[0] == "getTest"){
  $testNom = $data[1];
  $testLangue = $data[2];

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
}
if($data[0] == "testList"){
  if($data[1] == "write"){
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
}


?>
