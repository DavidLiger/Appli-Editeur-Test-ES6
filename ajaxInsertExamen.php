<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$BDDMaster = $GLOBALS['EC']['DB']['MASTER'];

global $a;
$idUser=$a->getAuthData('iduser');

$data = json_decode($_POST['data']);
$candidatId = $data[0];
$testNom = $data[1];
$testLangue = $data[2];

$testId = $BDD->getone("SELECT id
                        FROM test_securite_test
                        WHERE theme LIKE '%".$testNom ."%'
                          AND langue LIKE '%".$testLangue."%'");

//date pour dtcrea
$date = time();

//Generate a random string.
$token = openssl_random_pseudo_bytes(16);

//Convert the binary data into hexadecimal representation.
$token = bin2hex($token);

$emailAgent = $BDDMaster->getone("SELECT email
                        FROM auth
                        WHERE iduser =".$idUser);

$candidat = $BDD->getRow("SELECT nom ,prenom, telephone, email FROM test_securite_candidat
                          WHERE id =".$candidatId);

if(isset($_POST['data'])) {
    //requ�te pr�par� pour parer � d'�ventuelles injections SQL
    // voir https://pear.php.net/manual/en/package.database.db.db-common.autoprepare.php
    $table_name = 'test_securite_examen';
    $table_fields = array('candidatId', 'testId', 'examenToken', 'langue', 'testNom', 'dtcrea','utilcrea');
    $table_values = array($candidatId, $testId, $token, $testLangue, $testNom, $date, $idUser);

    $sth = $BDD->autoPrepare($table_name, $table_fields,
        DB_AUTOQUERY_INSERT);

    if (PEAR::isError($sth)) {
        die($sth->getMessage());
    }

    if($res =& $BDD->execute($sth, $table_values)){
        $objetExamen = array();
        $objetExamen[]=$candidat['email'];
        $objetExamen[]=$emailAgent;
        $objetExamen[]=$candidat['nom'];
        $objetExamen[]=$candidat['prenom'];
        $objetExamen[]=$candidat['telephone'];
        $objetExamen[]=$token;
        $objetExamen[]=$testNom;
        $objetExamen[]=$testLangue;

        echo json_encode($objetExamen);
    }



    if (PEAR::isError($res)) {

        die($res->getMessage());

    }
}
?>
