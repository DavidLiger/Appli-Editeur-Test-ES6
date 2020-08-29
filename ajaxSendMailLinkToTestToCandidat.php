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
$langue = $data[7];


// message
if($langue == 'français'){
    $subject = 'Invitation à passer un test "Aptitude au poste" par votre agence ACTUAL';
    $message = '
     <html>
      <head>
       <title>Inscription à un test '.$testNom.'</title>
      </head>
      <body>
       <p>Bonjour '.$prenom.'</p>
       <p>Vous avez été inscrit à un test '.$testNom.' par votre conseiller ACTUAL</p>
       <p>Ce test est constitué d\'un rappel des règles d\'hygiène et de sécurité en entreprise</p>
       <p>Il se conclue par un questionnaire permettant de tester votre compréhension du sujet</p>
       <p>Merci de vous rendre sur ce lien afin de le remplir</p>
       <a href="https://ag01.travail-temporaire-online.fr/tsecu2/t_secu_test.php?token='.$token.'">Lien vers le test : '.$testNom.'</a>
       <p>Cordialement</p>
      </body>
     </html>
     ';
}
if($langue == 'anglais'){
    $subject = 'Invitation to take a "Fitness for the job" test by your agency ACTUAL';
    $message = '
     <html>
      <head>
       <title>Register for a test '.$testNom.'</title>
      </head>
      <body>
       <p>Hello '.$prenom.'</p>
       <p>You have been registered for a test '.$testNom.' by your ACTUAL advisor</p>
       <p>This test consists of a reminder of the company\'s health and safety policy</p>
       <p>It concludes with a questionnaire to test your understanding of the subject.</p>
       <p>Please go to this link in order to fill it out.</p>
       <a href="https://ag01.travail-temporaire-online.fr/tsecu2/t_secu_test.php?token='.$token.'">Lien vers le test : '.$testNom.'</a>
       <p>Sincerely</p>
      </body>
     </html>
     ';
}


// Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// Envoi
mail($emailCandidat,$subject,$message,$headers);


?>
