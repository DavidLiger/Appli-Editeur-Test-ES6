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
    <link href="https://code.jquery.com/ui/1.12.1/themes/dark-hive/jquery-ui.css" rel="stylesheet" />
    <link href="../outil_bi/css/sb-admin-2.css" rel="stylesheet">
    <link rel="stylesheet" href="../obj_mvc_ts2/css/t_secu_editeur_test.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
</head>

<body >

<div id="titleDiv">
    <span id="title" style="font-family:Verdana, cursive">Editeur de test</span>
</div>

<div id="editorControllerButtons" style="display: flex;flex-direction: row">
    <div style="display: flex;flex-direction: row;margin-top:2px;margin-left:2px">
        <button id="menuButton">Edition</button>
        <button id="helpButton">Aide</button>
    </div>
    <div id="editor" style="display: none">
        <div id="editorTools" style="display: flex;flex-direction: column;width:228px;height:30px;margin-top: 1%;background-color: #7b7d84;border-radius: 5px;margin-left: 2%;margin-right: 2%;padding-bottom: 3%">
            <div id="pageEditor">
                <div style="display: flex;flex-direction: row;">
                    <div style="display: flex;flex-direction: row;margin-left: 10px;width: 130px;height:30px;margin-top: 2px">
                        <label id="currentPageTemplate" style="font-size: 0.8em;width:42px;margin-right: 5px;margin-top: 1%">Page : </label>
                        <select id="currentPage" class="selectCSS" style="border-radius: 5px 0px 0px 5px;width:25px;font-size: 0.8em;margin-top: 0px;background-color: #bebec0"><option value="1">1</option></select>
                        <button id="addPage" style="background-color: lawngreen;width: 25px;height:25px;border:none;border-radius: 0px;color: darkgreen;font-family: verdana"><span style="margin-left: -2px;margin-top: -1px"> + </span></button>
                        <button id="removePage" style="background-color: red;width: 25px;height:25px;border:none;border-radius: 0px 5px 5px 0px;color: white;font-family:Verdana,cursive"><span style="height:5px;margin-left: -2px;margin-top: -13px"> x </span></button>
                    </div>
                    <div class="slideTempHTML" style="width: 75%;display: flex; flex-direction: row;margin-top: 5%;">
                        <label id="radioTxtLbl">
                            <input id="radioTxt" type="radio" name="valueType" value="txt" checked="checked"/>
                            <img src="../tsecu2/images/tsecu2/type-txt.jpg" style="width: 25px;height:25px;border-radius: 3px 0px 0px 3px;margin-top: -69px;margin-left: 10px"/>
                        </label>
                        <label id="radioImgLbl">
                            <input id="radioImg" type="radio" name="valueType" value="img"/>
                            <img src="../tsecu2/images/tsecu2/type-img.jpg" style="width: 25px;height:25px;border-radius: 0px 0px 0px 0px;margin-top: -69px;margin-left: -6px"/>
                        </label>
                        <label title="info : l'arrière-plan à une dimension de 800px de large pour 600px de haut">
                            <input id="radioBck" type="radio" name="valueType" value="bck"/>
                            <img src="../tsecu2/images/tsecu2/type-bck.jpg" style="width: 25px;height:25px;border-radius: 0px 3px 3px 0px;margin-top: -69px;margin-left: -10px"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="contentEditor" style="display: none;margin-left: 5px">
            <div id="imgEditor" style="display: flex; flex-direction: row;margin-left: 2%;margin-right: 2%;">
                    <div style="display: flex;flex-direction: row;margin-top:1%;">
                        <label id="imageLoaderContainerLbl" title="importer une image"><img id="imageLoaderContainerImg" src="../tsecu2/images/tsecu2/upload-image.jpg" class="labelSelectCSSHidden"></label>
                        <div id="imageLoaderContainer" style="display: flex;flex-direction: row;">
                            <label id="searchImgBtn" for="_file" class="custom-file-upload" title="rechercher une image à importer">
                                <img src="../tsecu2/images/tsecu2/loupe.jpg" class="labelSelectCSSHidden" style="margin-top: 0px;border-radius: 0px 3px 3px 0px">
                            </label>
                            <input type='file' id='_file'>
                            <input type="text" id="fileToUp" style="width:120px;border-radius:3px 3px 3px 3px;background-color:darkgrey;display: none" class="selectCSS" disabled>
                            <label for="_submit"  style="cursor: pointer" title="importer l'image sélectionnée">
                                <img id="uploadEnvoiImg" src="../tsecu2/images/tsecu2/upload-envoi.jpg" style="margin-left:1%;margin-right:5%;margin-top: 0px;border-radius: 3px;font-size: 0.7em;width:25px;height:25px;background-color: #91b6de;color: black;border:none;">
                            </label>
                            <input type='button' id='_submit'>
                            <img id='_progress' src="../tsecu2/images/tsecu2/progress.gif" style="margin-left:5px;display:none;z-index:2;width: 15%;height: 50%;margin-top: 5px">
                            <span id="errorSpan" style="color: red;display: none;margin-left:5px"></span>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top:1%;margin-left: 1%">
                        <label id="selectImageListLbl" title="sélectionnez une image"><img id="selectImageListImg" src="../tsecu2/images/tsecu2/images.jpg" class="labelSelectCSSVisible"></label>
                        <select id="selectImageList" class="selectCSS" style="width: 120px;background-color:darkgrey;margin-top: 0px;">
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%">
                        <label id="cssImgWidthLbl" title="largeur de l'image"><img id="cssImgWidthImg" src="../tsecu2/images/tsecu2/width-size.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgWidth" class="selectCSS" style="display: none">
                            <option value="25%">25%</option>
                            <option value="50%">50%</option>
                            <option value="75%">75%</option>
                            <option value="100%" selected>100%</option>
                            <option value="125%">125%</option>
                            <option value="150%">150%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgHeightLbl" title="hauteur de l'image"><img id="cssImgHeightImg" src="../tsecu2/images/tsecu2/height-size.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgHeight" class="selectCSS" style="display: none">
                            <option value="25%">25%</option>
                            <option value="50%">50%</option>
                            <option value="75%">75%</option>
                            <option value="100%" selected>100%</option>
                            <option value="125%">125%</option>
                            <option value="150%">150%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgBorderRadiusLbl" title="arrondi des angles"><img id="cssImgBorderRadiusImg" src="../tsecu2/images/tsecu2/border-radius.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgBorderRadius" class="selectCSS" style="display: none">
                            <option value="0%" selected>0%</option>
                            <option value="5%">5%</option>
                            <option value="10%">10%</option>
                            <option value="15%">15%</option>
                            <option value="20%">20%</option>
                            <option value="25%">25%</option>
                            <option value="30%">30%</option>
                            <option value="35%">35%</option>
                            <option value="40%">40%</option>
                            <option value="45%">45%</option>
                            <option value="50%">50%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgMarginLeftLbl" title="écart depuis le bord gauche"><img id="cssImgMarginLeftImg" src="../tsecu2/images/tsecu2/margin-left.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgMarginLeft" class="selectCSS" style="display: none">
                            <option value="0%" selected>0%</option>
                            <option value="5%">5%</option>
                            <option value="10%">10%</option>
                            <option value="15%">15%</option>
                            <option value="20%">20%</option>
                            <option value="25%">25%</option>
                            <option value="30%">30%</option>
                            <option value="35%">35%</option>
                            <option value="40%">40%</option>
                            <option value="45%">45%</option>
                            <option value="50%">50%</option>
                            <option value="75%">75%</option>
                            <option value="100%">100%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgFilterBlurLbl" title="flou"><img id="cssImgFilterBlurImg" src="../tsecu2/images/tsecu2/blur.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgFilterBlur" class="selectCSS" style="display: none">
                            <option value="blur(0px)" selected>0px</option>
                            <option value="blur(1px)">1px</option>
                            <option value="blur(2px)">2px</option>
                            <option value="blur(3px)">3px</option>
                            <option value="blur(4px)">4px</option>
                            <option value="blur(5px)">5px</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgFilterBrightnessLbl" title="luminosité"><img id="cssImgFilterBrightnessImg" src="../tsecu2/images/tsecu2/light.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgFilterBrightness" class="selectCSS" style="display: none">
                            <option value="brightness(0%)" selected>0%</option>
                            <option value="brightness(25%)">25%</option>
                            <option value="brightness(50%)">50%</option>
                            <option value="brightness(75%)">75%</option>
                            <option value="brightness(100%)">100%</option>
                            <option value="brightness(125%)">125%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgFilterContrastLbl" title="contraste"><img id="cssImgFilterContrastImg" src="../tsecu2/images/tsecu2/contrast.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgFilterContrast" class="selectCSS" style="display: none">
                            <option value="contrast(0%)" selected>0%</option>
                            <option value="contrast(25%)">25%</option>
                            <option value="contrast(50%)">50%</option>
                            <option value="contrast(75%)">75%</option>
                            <option value="contrast(100%)">100%</option>
                            <option value="contrast(125%)">125%</option>
                            <option value="contrast(150%)">150%</option>
                            <option value="contrast(175%)">175%</option>
                            <option value="contrast(200%)">200%</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1%;margin-left: 1%;">
                        <label id="cssImgFilterGrayscaleLbl" title="niveaux de gris"><img id="cssImgFilterGrayscaleImg" src="../tsecu2/images/tsecu2/grayscale.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssImgFilterGrayscale" class="selectCSS" style="display: none">
                            <option value="grayscale(0%)" selected>0%</option>
                            <option value="grayscale(10%)">10%</option>
                            <option value="grayscale(20%)">20%</option>
                            <option value="grayscale(30%)">30%</option>
                            <option value="grayscale(40%)">40%</option>
                            <option value="grayscale(50%)">50%</option>
                            <option value="grayscale(60%)">60%</option>
                            <option value="grayscale(70%)">70%</option>
                            <option value="grayscale(80%)">80%</option>
                            <option value="grayscale(90%)">90%</option>
                            <option value="grayscale(100%)">100%</option>
                        </select>
                    </div>
            </div>
            <div id="textEditor" style="display: flex; flex-direction: row;margin-left: 2%;margin-right: 2%;">
                    <div style="display: flex; flex-direction: row;margin-top: 2%;">
                        <label id="cssTxtFontFamilyLbl" title="police"><img id="cssTxtFontFamilyImg" src="../tsecu2/images/tsecu2/font.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssTxtFontFamily" style="display: none;margin-top: 1px" class="selectCSS">
                            <option value="Times New Roman" style="font-family: Times New Roman, Times, serif" selected>Times New Roman</option>
                            <option value="Verdana" style="font-family: Verdana, Geneva, sans-serif">Verdana</option>
                            <option value="Courier New" style="font-family: Courier New, Courier, monospace">Courier New</option>
                            <option value="Comic Sans MS" style="font-family: Comic Sans MS, cursive">Comic Sans MS</option>
                            <option value="Cottonwood" style="font-family: Cottonwood, FB Reactor, fantasy">Cottonwood</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <label id="cssTxtFontSizeLbl" title="taille de la police"><img id="cssTxtFontSizeImg" src="../tsecu2/images/tsecu2/font-size.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssTxtFontSize" style="display: none;margin-top: 1px" class="selectCSS">
                            <option value="8px">8px</option>
                            <option value="10px">10px</option>
                            <option value="12px">12px</option>
                            <option value="15px">15px</option>
                            <option value="20px">20px</option>
                            <option value="30px">30px</option>
                            <option value="40px">40px</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <input id="cssTxtColor" type="color" style="border-radius: 3px;border: none;width: 40px;height: 25px;" title="couleur de la police"/>
                    </div>
                    <div class="slideTempHTML" style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <label id="cssTxtAlignLeftLbl" title="texte aligné à gauche" style="width: 25px;height:25px;">
                            <input type="radio" id="cssTxtAlignLeft" name="cssTxtAlign" value="left">
                            <img src="../tsecu2/images/tsecu2/text-align-left.jpg" style="width: 25px;height:25px;border-radius: 3px 0px 0px 3px;margin-top: -49px"/>
                        </label>
                        <label id="cssTxtAlignCenterLbl" title="texte centré" style="width: 25px;height:25px;">
                            <input type="radio" id="cssTxtAlignCenter" name="cssTxtAlign" value="center">
                            <img src="../tsecu2/images/tsecu2/text-align-center.jpg" style="width: 25px;height:25px;border-radius: 0px 0px 0px 0px;margin-top: -49px"/>
                        </label>
                        <label id="cssTxtAlignRightLbl" title="texte aligné à droite" style="width: 25px;height:25px;">
                            <input type="radio" id="cssTxtAlignRight" name="cssTxtAlign" value="right">
                            <img src="../tsecu2/images/tsecu2/text-align-right.jpg" style="width: 25px;height:25px;border-radius: 0px 3px 3px 0px;margin-top: -49px"/>
                        </label>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <label id="cssTxtLetterSpacingLbl" title="espace entre les lettres"><img id="cssTxtLetterSpacingImg" src="../tsecu2/images/tsecu2/letter-space.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssTxtLetterSpacing" style="display: none;margin-top: 1px" class="selectCSS">
                            <option value="1px">1px</option>
                            <option value="2px">2px</option>
                            <option value="3px">3px</option>
                            <option value="-1px">-1px</option>
                            <option value="-2px">-2px</option>
                            <option value="-3px">-3px</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <label id="cssTxtLineHeightLbl" title="espace entre les lignes"><img id="cssTxtLineHeightImg" src="../tsecu2/images/tsecu2/line-space.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssTxtLineHeight" style="display: none;margin-top: 1px" class="selectCSS">
                            <option value="0.7">0.7</option>
                            <option value="0.9">0.9</option>
                            <option value="1.1">1.1</option>
                            <option value="1.3">1.3</option>
                            <option value="1.5">1.5</option>
                            <option value="1.9">1.9</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 2%;margin-left: 1%;">
                        <label id="cssTxtWordSpacingLbl" title="espace entre les mots"><img id="cssTxtWordSpacingImg" src="../tsecu2/images/tsecu2/word-space.jpg" class="labelSelectCSSHidden"></label>
                        <select id="cssTxtWordSpacing" style="display: none;margin-top: 1px" class="selectCSS">
                            <option value="10px">10px</option>
                            <option value="5px">5px</option>
                            <option value="3px">3px</option>
                            <option value="-3px">-3px</option>
                            <option value="-5px">-5px</option>
                            <option value="-10px">-10px</option>
                        </select>
                    </div>
            </div>
    </div>
    <button id="saveButton" style="display:none;font-size: 0.7em;width:120px;background-image:url(../tsecu2/images/tsecu2/saveButtonGif.gif);color:white">Enregistrer</button>
</div>

<div>
    <div id="menuList" style="display: none;">
        <div style="display: flex; flex-direction: column">
            <button class="subMenuButton" id="newTestButton">Nouveau test</button>
            <button class="subMenuButton" id="modifyTestButton">Modifier un test</button>
            <button class="subMenuButton" id="translateTestButton">Traduire un test</button>
            <button class="subMenuButton" id="removeTestButton">Supprimer un test</button>
        </div>
    </div>
    <div id="helpList" style="display: none;">
        <div style="display: flex; flex-direction: column">
            <button class="subHelpButton">Guide d'utilisation</button>
            <button class="subHelpButton">Contact</button>
        </div>
    </div>
</div>

<div id="editorPanel" style="display: flex; flex-direction: column;margin-top: 3%">
    <div style="display: flex; flex-direction: row">
        <div style="position:relative;width: 5%;display: flex;justify-content: center">
            <img id="precButton" src="../tsecu2/images/tsecu2/prec-icon.png" style="display:none;width:25px;height: 25px;margin-top: 230px;cursor: pointer" >
        </div>
        <div id="preview" style="position:relative;display: flex; align-items: center;justify-content: center;width: 90%"></div>
        <div style="position:relative;width: 5%;">
            <img id="nextButton" src="../tsecu2/images/tsecu2/next-icon.png" style="display:none;width:25px;height: 25px;margin-top: 230px;cursor: pointer">
        </div>
    </div>
    <div id="caroussel" style="width: 100%;height: 25%"></div>
</div>

<div id="dialogHider" >
    <div id="dialogMenu" style="display: flex; flex-direction: column"></div>
</div

<footer>
    <div id="footDiv">
        <span>Développé par</span>
        <a href="mailto:david.liger@groupeactual.eu">David Liger</a>
        <span>sous la responsabilité de</span>
        <a href="mailto:patrick.machecourt@groupeactual.eu">Patrick Machecourt</a>
        <span> | 2020</span>
    </div>
</footer>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="/../obj_mvc_ts2/js/editorController.js"></script>
<script src="/../obj_mvc_ts2/js/editorView.js"></script>
<script src="/../obj_mvc_ts2/js/model.js"></script>
<script src="/../obj_mvc_ts2/js/dialog.js"></script>
<script src="/../obj_mvc_ts2/js/elementSelector.js"></script>
<!-- <script src="/../obj_mvc_ts2/js/testSecuEditeurTest.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

</body>
</html>
