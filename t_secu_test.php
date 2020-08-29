<?php

require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_b.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];
$token = $_GET['token'];

$id = $BDD->getone("SELECT id FROM test_securite_examen WHERE examenToken LIKE '%".$token."%'");
//
//if (PEAR::isError($id)) {
//    die($id->getMessage());
//}

if($id != null){
    echo '
        <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test sécurité</title>
    <link rel="icon" type="image/ico" href="../tsecu2/images/tsecu2/Trefle-bleu-min.png" />
    <link rel="stylesheet" href="../tsecu2/css/t_secu_inscription.css">
    <link rel="stylesheet" href="../tsecu2/css/t_secu_test.css">
    <link href="../outil_bi/css/sb-admin-2.css" rel="stylesheet">
</head>

<body>

<div style="display: flex;flex-direction: column">
<div class="flex" style="height: 20%">
    <div class="logoTitle">
        <a href="https://ag01.travail-temporaire-online.fr/">
            <img id="logo" src="../outil_bi/images/fond-map.png">
        </a>
    </div>
    <div class="flex2">
        <div id="titleDiv" class="title" style="cursor: pointer">
            <h1>Tests hygiène et sécurité</h1>
            <h6><i>L\'application qui vous permet de tester votre aptitude au poste</i></h6>
        </div>
        <div class="flex" id="formulaire">
        </div>
    </div>
</div>
<div style="display: flex;justify-content: center;">
<div id="google_translate_element" style="border-radius: 5px"></div>
</div>
<div style="display: flex; flex-direction: row;height: 80%">
     <div style="position:relative;width: 5%;display: flex;justify-content: center">
            <img id="precButton" src="../tsecu2/images/tsecu2/prec-icon.png" style="display:none;width:25px;height: 25px;margin-top: 230px;cursor: pointer" >
        </div>
        <div id="preview" style="position:relative;display: flex; align-items: center;justify-content: center;width: 90%"></div>
        <div style="position:relative;width: 5%;">
            <img id="nextButton" src="../tsecu2/images/tsecu2/next-icon.png" style="display:none;width:25px;height: 25px;margin-top: 230px;cursor: pointer">
        </div>
</div>
</div>


<div><input id="token" value="'.$token.'" hidden></div>
<div id="htmlToPdf" style="display:none"></div>

<footer>
    <div id="footDiv">
        <div class="count-particles"> <span class="js-count-particles">--</span> particles </div>
        <span>Développé par</span>
        <a href="mailto:david.liger@groupeactual.eu">David Liger</a>
        <span>sous la responsabilité de</span>
        <a href="mailto:patrick.machecourt@groupeactual.eu">Patrick Machecourt</a>
        <span> | 2019</span>
    </div>
</footer>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="/../obj_mvc_ts2/js/testSecuTest.js"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

</body>
</html>
    ';
}else{
    echo '
        <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test sécurité</title>
    <link rel="icon" type="image/ico" href="../tsecu2/images/tsecu2/Trefle-bleu-min.png" />
    <link rel="stylesheet" href="../tsecu2/css/t_secu_inscription.css">
    <link href="../outil_bi/css/sb-admin-2.css" rel="stylesheet">
</head>

<body>

<div class="flex">
    <div class="logoTitle">
        <a href="https://ag01.travail-temporaire-online.fr/">
            <img id="logo" src="../outil_bi/images/fond-map.png">
        </a>
    </div>
    <div class="flex2">
        <div id="titleDiv" class="title" style="cursor: pointer">
            <h1>Tests hygiène et sécurité</h1>
            <h6><i>L\'application qui vous permet de tester votre aptitude au poste</i></h6>
        </div>
        <div class="flex" id="formulaire">
        </div>
    </div>
</div>

<div class="flex2" id="page">
    <h2>Vous avez déjà passé ce test.</h2>
    <h4>Dans le cas contraire merci de prendre contact avec votre agence.</h4>
</div>

<footer>
    <div id="footDiv">
        <div class="count-particles"> <span class="js-count-particles">--</span> particles </div>
        <span>Développé par</span>
        <a href="mailto:david.liger@groupeactual.eu">David Liger</a>
        <span>sous la responsabilité de</span>
        <a href="mailto:patrick.machecourt@groupeactual.eu">Patrick Machecourt</a>
        <span> | 2020</span>
    </div>
</footer>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="/../obj_mvc_ts2/js/testSecuTest.js"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

</body>
</html>
    ';
}

?>
