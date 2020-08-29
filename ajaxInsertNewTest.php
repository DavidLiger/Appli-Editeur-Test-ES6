<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

global $a;
$idUser=$a->getAuthData('iduser');

$data = json_decode($_POST['data']);
$testNom = $data[0];
$testLangue = $data[1];
$dataPage = $data[2];

//date pour dtcrea
$date = time();

if(isset($_POST['data'])) {
    $table_name = 'test_securite_test';
    $table_fields = array('theme', 'langue', 'dataPage', 'dtcrea', 'utilcrea');
    $table_values = array($testNom, $testLangue, $dataPage, $date, $idUser);

    $sth = $BDD->autoPrepare($table_name, $table_fields, DB_AUTOQUERY_INSERT);

    if (PEAR::isError($sth)) { die($sth->getMessage());}

    $res =& $BDD->execute($sth, $table_values);

    if (PEAR::isError($res)) { die($res->getMessage());}

    //création du dossier images correspondant au test (getcwd()
    //=get current working dir=chemin dossier actuel depuis la racine)
    // + passage des permissions du dossier images en 757 (ecriture publique)
    $curdir = getcwd();
    mkdir($curdir."/images/".$testNom,0777);
}
?>
