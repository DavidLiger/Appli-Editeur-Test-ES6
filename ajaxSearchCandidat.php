<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$q = $_POST['data'];

if(isset($_POST['data'])){
    $query = $BDD->getall("SELECT id, nom ,prenom FROM test_securite_candidat
                          WHERE nom LIKE '%".$q ."%'
                          OR prenom LIKE '%".$q."%'
                          GROUP BY nom, prenom");
    $array = array();
    foreach($query as $row){
        $id = $row['id'];
        $nom = $row['nom']." ".$row['prenom'];
        $array[]=array('id'=>$id,'text'=>$nom);
    }
    echo json_encode($array);
}

?>
