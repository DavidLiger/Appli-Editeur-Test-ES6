<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$id= $_POST['data'];

if(isset($_POST['data'])){
    $query = $BDD->getRow("SELECT nom, prenom, telephone, email FROM test_securite_candidat
                          WHERE id =".$id);

    $nom = $query['nom'];
    $prenom = $query['prenom'];
    $email = $query['email'];
    $telephone = $query['telephone'];
    echo $nom."|".$prenom."|".$telephone."|".$email;
}

?>
