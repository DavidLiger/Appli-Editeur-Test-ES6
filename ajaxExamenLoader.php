<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$token = $_POST['data'];

if(isset($_POST['data'])){
    $idExamen = $BDD->getone("SELECT testId FROM test_securite_examen
                              WHERE examenToken LIKE '%".$token."%'");

    $testNom = $BDD->getone("SELECT testNom FROM test_securite_examen
                              WHERE examenToken LIKE '%".$token."%'");

    $testLangue = $BDD->getone("SELECT langue FROM test_securite_examen
                              WHERE examenToken LIKE '%".$token."%'");

    $candidat = $BDD->getRow("SELECT nom, prenom, telephone, email FROM test_securite_candidat
                              INNER JOIN test_securite_examen ON test_securite_candidat.id = test_securite_examen.candidatId
                              WHERE test_securite_examen.examenToken LIKE '%".$token."%'");

    $accueil = $BDD->getOne("SELECT dataPage FROM test_securite_test
                              INNER JOIN test_securite_examen ON test_securite_test.langue = test_securite_examen.langue
                              WHERE test_securite_test.theme LIKE '%accueil%'");

    $sensiGeneral = $BDD->getOne("SELECT dataPage FROM test_securite_test
                              INNER JOIN test_securite_examen ON test_securite_test.langue = test_securite_examen.langue
                              WHERE test_securite_test.theme LIKE '%general%'");

    $testData = $BDD->getOne("SELECT dataPage FROM test_securite_test
                              INNER JOIN test_securite_examen ON test_securite_test.id = test_securite_examen.testId
                              WHERE test_securite_examen.testId = ".$idExamen);

    $array = array();
    $array[] = $token;
    $array[] = $idExamen;
    $array[] = $testNom;
    $array[] = $testLangue;
    $array[] = $candidat['nom'];
    $array[] = $candidat['prenom'];
    $array[] = $candidat['telephone'];
    $array[] = $candidat['email'];
    $array[] = $accueil;
    $array[] = $sensiGeneral;
    $array[] = $testData;

    echo json_encode($array);
}

?>
