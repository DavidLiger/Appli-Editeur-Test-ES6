<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
$id = $data[0];
$dataPage = $data[1];

if(isset($_POST['data'])) {
    $table_name = 'test_securite_test';
    $table_fields = array('dataPage');
    $table_values = array($dataPage);

    $sth = $BDD->autoPrepare($table_name, $table_fields,
        DB_AUTOQUERY_UPDATE,'id ='.$id);

    if (PEAR::isError($sth)) {
        die($sth->getMessage());
    }

    $res =& $BDD->execute($sth, $table_values);
    if (PEAR::isError($res)) {
        die($res->getMessage());
    }
}
?>