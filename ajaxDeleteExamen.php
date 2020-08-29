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

$examenToken = $_POST['data'];

if(isset($_POST['data'])) {
    $sql = "DELETE FROM test_securite_examen WHERE examenToken ='$examenToken'";
    $conn->query($sql);
    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
    $conn->close();
}
?>
