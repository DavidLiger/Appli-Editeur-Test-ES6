<?php

require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_b.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$token = $_GET['token'];

$idExamen = $BDD->getone("SELECT testId FROM test_securite_examen
                              WHERE examenToken LIKE '%".$token."%'");
$testNom = $BDD->getone("SELECT testNom FROM test_securite_examen
                              WHERE examenToken LIKE '%".$token."%'");
$candidat = $BDD->getRow("SELECT nom, prenom FROM test_securite_candidat
                              INNER JOIN test_securite_examen ON test_securite_candidat.id = test_securite_examen.candidatId
                              WHERE test_securite_examen.examenToken LIKE '%".$token."%'");


echo('
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test sécurité</title>
    <link rel="icon" type="image/ico" href="../tsecu2/images/tsecu2/Trefle-bleu-min.png" />
    <link rel="stylesheet" href="../tsecu2/css/t_secu_inscription.css">
    <link href="../outil_bi/css/sb-admin-2.css" rel="stylesheet">
    <link href="https://code.jquery.com/ui/1.12.1/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
</head>

<body >
<div id="particles-js"></div>

<div id="testEditorLinkDiv" style="display: none">
    <button id="testEditorLink">Editeur de test</button>
</div>

<div class="flex">
    <div class="logoTitle" id="logoTitle">
        <img id="logo" src="../outil_bi/images/fond-map.png">
    </div>
    <div class="flex2">
        <div class="title" id="title">
            <h1>Tests hygiène et sécurité</h1>
            <h6><i>L\'application qui vous permet d\'inscrire des candidats aux tests d\'aptitude au poste</i></h6>
        </div>
        <div id="formulaire" style="display: flex;flex-direction: column;align-items: center;background-color: cornflowerblue;border-radius: 5px;margin-top: 50px">
        <p>Voulez-vous supprimez le test '.$testNom.' de '.$candidat['prenom'].' '.$candidat['nom'].' ?</p>
        <p>Vous serez redirigez vers le formulaire d\'inscription suite à cette opération.</p>
        <div style="margin-bottom:20px">
        <button id="deleteExamBtn" style="border: 1px solid #0066cc;background-color: #0099cc;border-radius:10px;color: #ffffff;padding: 5px 10px;text-align: left;">Supprimer</button>
        </div>
        </div>
    </div>
</div>


<input id="idExamen" value="'.$token.'" hidden>

<footer hidden>
    <div id="footDiv" hidden>
        <div class="count-particles" hidden> <span class="js-count-particles">--</span> particles </div>
        <span>Développé par</span>
        <a href="mailto:david.liger@groupeactual.eu">David Liger</a>
        <span>sous la responsabilité de</span>
        <a href="mailto:patrick.machecourt@groupeactual.eu">Patrick Machecourt</a>
        <span> | 2020</span>
    </div>
</footer>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="/../obj_mvc_ts2/js/testSecuSupprExam.js"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<!--<script src="https://threejs.org/examples/js/libs/stats.min.js"></script>-->

</body>
</html>
')

?>
