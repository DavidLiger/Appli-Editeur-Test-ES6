<?php

require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_b.php');

global $a;
$connecte=$a->getAuthData('iduser');
$iduser= remplacant();


if(is_actual($iduser)==0){echo "not user";die;}

//DROIT ACCES
if('droit'=='droit'){
    if(droit_acces($iduser,31)==0){echo "ACCES NON AUTORISE : => LOW BREACK";die;}
}
?>

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
            <h6><i>L'application qui vous permet d'inscrire des candidats aux tests d'aptitude au poste</i></h6>
        </div>
        <div class="flex" id="formulaire">
        </div>
    </div>
</div>

<div id="dialogHider" style="display: none">
    <div id = "dialog-1"
         title = "Candidat existant !" style="display: flex; flex-direction: column"><span id="spanDialog"></span><img id="imgDialog" style="height: 50px"></div>
</div

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
<script src="/../obj_mvc_ts2/js/testSecuInscription.js"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<!--<script src="https://threejs.org/examples/js/libs/stats.min.js"></script>-->

</body>
</html>
