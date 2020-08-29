<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$BDDMaster = $GLOBALS['EC']['DB']['MASTER'];

$data = json_decode($_POST['data']);
$examenToken = $data[0];
$score = $data[1];
$total = $data[2];
$nomCandidat = $data[3];
$prenomCandidat = $data[4];
$testNom = $data[5];
$candidatTel = $data[6];
$candidatEmail = $data[7];

$idAgent = $BDD->getone("SELECT utilcrea FROM test_securite_examen
                              WHERE examenToken LIKE '%".$examenToken."%'");

$emailAgent = $BDDMaster->getone("SELECT email
                        FROM auth
                        WHERE iduser =".$idAgent);
//
//// Sujet
$subject = 'Résultats d\'un candidat à un test';
//
// message
$message = '
     <html>
      <head>
       <title>Résultats de '.$prenomCandidat.' '.$nomCandidat.' à un test '.$testNom.'</title>
      </head>
      <body>
       <p>Les résultas de '.$prenomCandidat.' '.$nomCandidat.' au test '.$testNom.'</p>
       <p>sont de '.$score.' / '.$total.'</p>
       <p>Rappel des coordonnées du candidat :</p>
       <p>Adresse Mail : '.$candidatEmail.'</p>
       <p>Téléphone : '.$candidatTel.'</p>
       <p>Vous pouvez choisir de supprimer ce résultat</p>
       <p>et de réinscrire le candidat en cliquant sur le lien suivant</p>
       <a href="https://ag01.travail-temporaire-online.fr/tsecu2/t_secu_suppression_examen.php?token='.$examenToken.'">Suppression de l\'examen</a>
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
