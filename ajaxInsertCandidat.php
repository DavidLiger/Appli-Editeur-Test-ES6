<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$BDDMaster = $GLOBALS['EC']['DB']['MASTER'];

global $a;
$idUser=$a->getAuthData('iduser');

$data = json_decode($_POST['data']);
$nom = $data[0];
$prenom = $data[1];
$tel = $data[2];
$email = $data[3];

$emailAgent = $BDDMaster->getone("SELECT email
                        FROM auth
                        WHERE iduser =".$idUser);

//date pour dtcrea
$date = time();

if(isset($_POST['data'])) {
    //requ�te pr�par� pour parer � d'�ventuelles injections SQL
    // voir https://pear.php.net/manual/en/package.database.db.db-common.autoprepare.php
    $table_name = 'test_securite_candidat';
    $table_fields = array('nom', 'prenom', 'telephone', 'email', 'emailAgent', 'dtcrea', 'utilcrea');
    $table_values = array($nom, $prenom, $tel, $email, $emailAgent, $date, $idUser);

    $sth = $BDD->autoPrepare($table_name, $table_fields,
        DB_AUTOQUERY_INSERT);

    if (PEAR::isError($sth)) {
        die($sth->getMessage());
    }

    if($res =& $BDD->execute($sth, $table_values)){
        $candidatId = $BDD->getone("SELECT id FROM test_securite_candidat
                          WHERE nom LIKE '%".$nom ."%'
                          AND prenom LIKE '%".$prenom ."%'
                          AND telephone LIKE '%".$tel ."%'
                          AND email LIKE '%".$email ."%'");
        echo $candidatId;
    }



    if (PEAR::isError($res)) {

        die($res->getMessage());

    }
}
?>
