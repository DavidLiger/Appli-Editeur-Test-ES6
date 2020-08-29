<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
$emailCandidat = $data[0];
$emailAgent = $data[1];
$nom = $data[2];
$prenom = $data[3];
$tel = $data[4];
$token = $data[5];
$testNom = $data[6];
//
//// Sujet
$subject = 'Confirmation d\'inscription d\'un candidat à un test';
//
// message
$message = '
     <html>
      <head>
       <title>Inscription de '.$prenom.' '.$nom.' à un test '.$testNom.'</title>
      </head>
      <body>
       <p>Nous vous confirmons l\'inscription de '.$prenom.' '.$nom.' à un test '.$testNom.'</p>
       <p>Rappel des coordonnées du candidat :</p>
       <p>Adresse Mail : '.$emailCandidat.'</p>
       <p>Téléphone : '.$tel.'</p>
       <p>Cordialement</p>
      </body>
     </html>
     ';

// Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// Envoi
mail($emailAgent,$subject,$message,$headers);


?>
