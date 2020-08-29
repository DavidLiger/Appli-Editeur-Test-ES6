<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
$nom = $data[0];
$prenom = $data[1];
$tel = $data[2];
$email = $data[3];

if(isset($_POST['data'])){
    $query = $BDD->getRow("SELECT id FROM test_securite_candidat
                          WHERE nom LIKE '%".$nom ."%'
                          AND prenom LIKE '%".$prenom ."%'
                          AND telephone LIKE '%".$tel ."%'
                          AND email LIKE '%".$email ."%'");
    if($query != null){
        echo 'true';
    }else{
        echo 'false';
    }
}

?>
