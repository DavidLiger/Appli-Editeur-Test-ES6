<?php
require_once ('../fonction/base.php');
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$BDDMaster = $GLOBALS['EC']['DB']['MASTER'];

global $a;
$idUser=$a->getAuthData('iduser');

$data = json_decode($_POST['data']);
$id = $data[0];
$nom = $data[1];
$prenom = $data[2];
$tel = $data[3];
$email = $data[4];

$emailAgent = $BDDMaster->getone("SELECT email
                        FROM auth
                        WHERE iduser =".$idUser);

if(isset($_POST['data'])) {

    $table_name = 'test_securite_candidat';
    $table_fields = array('nom', 'prenom', 'telephone', 'email', 'emailAgent');
    $table_values = array($nom, $prenom, $tel, $email, $emailAgent);

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
