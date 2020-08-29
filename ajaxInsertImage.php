<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

global $a;
$idUser=$a->getAuthData('iduser');

$data = json_decode($_POST['data']);
$imgNom = $data[0];
$dirNom = $data[1];

//date pour dtcrea
$date = time();

if(isset($_POST['data'])) {
    $table_name = 'test_securite_image';
    $table_fields = array('nom', 'dossier', 'dtcrea', 'utilcrea');
    $table_values = array($imgNom, $dirNom, $date, $idUser);

    $sth = $BDD->autoPrepare($table_name, $table_fields, DB_AUTOQUERY_INSERT);

    if (PEAR::isError($sth)) { die($sth->getMessage());}

    $res =& $BDD->execute($sth, $table_values);

    if (PEAR::isError($res)) { die($res->getMessage());}
}
?>