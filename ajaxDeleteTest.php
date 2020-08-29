<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$servername = "localhost";
$username = "root";
$password = "Tysoft@2019!";
$dbname = "dbextranet_client";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
//if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
//}else{
//    echo("youpi");
//}

$data = json_decode($_POST['data']);

$testNom = $data[0];
$testLangue = $data[1];
$langueLength = $data[2];

$curdir = getcwd();
//$dirPath = $curdir."/images/".$testNom."/".$fileName;

$filesArray = $BDD->getall("SELECT nom FROM test_securite_image
                                WHERE dossier LIKE '%".$testNom."%'");

if(isset($_POST['data'])) {
    if($testLangue == "Toutes les langues" || $langueLength == 1){
        //suppression dossier d'images
        foreach($filesArray as $array){
            foreach($array as $imageName){
            unlink($curdir."/images/".$testNom."/".$imageName);
            $dirPath = $curdir."/images/".$testNom."/".$imageName;
            }
        }
        rmdir($curdir."/images/".$testNom);
        $sql = "DELETE FROM test_securite_test WHERE theme = '$testNom'";
        $sql2 = "DELETE FROM test_securite_image WHERE dossier = '$testNom'";
        $conn->query($sql);
        $conn->query($sql2);
        $conn->close();
    }
    else{
        $sql = "DELETE FROM test_securite_test WHERE theme = '$testNom' AND langue = '$testLangue'";
        $conn->query($sql);
        if ($conn->query($sql) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
        $conn->close();
    }

}
?>
