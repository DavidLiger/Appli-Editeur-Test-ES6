<?php
require_once ('../fonction/base.php');
//require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$token = $_POST['data'];

$id = $BDD->getone("SELECT id FROM test_securite_examen WHERE examenToken LIKE '%".$token."%'");

$newToken = openssl_random_pseudo_bytes(16);
$newToken = bin2hex($newToken);

if(isset($_POST['data'])) {

    $table_name = 'test_securite_examen';
    $table_fields = array('examenToken');
    $table_values = array($newToken);

    $sth = $BDD->autoPrepare($table_name, $table_fields,
        DB_AUTOQUERY_UPDATE,'id ='.$id);

    if (PEAR::isError($sth)) {
        die($sth->getMessage());
    }

    $res =& $BDD->execute($sth, $table_values);
    if (PEAR::isError($res)) {
        die($res->getMessage());
    }

    echo $newToken;

}

?>
