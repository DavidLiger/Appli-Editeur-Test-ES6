var testId = 0;
var testNom ="";
var testLangue ="";
var testNomToDel ="";
var testLangueToDel ="";
var datapage ="";
var dataPages = "";
var dataBrut = "";
var template="";
var images = "";
var cases = "";
var templateCases = "";
var textes = "";
var data = "";
var imageList = "";
var texteList = "";
var fileName = "";
var checkFileNameVal;
var imageToLoad= "";
var uploadStatus = "";
var oldCurrentCase = "";
var oldCurrentPage = "";
var caseArray= "";
var pagePosition= "";
var position = "";
var focusedCase = "";
var textAreaValue = "";
var cssArrayGlobal = "";
var orderGloabal = "";
var timeUpdate = "";
var timeInterval = "";
var now = "";
var distance = "";
var seconds = "";
var langueLength = 0;
var questionArray = "";
var questionsNb = 0;
var testChosenVal = "";
//flag servant à stopper la multiplication d'exécution des méthodes
//durant le temps de réponses des requetes HTTP
var flag = 0;
var flag2 = 0;
var flag3 = 0;
var timeFlag = true;

var cssImgWidth = document.getElementById('cssImgWidth');
var cssImgHeight = document.getElementById('cssImgHeight');
var cssImgBorderRadius = document.getElementById('cssImgBorderRadius');
var cssImgMarginLeft = document.getElementById('cssImgMarginLeft');
var cssImgFilterBlur = document.getElementById('cssImgFilterBlur');
var cssImgFilterBrightness = document.getElementById('cssImgFilterBrightness');
var cssImgFilterContrast = document.getElementById('cssImgFilterContrast');
var cssImgFilterGrayscale = document.getElementById('cssImgFilterGrayscale');

var cssTxtFontFamily = document.getElementById('cssTxtFontFamily');
var cssTxtFontSize = document.getElementById('cssTxtFontSize');
var cssTxtColor = document.getElementById('cssTxtColor');
var cssTxtLetterSpacing = document.getElementById('cssTxtLetterSpacing');
var cssTxtLineHeight = document.getElementById('cssTxtLineHeight');
var cssTxtWordSpacing = document.getElementById('cssTxtWordSpacing');
var cssTxtAlign = document.getElementsByName('cssTxtAlign');

var textArea = document.getElementById('textArea');


$(document).ready(function () {
    createEditeur();
    //$('#page').on('click', "#testChangeToken", function () {
    //    tokenRewriter();
    //});
    $('#dialogTemplateChoicer').on('click', function(){
        dialogLoading("chooseTemplate");
    });
    editorButtons();
    ctrlVstrs();
});

function focusedCaseCSS(){
    if(focusedCase != ""){
        $(".previewBorder").css("border","1px solid black");
        var thisCase = document.getElementById(focusedCase);
        thisCase.style["border"] = "1px solid red";
        //textArea dans la div
        if($('[name="valueType"]:radio:checked').val() == "txt"){
            var width = thisCase.offsetWidth;
            var height = thisCase.offsetHeight;
            $("#textArea").remove();
            thisCase.innerHTML =
                "<div style='z-index: 50;position:absolute'><textarea id='textArea' style='width:"+width+"px;height:"+height+"px;border-radius: 5px" +
                ";font-size: 0.9em;background:transparent;border:transparent;outline: none;border:none;resize: none;'>"+textAreaValue+"</textarea></div>";
            applyCSS(cssArrayGlobal,orderGloabal);
            txtStyleSelectAndTextareaListener();
            //fonction qui renvoie le curseur derrière le dernier caractère
            (function($){
                $.fn.focusTextToEnd = function(){
                    this.focus();
                    var $thisVal = this.val();
                    this.val('').val($thisVal);
                    return this;
                }
            }(jQuery));

            $('#textArea').focusTextToEnd();
        }
    }else{
        $(".previewBorder").css("border","1px solid black");
    }

}


function createEditeur(){
    setDialogUI(380,250);
    menuAndHelpButtons();
}

function setDialogUI(width,height){
    $( "#dialogMenu" ).dialog({
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        open: function() {
            $(this).parents('.ui-dialog').attr('tabindex', -1)[0].focus();
        }
    }).prev(".ui-dialog-titlebar").css("background","darkblue");
}

/**
 * Apprition et disparition des menus Menu et Aide
 * et appel de la boite de dialogue avec un ordre spécifique
 */
function menuAndHelpButtons(){
    //boutons de la barre de menu
    $('#menuButton').click(function(event){
        //ferme sous menu quand clic en dehors
        if ( event.ctrlKey ) {
            window.location.reload(true);
        } else {
            //normal click
            $('#menuList').slideDown(function(){
                document.body.addEventListener('click', boxCloser, false);
            });
            $("#helpList").hide();
        }
    });
    $(".subMenuButton").on('click', function(){
        $("#menuList").slideUp();
    });
    $("#helpButton").on('click', function(event){
        if ( event.ctrlKey ) {
            reinitData();
        } else {
            //ferme sous menu quand clic en dehors
            $('#helpList').slideDown(function(){
                document.body.addEventListener('click', helpBoxCloser, false);
            });
            $("#menuList").slideUp();
        }
    });
    $(".subHelpButton").on('click', function(){
        $("#helpList").slideUp();
    });
    //boutons du sous-menu edition
    $("#newTestButton").on('click', function(){
        dialogLoading("newTest");
    });
    $("#modifyTestButton").on('click', function(){
        dialogLoading("modifyTest");
    });
    $("#removeTestButton").on('click', function(){
        dialogLoading("removeTest");
    });
}

function reinitData(){
    var queryValues = [];
    queryValues.push(36);
    queryValues.push("1#back1.jpg#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/txt#ghdhgdfhgdfhgdfhgdhg sdfsdf kjjhhj#font-family:Courier New;font-size:20px;color:000000;text-align:right;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#admin3.jpg#width:100%;height:25%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#admin4.png#width:50%;height:100%;border-radius:0%;margin-left:20%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|txt#C'est super d'être intérimaire !!!hkjhkjhkj#font-family:Verdana;font-size:20px;color:004000;text-align:center;letter-spacing:-1px;line-height:1.1;word-spacing:3px|img#admin2.jpg#width:75%;height:100%;border-radius:0%;margin-left:10%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#iconeStats.png#width:50%;height:100%;border-radius:0%;margin-left:20%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#iconeStats.png#width:50%;height:100%;border-radius:0%;margin-left:20%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#region-17-marker.png#width:25%;height:100%;border-radius:0%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#btnBack.png#width:50%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|##§2##/##|##|##|##§6##/##|##|##|##|##|##|##§7##/img#Maurice-Minion-FINAL-Copie.jpg#width:50%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|##|##|##|##|txt#fghdfghfgdhd#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px§8##/txt#tyrtyeytyery#font-family:Comic Sans MS;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#admin4.png#width:25%;height:100%;border-radius:0%;margin-left:40%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|txt#qsdqsdqsdq#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px§9#back2.jpg#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/txt#fghdfghdfgh#font-family:Comic Sans MS;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|txt#fghgdfh#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#shaker-bob.png#width:25%;height:100%;border-radius:0%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|##|##|txt#hfghgdfh#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px§10##/##|##|txt#qsdqsdqsd#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px§11##/txt#fghgfhfhgfhjjjj#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#Maurice-Minion-FINAL-Copie.jpg#width:50%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|txt#fghfghfghfgh#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##|##§12##/txt#sdfsdfsdfsfd#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#region-4-marker.png#width:100%;height:75%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|##|##|txt#fsdfsdfdsf#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px§13##/txt#sdfsdfsdf#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##|##|##|##|##|##|txt#sdfsdfsdfs#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##|##|##|##§14##/##|##|##|##§5##/##|##|##|##|##§4##/##|##|##|##§1##/txt#ghfghfghfgh#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#back1.jpg#width:50%;height:25%;border-radius:50%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|txt#ffffffffffhfghfghgfh#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##|##|##§3#back1.jpg#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/txt#sfsdfsdfsdfsdfsdfsdf#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##|img#admin2.jpg#width:25%;height:100%;border-radius:0%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|##|##|##§1##/img#admin4.png#width:50%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|txt#fghgfhgfh gdfgdfg#font-family:Courier New;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|txt#  hgfhfghdfghfghfgh#font-family:Comic Sans MS;font-size:20px;color:000000;text-align:center;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#Maurice-Minion-FINAL-Copie.jpg#width:50%;height:100%;border-radius:0%;margin-left:20%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|img#region-4-marker.png#width:50%;height:75%;border-radius:0%;margin-left:20%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)§2#back1.jpg#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/txt#wgwdfgwdgwdgwdg#font-family:Courier New;font-size:20px;color:000000;text-align:left;letter-spacing:-1px;line-height:1.3;word-spacing:3px|img#admin3.jpg#width:25%;height:100%;border-radius:0%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|txt#ertzertzertzertezrt#font-family:Courier New;font-size:20px;color:000000;text-align:left;letter-spacing:-1px;line-height:1.3;word-spacing:3px§3#CaptureFR.PNG#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/txt#retertertertertertert#font-family:Comic Sans MS;font-size:25px;color:000000;text-align:center;letter-spacing:1px;line-height:1.3;word-spacing:3px|txt#-èu-èu-èu-èuuuu-u-è-èu-èu#font-family:Comic Sans MS;font-size:25px;color:000000;text-align:right;letter-spacing:1px;line-height:1.3;word-spacing:3px|img#admin2.jpg#width:25%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|img#admin2.jpg#width:25%;height:100%;border-radius:0%;margin-left:30%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|img#admin2.jpg#width:25%;height:100%;border-radius:0%;margin-left:70%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)§2##/img#shaker-bob.png#width:25%;height:100%;border-radius:0%;margin-left:40%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)|##|txt#tbtggt#font-family:Courier New;font-size:20px;color:000000;text-align:left;letter-spacing:-1px;line-height:1.3;word-spacing:3px|##§16#back1.jpg#width:100%;height:100%;border-radius:0%;margin-left:0%;filter:blur(0px) brightness(100%) contrast(100%) grayscale(0%)/##|##|##|qst#Les groupes d'interim sont-ils les descendants des négriers ?#Vrai#Faux#0§17##/##|##|txt#ertertertertertertretert#font-family:Courier New;font-size:20px;color:000000;text-align:left;letter-spacing:-1px;line-height:1.3;word-spacing:3px|qst#qsdf#sdf#sdf#0|qst#rty#y#y#1§18##/##|qst#qsdfsdf#f#f#1|##|qst#sdfsdfsdf#f#f#0|##|qst#zerzerzer#rrrr#r#0");
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxUpdatePage.php',
        data: 'data='+data
    });
}

/**
 * Fermeture automatique du menu du bouton Menu
 * @param e
 */
function boxCloser(e){
    if(e.target.id != 'menuList'){
        document.body.removeEventListener('click', boxCloser, false);
        $('#menuList').slideUp();
    }
}

/**
 * Fermeture automatique du menu du bouton Aide
 * @param e
 */
function helpBoxCloser(e){
    if(e.target.id != 'helpList'){
        document.body.removeEventListener('click', helpBoxCloser, false);
        $('#helpList').slideUp();
    }
}

/**
 * Chargement de la fenêtre de dialogue premettant
 * de choisir le test à modifier
 * @param order
 */
function dialogLoading(order){
    if(order == "newTest"){
        setDialogUI(630,460);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Créer un nouveau test').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
            '<div id="txtConfirmation">' +
            '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px">' +
            '<label id="lblSelectTexte" style="color: black">Test : </label>' +
            '<input id="newTest" style="font-size: 0.8em" placeholder="Entrez le nom du thème">' +
            '</div>' +
            '<label style="margin-top:30px;color: black;">Modèle de la première page : </label>' +
            '<div id="selectTemplate"></div>'+
            '<div style="display: flex;flex-direction: row;margin-top: 2%">' +
            '<button id="dialogCancel" style="margin-left: 80%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button>' +
            '</div>' +
            '</div>'
        );
        selectTemplateLoader();
        $("#dialogOK").click(function(){
            saveNewTest();
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "modifyTest"){
        setDialogUI(330,140);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Modifier un test').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end"><div id="txtConfirmation">' +
            '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px"><label id="lblSelectTexte" style="color: black">' +
            'Test : </label><select ' +
            'id="selectTest"></select></div>'
        );
        getTestsByName();
    }
    if(order == "chooseTemplate"){
        $('#dialogMenu').dialog('option', 'title', 'Choisir un modèle de page').empty().html(
            '<div class="slide-container slideTempHTML">' +
            '<label class="slide" id="slide-1"> ' +
            '<input type="radio" name="tempChoicer" value="1|6" checked> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate1.jpg" /> ' +
            '</label> ' +
            '<label class="slide" id="slide-2"> ' +
            '<input type="radio" name="tempChoicer" value="2|4"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate2.jpg" /> ' +
            '</label> ' +
            '<label class="slide" id="slide-3"> ' +
            '<input type="radio" name="tempChoicer" value="3|7"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate3.jpg" /> ' +
            '</label> ' +
            '<label class="slide" id="slide-4"> ' +
            '<input type="radio" name="tempChoicer" value="4|4"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate4.jpg" /> ' +
            '</label> ' +
            '<label class="slide" id="slide-5"> ' +
            '<input type="radio" name="tempChoicer" value="5|5"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate5.jpg" /> ' +
            '</label> ' +
            '</div>'
        );
    }
    if(order == "warningDuplicateSavingTentative"){
        setDialogUI(380,280);
        $('#dialogMenu').dialog('option', 'title', 'Duplicata interdit').empty().html(
            '<div style="display: flex; flex-direction:column;align-items: center">' +
            '<span style="color: red;font-size: 1.5em">ATTENTION !</span>' +
            '<span style="color: black;font-size: 1.1em">Ce test existe.</span>' +
            '<span style="color: black;font-size: 1.1em">Pour une modification merci de sélectionner "Modifier un test" dans le menu Edition</span>' +
            '</div>'
        );
    }
    if(order == "warningChangingDataType"){
        setDialogUI(380,220);
        function getTypeOfCheckBox(){
            if(caseArray[0] == "txt"){
                return "une image";
            }else{
                return "un texte";
            }
        }
        var type = getTypeOfCheckBox();
        $('#dialogMenu').dialog('option', 'title', 'Suppression de contenu').empty().html(
            '<div style="display: flex; flex-direction:column;align-items: center">' +
            '<span style="color: red;font-size: 1.5em">ATTENTION !</span>' +
            '<span style="color: black;font-size: 0.9em">Voulez-vous ajoutez '+type+' ?</span>' +
            '<span style="color: black;font-size: 0.9em">Le contenu précédent sera perdu !</span>' +
            '<div style="display: flex;flex-direction: row;margin-top: 5%">'+
            '<button id="dialogCancel" style="margin-left: 77%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button></div>'+
            '</div>'
        );
        $("#dialogOK").click(function(){
            //nettoyer case
            var radioChecked = $('[name="valueType"]:radio:checked').val();
            if(radioChecked != caseArray[0]){
                if(caseArray[0] == "img"){
                    caseArray[0] = "txt";
                    caseArray[1] = "";
                    flag2 = 1;
                    updateCaseInDatapage();
                }
                if(caseArray[0] == "txt"){
                    caseArray[0] = "img";
                    caseArray[1] = "";
                    caseArray[2] = "";
                    $("#textArea").val(" ");
                    //flag2 = 1;
                    //updateCaseInDatapage();
                    fileName = "";
                    getImagesForTest(testNom);
                }
            }
            closeDialog();
        });
        $("#dialogCancel").click(function(){
            if(caseArray[0] == "txt"){
                $("#radioTxt").prop("checked", true);
                txtOrImgPanel();
                closeDialog();
            }else{
                $("#radioImg").prop("checked", true);
                txtOrImgPanel();
                closeDialog();
            }
        });
    }
    if(order == "removeTest"){
        setDialogUI(330,140);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Suppression de test').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end"><div id="txtConfirmation">' +
            '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px"><label id="lblSelectTexte" style="color: black">' +
            'Test : </label><select ' +
            'id="selectTest"></select></div>'
        );
        getTestsByName("remove");
    }
    if(order == "warningDeleteTest"){
        setDialogUI(380,200);
        var avertissementDeleteDir = "";
        if(testLangueToDel == "Toutes les langues"){
            avertissementDeleteDir = "(vous supprimerez également le dossier d'images)";
            setDialogUI(380,240);
        }
        $('#dialogMenu').dialog('option', 'title', 'Suppression de test').empty().html(
            '<div style="display: flex; flex-direction:column;align-items: center">' +
            '<span style="color: red;font-size: 1.5em">ATTENTION !</span>' +
            '<span style="color: black;font-size: 0.8em">Voulez-vous supprimez '+testNom+' ?</span>' +
            '<div style="display: flex;flex-direction: row;margin-top: 5%">'+
            '<button id="dialogCancel" style="margin-left: 77%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button></div>'+
            '</div>'
        );
        $("#dialogOK").click(function(){
            //fonction effacement
            deleteTest();
            closeDialog();
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "addPage"){
        setDialogUI(350,180);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Ajout de page').empty().html(
            '<div style="display: flex; flex-direction:column;align-items: center">' +
            '<span style="color: black;font-size: 0.9em">Voulez-vous ajoutez une page à la position '+(+pagePosition+1)+' ?</span>' +
            '<div style="display: flex;flex-direction: row;margin-top: 5%">'+
            '<button id="dialogCancel" style="margin-left: 77%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button></div>'+
            '</div>'
        );
        $("#dialogOK").click(function(){
            //fonction effacement
            addPage();
            //closeDialog();
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "choosePresOrTestType"){
        setDialogUI(380,355);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Présentation ou Test ?').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
            '<div id="txtConfirmation">' +
            '<label style="margin-top:7px;color: black;">Voulez-vous insérez une page de présentation ou une page de test ?</label>' +
            '<div id="selectTemplate"></div>'+
            '<div style="display: flex;flex-direction: row;margin-top: 2%">' +
            '<button id="dialogCancel" style="margin-left: 60%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button>' +
            '</div>' +
            '</div>'
        );
        $("#selectTemplate").empty().html(
            '<div class="slideTempHTML">' +
            '<label id="slide-1"> ' +
            '<input type="radio" name="tempChoicer" value="presentation" checked> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/PresentationTemplate.jpg" /> ' +
            '</label> ' +
            '<label id="slide-2"> ' +
            '<input type="radio" name="tempChoicer" value="test"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/TestTemplate.jpg" /> ' +
            '</label> '+
            '</div>'
        );
        $("#dialogOK").click(function(){
            if($('input[name="tempChoicer"]:radio:checked').val() == "presentation"){
                closeDialog();
                dialogLoading("choosePageType");
            }
            if($('input[name="tempChoicer"]:radio:checked').val() == "test"){
                closeDialog();
                dialogLoading("chooseTestType");
            }
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "choosePageType"){
        setDialogUI(550,390);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Structure de la nouvelle page').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
            '<div id="txtConfirmation">' +
            '<label style="margin-top:30px;color: black;">Modèle de la page : </label>' +
            '<div id="selectTemplate"></div>'+
            '<div style="display: flex;flex-direction: row;margin-top: 2%">' +
            '<button id="dialogCancel" style="margin-left: 80%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button>' +
            '</div>' +
            '</div>'
        );
        selectTemplateLoader();
        //templateChoicer();
        $("#dialogOK").click(function(){
            //fonction effacement
            createNewPage();
            closeDialog();
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "chooseTestType"){
        setDialogUI(550,355);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Structure du nouveau test').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
            '<div id="txtConfirmation">' +
            '<label style="margin-top:8px;color: black;">Modèle de la page : </label>' +
            '<div id="selectTemplate"></div>'+
            '<div style="display: flex;flex-direction: row;margin-top: 2%">' +
            '<button id="dialogCancel" style="margin-left: 75%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button>' +
            '</div>' +
            '</div>'
        );
        $("#selectTemplate").empty().html(
            '<div class="slideTempHTML slideTempHTML">' +
            '<label class="slide" id="slide-1"> ' +
            '<input type="radio" name="testChoicer" value="16|4" checked> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/TestTemplate1.jpg" /> ' +
            '</label> ' +
            '<label class="slide" id="slide-2"> ' +
            '<input type="radio" name="testChoicer" value="17|5"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/TestTemplate2.jpg" /> ' +
            '</label> '+
            '<label class="slide" id="slide-3"> ' +
            '<input type="radio" name="testChoicer" value="18|6"> ' +
            '<img src="../obj_mvc_ts2/images/tsecu2/TestTemplate3.jpg" /> ' +
            '</label> '+
            '</div>'
        );
        $("#dialogOK").click(function(){
            if($('input[name="testChoicer"]:radio:checked').val() == "16|4"){
                questionsNb = 0;
                questionArray = new Array(1);
            }
            if($('input[name="testChoicer"]:radio:checked').val() == "17|5"){
                questionsNb = 0;
                questionArray = new Array(2);
            }
            if($('input[name="testChoicer"]:radio:checked').val() == "18|6"){
                questionsNb = 0;
                questionArray = new Array(3);
            }
            //alert($('input[name="testChoicer"]:radio:checked').val());
            testChosenVal = $('input[name="testChoicer"]:radio:checked').val();
            dialogLoading("questionTest");
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "questionTest"){
        setDialogUI(540,440);
        //attribution du titre
        var questionPos = +questionsNb+1;
        $('#dialogMenu').dialog('option', 'title', 'Intitulus de la question').empty().html(
            '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
            '<div id="txtConfirmation">' +
            '<label style="margin-top:8px;color: black;">Question numéro '+questionPos+' : </label>' +
            '<div id="selectTemplate">' +
            '<textarea id="questionTextArea" style="width: 490px;height: 80px;resize: none;"></textarea>' +
            '<label style="margin-top:8px;color: black;">Intitulés des réponses : </label>' +
            '<div style="display: flex;flex-direction: row">' +
            '<textarea id="repOneTextArea" style="width: 45%;height: 80px;resize: none;"></textarea>' +
            '<textarea id="repTwoTextArea" style="width: 45%;margin-left:9%;height: 80px;resize: none;"></textarea>' +
            '</div>'+
            '<label style="margin-top:8px;color: black;font-size: 0.8em">Cochez la bonne réponse : </label>' +
            '<div style="display: flex;flex-direction: row">' +
            '<input type="radio" name="repChoicer" value="0" style="width: 50%;" checked>' +
            '<input type="radio" name="repChoicer" value="1" style="width: 50%;">' +
            '</div>'+
            '<span id="emptyTextareaWarning" style="display:none;color: red;">Vous devez remplir chaque case</span>'+
            '</div>'+
            '<div style="display: flex;flex-direction: row;margin-top: 1%">' +
            '<button id="dialogCancel" style="margin-left: 70%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button>' +
            '</div>' +
            '</div>'
        );
        $("#dialogOK").click(function(){
            //alert(questionsNb);
            //alert(questionArray.length);
            if($("#questionTextArea").val() == "" || $("#repOneTextArea").val() == "" || $("#repTwoTextArea").val() == ""){
                $("#emptyTextareaWarning").show();
            }else{
                questionArray[questionsNb] = $("#questionTextArea").val()+"#"+ $("#repOneTextArea").val()+"#"+ $("#repTwoTextArea").val()+"#"+$('input[name="repChoicer"]:radio:checked').val();
                //alert(questionArray[questionsNb]);
                closeDialog();
                questionsNb++;
                if(questionsNb < questionArray.length){
                    dialogLoading("questionTest");
                }
                else{
                    createNewTest();
                    closeDialog();
                }
            }
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    if(order == "removePage"){
        setDialogUI(350,150);
        //attribution du titre
        $('#dialogMenu').dialog('option', 'title', 'Suppression de page').empty().html(
            '<div style="display: flex; flex-direction:column;align-items: center">' +
            '<span style="color: black;font-size: 0.9em">Voulez-vous supprimer la page '+pagePosition+' ?</span>' +
            '<div style="display: flex;flex-direction: row;margin-top: 5%">'+
            '<button id="dialogCancel" style="margin-left: 77%;font-size:0.8em;">Annuler</button>'+
            '<button id="dialogOK" style="font-size:0.8em;">OK</button></div>'+
            '</div>'
        );
        $("#dialogOK").click(function(){
            //fonction effacement
            removePage();
            closeDialog();
        });
        $("#dialogCancel").click(function(){
            closeDialog();
        });
    }
    //ouverture
    $("#dialogHider").show();
    $("#dialogMenu").dialog("open");

}

function selectTemplateLoader(){
    $("#selectTemplate").empty().html(
        '<div class="slide-container slideTempHTML">' +
        '<label class="slide" id="slide-1"> ' +
        '<input type="radio" name="tempChoicer" value="1|6" checked> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate1.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-2"> ' +
        '<input type="radio" name="tempChoicer" value="2|4"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate2.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-3"> ' +
        '<input type="radio" name="tempChoicer" value="3|7"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate3.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-4"> ' +
        '<input type="radio" name="tempChoicer" value="4|4"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate4.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-5"> ' +
        '<input type="radio" name="tempChoicer" value="5|5"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate5.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-6"> ' +
        '<input type="radio" name="tempChoicer" value="6|7"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate6.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-7"> ' +
        '<input type="radio" name="tempChoicer" value="7|7"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate7.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-8"> ' +
        '<input type="radio" name="tempChoicer" value="8|4"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate8.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-9"> ' +
        '<input type="radio" name="tempChoicer" value="9|7"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate9.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-10"> ' +
        '<input type="radio" name="tempChoicer" value="10|3"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate10.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-11"> ' +
        '<input type="radio" name="tempChoicer" value="11|5"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate11.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-12"> ' +
        '<input type="radio" name="tempChoicer" value="12|6"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate12.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-13"> ' +
        '<input type="radio" name="tempChoicer" value="13|12"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate13.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-14"> ' +
        '<input type="radio" name="tempChoicer" value="14|4"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate14.jpg" /> ' +
        '</label> ' +
        '<label class="slide" id="slide-15"> ' +
        '<input type="radio" name="tempChoicer" value="15|8"> ' +
        '<img src="../obj_mvc_ts2/images/tsecu2/HTMLtemplate15.jpg" /> ' +
        '</label> ' +
        '</div>'
    );
}

function addPage(){
    dialogLoading("choosePresOrTestType");
}

function createNewPage(){
    var tempValue = $('input[name="tempChoicer"]:radio:checked').val();
    //alert(tempValue);
    tempValue = tempValue.split("|");
    var dataNewPage = tempValue[0]+"##/##";
    var nbCases = tempValue[1];
    //alert(nbCases);
    for(var i = 0; i < nbCases-1; i++){
        dataNewPage = dataNewPage+"|##";
    }
    //ajout dans le tableau des pages
    dataPages.splice(pagePosition,0,dataNewPage);
    dataBrut = dataPages.join('§');
    //console.log("dataBrut : "+dataBrut);
    var queryValues = [];
    queryValues.push(testId);
    queryValues.push(dataBrut);
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxUpdatePage.php',
        data: 'data='+data,
        success: function(){
            flag2 = 1;
            if(flag2 == 1){
                oldCurrentCase = "";
                focusedCase = "";
                pagePosition = +pagePosition+1;
                getTest(null);
                console.log("currentPage : "+pagePosition);
                //oldCurrentPage = pagePosition;
                //pagePosition = $(this).val();
                $("#saveButton").hide();
            }
        }
    });
}

function createNewTest(){
    //alert("createNewTest");
    //var tempValue = $('input[name="testChoicer"]:radio:checked').val();
    //alert("testChosenVal : "+testChosenVal);
    var tempValue = testChosenVal.split("|");
    var dataNewPage = tempValue[0]+"##/##";
    var nbCases = tempValue[1];
    if(tempValue[0] == "16"){
        for(var i = 0; i < nbCases-1; i++){
            //alert("questionArray[0] : "+questionArray[0]);
            if(i == 2){
                //alert("questionArray[0] : "+questionArray[0]);
                dataNewPage = dataNewPage+"|qst#"+questionArray[0];
            }
            if(i == 0 || i == 1){
                dataNewPage = dataNewPage+"|##";
            }
        }
    }
    if(tempValue[0] == "17"){
        for(var i = 0; i < nbCases-1; i++){
            if(i == 2){
                dataNewPage = dataNewPage+"|qst#"+questionArray[0];
            }
            if(i == 3){
                dataNewPage = dataNewPage+"|qst#"+questionArray[1];
            }
            if(i == 0 || i == 1){
                dataNewPage = dataNewPage+"|##";
            }
        }
    }
    if(tempValue[0] == "18"){
        for(var i = 0; i < nbCases-1; i++){
            if(i == 0){
                dataNewPage = dataNewPage+"|qst#"+questionArray[0];
            }
            if(i == 2){
                dataNewPage = dataNewPage+"|qst#"+questionArray[1];
            }
            if(i == 4){
                dataNewPage = dataNewPage+"|qst#"+questionArray[2];
            }
            if(i == 1 || i == 3){
                dataNewPage = dataNewPage+"|##";
            }
        }
    }
    //alert("dataNewPage : "+dataNewPage);
    dataPages.splice(pagePosition,0,dataNewPage);
    dataBrut = dataPages.join('§');
    //console.log("dataBrut : "+dataBrut);
    var queryValues = [];
    queryValues.push(testId);
    queryValues.push(dataBrut);
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxUpdatePage.php',
        data: 'data='+data,
        success: function(){
            flag2 = 1;
            if(flag2 == 1){
                oldCurrentCase = "";
                focusedCase = "";
                pagePosition = +pagePosition+1;
                getTest(null);
                console.log("currentPage : "+pagePosition);
                //oldCurrentPage = pagePosition;
                //pagePosition = $(this).val();
                $("#saveButton").hide();
            }
        }
    });
}

function removePage(){
    if(pagePosition-1 > 0){
        dataPages.splice(pagePosition-1,1);
        dataBrut = dataPages.join('§');
        //console.log("dataBrut : "+dataBrut);
        var queryValues = [];
        queryValues.push(testId);
        queryValues.push(dataBrut);
        var data = JSON.stringify(queryValues);
        $.ajax({
            type: 'POST',
            url: '../obj_mvc_ts2/ajaxUpdatePage.php',
            data: 'data='+data,
            success: function(){
                flag2 = 1;
                var len = dataPages.length;
                console.log("len : "+len);
                console.log("pagePosition : "+pagePosition);
                if(flag2 == 1){
                    oldCurrentCase = "";
                    focusedCase = "";
                    if(pagePosition > len){
                        pagePosition = pagePosition-1;
                    }
                    getTest(null);
                    console.log("currentPage : "+pagePosition);
                    //oldCurrentPage = pagePosition;
                    //pagePosition = $(this).val();
                    $("#saveButton").hide();
                }
            }
        });
    }else{
        alert("vous ne pouvez pas supprimez la première page d'un test, vous pouvez supprimer le test entier")
    }

}

function saveNewTest(){
    var testNomInput = document.getElementById('newTest');
    testNom = testNomInput.value;
    //testLangue = jQuery('#selectLangue option:selected').text();
    testLangue = "français";
    if(testNom !="" && testLangue != "Sélectionnez une langue"){
        checkIfTestAlreadyExists(testNom,testLangue);
        closeDialog();
    }else{
        //a améliorez
        //console.log("vous devez attribuez un nom au test et sélectionnez une langue");
    }
}

function deleteTest(){
    var queryValues = [];
    queryValues.push(testNomToDel);
    queryValues.push(testLangueToDel);
    queryValues.push(langueLength);
    var dataTest = JSON.stringify(queryValues);
    //console.log(dataTest);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxDeleteTest.php',
        data: 'dataTest='+dataTest,
        //dataType: 'text',
        success: function (response) {
            //alert(response);
            if(testNomToDel == testNom && testLangueToDel == testLangue){
                location.reload();
            }
            testNomToDel = "";
            testLangueToDel = "";
            testId = 0;
        }
    });
}

function checkIfTestAlreadyExists(testNom,testLangue){
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(testLangue);
    var dataTest = JSON.stringify(queryValues);
    //console.log(dataTest);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxCheckIfTestAlreadyExists.php',
        data: 'dataTest='+dataTest,
        dataType: 'text',
        success: function (response) {
            //alert(response);
            if(response == "true"){
                dialogLoading("warningDuplicateSavingTentative");
            }else{
                creationNewTest(testNom,testLangue);
            }
        }
    });
}

function creationNewTest(testNom,testLangue){
    //création datapage JSON
    var tempValue = $('input[name="tempChoicer"]:radio:checked').val();
    //alert(tempValue);
    tempValue = tempValue.split("|");
    var dataNewPage = tempValue[0]+"##/##";
    var nbCases = tempValue[1];
    //alert(nbCases);
    for(var i = 0; i < nbCases-1; i++){
        dataNewPage = dataNewPage+"|##";
    }
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(testLangue);
    queryValues.push(dataNewPage);
    var dataTest = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxInsertNewTest.php',
        data: 'dataTest='+dataTest,
        datatype:'text',
        success: function(response){
            //console.log(response);
            flag = 1;
            getImagesForTest(testNom);
            getTest(null);
        }
    });
}

function closeDialog(){
    $("#dialogMenu").dialog("close");
}

function txtOrImgPanel(){
    var radioChecked = $('[name="valueType"]:radio:checked').val();
    if(radioChecked == "bck"){
        $("#textEditor").hide();
        $("#imgEditor").show();
        $("#ARInfo").show();
        $("#radioTxt").attr('disabled',true).attr('title','Cliquez sur une case pour l\'éditer');
        $("#radioImg").attr('disabled',true).attr('title','Cliquez sur une case pour l\'éditer');
        $("#radioTxtLbl").attr('title','Cliquez sur une case pour l\'éditer').css("color","lightgrey");
        $("#radioImgLbl").attr('title','Cliquez sur une case pour l\'éditer').css("color","lightgrey");
        if(templateCases[1] == ""){
            selectStyleSetter(null,null,"reset","img");
            fileName = "";
            flag2 = 1;
        }else{
            getTest(null);
            focusedCase = "";
            oldCurrentCase = "";
        }
        //console.log("caseArray[0] : "+caseArray[0]+", radioChecked : "+radioChecked);
    }else{
        $("#ARInfo").hide();
        $("#radioTxtLbl").css("color","white");
        $("#radioImgLbl").css("color","white");
        if(radioChecked == "txt"){
            $("#textEditor").show();
            $("#imgEditor").hide();
            clearInterval(checkFileNameVal);
            $("#fileToUp").hide("slide", { direction: "left" }, 5).val(fileName);
            $("#uploadEnvoiImg").removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.jpg");
        }else{
            $("#textEditor").hide();
            $("#imgEditor").show();
        }
        //console.log("caseArray[0] : "+caseArray[0]+", radioChecked : "+radioChecked);
        if(radioChecked != caseArray[0]){
            if(caseArray[0] == "txt" && radioChecked == "img"){
                selectStyleSetter(null,null,"reset","img");
                fileName = "";
                flag = 1;
                dialogLoading("warningChangingDataType");
            }
            if(caseArray[0] == "img" && radioChecked == "txt"){
                $("#textArea").val(" ");
                textAreaValue = "";
                selectStyleSetter(null,null,"reset","txt");
                dialogLoading("warningChangingDataType");
            }
        }
    }
}

/**
 * Datapage découpé et afficher dans les éléments de l'éditeur
 * et dans le preview
 */
function readDataPage(arrowClicked){
    $('#title').text("Editeur de test - "+testNom+" - "+testLangue);
    dataPages = dataBrut.split("§");
    //console.log("dataPages in readDataPage : "+dataPages);
    //refaire select des pages du test selon nombre de cases du tableau
    currentPageSetter();
    if(dataPages[0] != "" && dataPages[0] != null ){
        data = dataPages[pagePosition-1].split("/");
        //console.log(data);
        templateCases = data[0].split("#");
        template = templateCases[0];
        cases = data[1].split("|");
        //alert(templateCases);
        editorLoader();
        previewLoader(arrowClicked);
    }
}

function currentPageSetter(){
    var dataPagesLenght = dataPages.length;
    $('#currentPage').empty();
    for(var i = 0; i < dataPagesLenght; i++){
        //if(oldCurrentPage != "" || oldCurrentPage != null || oldCurrentPage != "undefined"){
            if(i+1 == pagePosition){
                $('#currentPage').append('<option selected>'+(i+1)+'</option>')
            }else{
                $('#currentPage').append('<option>'+(i+1)+'</option>')
            }
        //}
    }
    if(pagePosition == "" || pagePosition == null || pagePosition == "undefined"){
        pagePosition = 1;
    }
    console.log("oldCurrentPage : "+oldCurrentPage+", pagePosition : "+pagePosition);
    nextPrevArrowDisplay();
}

function txtStyleSelectAndTextareaListener(){
    var textArea = document.getElementById('textArea');
    //console.log("ok");
    $("#cssTxtFontFamily").removeAttr("style");
    $("#cssTxtFontFamily").css("border-raidus","5px").css("font-size","0.9em")
        .css("display","none").css("margin-top","1px").css("width","120px")
        .css("font-family",$("#cssTxtFontFamily option:selected").val());
    cssTxtFontFamily.onchange = function(){
        $("#cssTxtFontFamily").removeAttr("style");
        $("#cssTxtFontFamily").css("border-raidus","5px").css("font-size","0.9em")
            .css("display","none").css("margin-top","1px").css("width","120px")
            .css("font-family",$("#cssTxtFontFamily option:selected").val());
        flag2 = 1;
        updateCaseInDatapage();
    };
    cssTxtFontSize.onchange = function(){
        flag2 = 1;
        updateCaseInDatapage();
    };
    cssTxtColor.onchange = function(){
        flag2 = 1;
        updateCaseInDatapage();
    };
    $('input[name="cssTxtAlign"]').click(function(e) {
        e.stopPropagation();
        flag2 = 1;
        updateCaseInDatapage();
    });
    cssTxtLetterSpacing.onchange = function(){
        flag2 = 1;
        updateCaseInDatapage();
    };
    cssTxtLineHeight.onchange = function(){
        flag2 = 1;
        updateCaseInDatapage();
    };
    cssTxtWordSpacing.onchange = function(){
        flag2 = 1;
        updateCaseInDatapage();
    };
    $("#textArea").on('input', function(){
        if($("#textArea").val() != null){
            $("#saveButton").show();
        }
    });
    $("#textArea").change(function(){
        if($("#textArea").val() != null){
            $("#saveButton").show();
        }
    });
}

function editorLoader(){

    function imageStyleSelectListener(){
        cssImgWidth.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgHeight.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgBorderRadius.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgMarginLeft.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgFilterBlur.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgFilterBrightness.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgFilterContrast.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
        cssImgFilterGrayscale.onchange = function(){
            flag2 = 1;
            updateCaseInDatapage();
        };
    }


    function dataSpliter(){
        flag3 = 0;
        //console.log(flag3);
        if($('[name="valueType"]:radio:checked').val() == "bck" && focusedCase == ""){
            fileName = templateCases[1];
            if(fileName == "" || fileName == "undefined" || fileName == null){
                selectStyleSetter(null,null,"reset","img");
                updateCaseInDatapage();
                flag = 1;
                getImagesForTest(testNom);
            }else{
                flag = 1;
                getImagesForTest(testNom);
                applyCSS(templateCases[2],"img");
            }
            imageStyleSelectListener(templateCases[2]);
        }else{
            if(focusedCase == ""){
                focusedCase = 0;
            }
            var currentCase = cases[focusedCase];
            caseArray = currentCase.split("#");
            if(caseArray[0] == "txt"){
                $("#radioTxt").prop("checked", true);
                txtOrImgPanel();
                if(caseArray[1] == "" || caseArray[1] == "undefined" || caseArray[1] == null){
                    selectStyleSetter(null,null,"reset",caseArray[0]);
                    updateCaseInDatapage();
                    currentCase = cases[focusedCase];
                    caseArray = currentCase.split("#");
                    textAreaValue = "";
                    //cssArrayGlobal = caseArray[2];
                    orderGloabal = caseArray[0];
                    //applyCSS(caseArray[2],caseArray[0]);

                }else{
                    currentCase = cases[focusedCase];
                    caseArray = currentCase.split("#");
                    textAreaValue = caseArray[1];
                    //alert($("#textArea").val());
                    cssArrayGlobal = caseArray[2];
                    orderGloabal = caseArray[0];
                    applyCSS(caseArray[2],caseArray[0]);
                }
                txtStyleSelectAndTextareaListener();
            }
            if(caseArray[0] == "img"){
                $("#radioImg").prop("checked", true);
                txtOrImgPanel();
                fileName = caseArray[1];
                //alert("fileName : "+fileName)
                if(fileName == "" || fileName == "undefined" || fileName == null){
                    selectStyleSetter(null,null,"reset",caseArray[0]);
                    //update de la string datapage et boucle comme dans else
                    updateCaseInDatapage();
                    currentCase = cases[focusedCase];
                    caseArray = currentCase.split("#");
                    flag = 1;
                    getImagesForTest(testNom);
                    //applyCSS(caseArray[2],caseArray[0]);
                }else{
                    flag = 1;
                    getImagesForTest(testNom);
                    //console.log(fileName);
                    applyCSS(caseArray[2],caseArray[0]);
                }
                imageStyleSelectListener(caseArray[2]);
            }
            if(caseArray[0] == ""){
                $("#radioTxt").prop("checked", true);
                txtOrImgPanel();
                $("#textArea").val("");
                //caseArray[0] = "";
                selectStyleSetter(null,null,"reset","txt");
                fileName = "";
                flag = 1;
                getImagesForTest(testNom);
                selectStyleSetter(null,null,"reset","img");
            }
        }
    }

    flag3 = 1;
    if(flag3 == 1){
        dataSpliter();
    }
}

function selectStyleSetter(cssAttr, value, order, type){
    //ajout de condition soit caseArray[0]=="txt" -> reset des select de style de texte editor
    //sinon reset de ceux de images
    //console.log(value);
    if(type =="txt"){
        if(order != null){
            $("#textArea").removeAttr("style").css("height","180px").css("border-radius","5px").css("font-size","0.9em");
            //reset des selects
            $("#cssTxtFontFamily").empty().append('<option value="Times New Roman" style="font-family: Times New Roman" selected>Times New Roman</option>')
                .append('<option value="Verdana" style="font-family: Verdana">Verdana</option>')
                .append('<option value="Courier New" style="font-family: Courier New">Courier New</option>')
                .append('<option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option>')
                .append('<option value="Cottonwood" style="font-family: Cottonwood">Cottonwood</option>');
            $("#cssTxtFontFamily").removeAttr("style");
            $("#cssTxtFontFamily").css("border-raidus","5px").css("font-size","0.9em").css("display","none").css("margin-top","1px")
                .css("font-family",$("#cssTxtFontFamily option:selected").val());
            $("#cssTxtFontSize").empty();
            for(var i = 1; i<=6 ; i++){
                var percent = i*5;
                if(percent == 15){
                    $("#cssTxtFontSize").append('<option value="'+percent+'px" selected>'+percent+'px</option>');
                }else{
                    $("#cssTxtFontSize").append('<option value="'+percent+'px">'+percent+'px</option>');
                }
            }
            $("#cssTxtColor").val("#000000");
            $("#cssTxtAlignLeft").prop("checked", true);
            $("#cssTxtLetterSpacing").empty();
            //$("#cssTxtAlign").empty().append()
            for(var j = 3; j>=-3 ; j--){
                if(j != 0){
                    if(j == 1){
                        $("#cssTxtLetterSpacing").append('<option value="'+j+'px" selected>'+j+'px</option>');
                    }else{
                        $("#cssTxtLetterSpacing").append('<option value="'+j+'px">'+j+'px</option>');
                    }
                }
            }
            $("#cssTxtLineHeight").empty();
            for(var k = 7; k<=19 ; k+=2){
                if(k == 9){
                    $("#cssTxtLineHeight").append('<option value="'+k/10+'" selected>'+k/10+'</option>');
                }else{
                    $("#cssTxtLineHeight").append('<option value="'+k/10+'">'+k/10+'</option>');
                }
            }
            $("#cssTxtWordSpacing").empty();
            for(var l = 9; l>=-9 ; l-=3){
                if(l != 0){
                    if(l == 3){
                        $("#cssTxtWordSpacing").append('<option value="'+l+'px" selected>'+l+'px</option>');
                    }else{
                        $("#cssTxtWordSpacing").append('<option value="'+l+'px">'+l+'px</option>');
                    }
                }
            }
        }else{
            if(cssAttr == "font-family"){
                $("#cssTxtFontFamily").empty();
                if(value == "Times New Roman"){
                    $("#cssTxtFontFamily").append('<option value="Times New Roman" style="font-family: Times New Roman" selected>Times New Roman</option>')
                }else{
                    $("#cssTxtFontFamily").append('<option value="Times New Roman" style="font-family: Times New Roman">Times New Roman</option>')
                };
                if(value == "Verdana"){
                    $("#cssTxtFontFamily").append('<option value="Verdana" style="font-family: Verdana" selected>Verdana</option>')
                }else{
                    $("#cssTxtFontFamily").append('<option value="Verdana" style="font-family: Verdana">Verdana</option>')
                };
                if(value == "Courier New"){
                    $("#cssTxtFontFamily").append('<option value="Courier New" style="font-family: Courier New" selected>Courier New</option>')
                }else{
                    $("#cssTxtFontFamily").append('<option value="Courier New" style="font-family: Courier New">Courier New</option>')
                };
                if(value == "Comic Sans MS"){
                    $("#cssTxtFontFamily").append('<option value="Comic Sans MS" style="font-family: Comic Sans MS" selected>Comic Sans MS</option>')
                }else{
                    $("#cssTxtFontFamily").append('<option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option>')
                };
                if(value == "Cottonwood"){
                    $("#cssTxtFontFamily").append('<option value="Cottonwood" style="font-family: Cottonwood" selected>Cottonwood</option>')
                }else{
                    $("#cssTxtFontFamily").append('<option value="Cottonwood" style="font-family: Cottonwood">Cottonwood</option>')
                }
            }
            if(cssAttr == "font-size"){
                $("#cssTxtFontSize").empty();
                value = value.slice(0,-2);
                for(var j = 1; j<=6 ; j++){
                    var percent = j*5;
                    if(percent == value){
                        $("#cssTxtFontSize").append('<option value="'+percent+'px" selected>'+percent+'px</option>');
                    }else{
                        $("#cssTxtFontSize").append('<option value="'+percent+'px">'+percent+'px</option>');
                    }
                }
            }
            if(cssAttr == "color"){
                $("#cssTxtColor").val("#"+value);
            }
            if(cssAttr == "text-align"){
                if(value == "left"){
                    $("#cssTxtAlignLeft").prop("checked", true);
                }
                if(value == "center"){
                    $("#cssTxtAlignCenter").prop("checked", true);
                }
                if(value == "right"){
                    $("#cssTxtAlignRight").prop("checked", true);
                }
            }
            if(cssAttr == "letter-spacing"){
                $("#cssTxtLetterSpacing").empty();
                value = value.slice(0,-2);
                for(var j = 3; j>=-3 ; j--){
                    if(j != 0){
                        if(j == value){
                            $("#cssTxtLetterSpacing").append('<option value="'+j+'px" selected>'+j+'px</option>');
                        }else{
                            $("#cssTxtLetterSpacing").append('<option value="'+j+'px">'+j+'px</option>');
                        }
                    }
                }
            }
            if(cssAttr == "line-height"){
                $("#cssTxtLineHeight").empty();
                value = value*10;
                for(var k = 7; k<=19 ; k+=2){
                    if(k == value){
                        $("#cssTxtLineHeight").append('<option value="'+k/10+'" selected>'+k/10+'</option>');
                    }else{
                        $("#cssTxtLineHeight").append('<option value="'+k/10+'">'+k/10+'</option>');
                    }
                }
            }
            if(cssAttr == "word-spacing"){
                $("#cssTxtWordSpacing").empty();
                value = value.slice(0,-2);
                for(var l = 9; l>=-9 ; l-=3){
                    if(l != 0){
                        if(l == value){
                            $("#cssTxtWordSpacing").append('<option value="'+l+'px" selected>'+l+'px</option>');
                        }else{
                            $("#cssTxtWordSpacing").append('<option value="'+l+'px">'+l+'px</option>');
                        }
                    }
                }
            }
        }
    }
    if(type == "img"){
        if(order != null){
            //reset des selects
            $("#cssImgWidth").empty();
            for(var i = 1; i<=6 ; i++){
                var percent = i*25;
                if(percent == 50){
                    $("#cssImgWidth").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgWidth").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgHeight").empty();
            for(var i = 1; i<=6 ; i++){
                var percent = i*25;
                if(percent == 100){
                    $("#cssImgHeight").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgHeight").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgBorderRadius").empty();
            for(var i = 0; i<=10 ; i++){
                var percent = i*5;
                if(percent == 0){
                    $("#cssImgBorderRadius").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgBorderRadius").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgMarginLeft").empty();
            for(var i = 0; i<=10 ; i++){
                var percent = i*10;
                if(percent == 0){
                    $("#cssImgMarginLeft").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgMarginLeft").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgFilterBlur").empty();
            for(var j = 0; j<=5 ; j++){
                if(j == 0){
                    $("#cssImgFilterBlur").append('<option value="'+j+'px" selected>'+j+'px</option>');
                }else{
                    $("#cssImgFilterBlur").append('<option value="'+j+'px">'+j+'px</option>');
                }
            }
            $("#cssImgFilterBrightness").empty();
            for(var k = 0; k<=5 ; k++){
                var percent = k*25;
                if(percent == 100){
                    $("#cssImgFilterBrightness").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgFilterBrightness").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgFilterContrast").empty();
            for(var l = 0; l<=7 ; l++){
                var percent = l*25;
                if(percent == 100){
                    $("#cssImgFilterContrast").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgFilterContrast").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
            $("#cssImgFilterGrayscale").empty();
            for(var m = 0; m<=10 ; m++){
                var percent = m*10;
                if(percent == 0){
                    $("#cssImgFilterGrayscale").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                }else{
                    $("#cssImgFilterGrayscale").append('<option value="'+percent+'%">'+percent+'%</option>');
                }
            }
        }else{
            value = value.slice(0,-1);
            if(cssAttr == "width"){
                $("#cssImgWidth").empty();
                for(var i = 1; i<=6 ; i++){
                    var percent = i*25;
                    if(percent == value){
                        $("#cssImgWidth").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                    }else{
                        $("#cssImgWidth").append('<option value="'+percent+'%">'+percent+'%</option>');
                    }
                }
            }
            if(cssAttr == "height"){
                $("#cssImgHeight").empty();
                for(var i = 1; i<=6 ; i++){
                    var percent = i*25;
                    if(percent == value){
                        $("#cssImgHeight").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                    }else{
                        $("#cssImgHeight").append('<option value="'+percent+'%">'+percent+'%</option>');
                    }
                }
            }
            if(cssAttr == "border-radius"){
                $("#cssImgBorderRadius").empty();
                for(var i = 0; i<=10 ; i++){
                    var percent = i*5;
                    if(percent == value){
                        $("#cssImgBorderRadius").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                    }else{
                        $("#cssImgBorderRadius").append('<option value="'+percent+'%">'+percent+'%</option>');
                    }
                }
            }
            if(cssAttr == "margin-left"){
                $("#cssImgMarginLeft").empty();
                for(var i = 0; i<=10 ; i++){
                    var percent = i*10;
                    if(percent == value){
                        $("#cssImgMarginLeft").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                    }else{
                        $("#cssImgMarginLeft").append('<option value="'+percent+'%">'+percent+'%</option>');
                    }
                }
            }
            if(cssAttr == "filter"){
                var attrFilter = value.split(" ");
                for(var i = 0; i<attrFilter.length; i++){
                    var attrFilterParam = attrFilter[i].split("(");
                    attrFilterParam[1] = attrFilterParam[1].replace(')', '');
                    if(attrFilterParam[0] == "blur"){
                        $("#cssImgFilterBlur").empty();
                        attrFilterParam[1] = attrFilterParam[1].slice(0,-2);
                        for(var j = 0; j<=5 ; j++){
                            if(j == attrFilterParam[1]){
                                $("#cssImgFilterBlur").append('<option value="'+j+'px" selected>'+j+'px</option>');
                            }else{
                                $("#cssImgFilterBlur").append('<option value="'+j+'px">'+j+'px</option>');
                            }
                        }
                    }
                    if(attrFilterParam[0] == "brightness"){
                        $("#cssImgFilterBrightness").empty();
                        attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                        for(var k = 0; k<=5 ; k++){
                            var percent = k*25;
                            if(percent == attrFilterParam[1]){
                                $("#cssImgFilterBrightness").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                            }else{
                                $("#cssImgFilterBrightness").append('<option value="'+percent+'%">'+percent+'%</option>');
                            }
                        }
                    }
                    if(attrFilterParam[0] == "contrast"){
                        $("#cssImgFilterContrast").empty();
                        attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                        for(var l = 0; l<=7 ; l++){
                            var percent = l*25;
                            if(percent == attrFilterParam[1]){
                                $("#cssImgFilterContrast").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                            }else{
                                $("#cssImgFilterContrast").append('<option value="'+percent+'%">'+percent+'%</option>');
                            }
                        }
                    }
                    if(attrFilterParam[0] == "grayscale"){
                        $("#cssImgFilterGrayscale").empty();
                        attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                        for(var m = 0; m<=10 ; m++){
                            var percent = m*10;
                            if(percent == attrFilterParam[1]){
                                $("#cssImgFilterGrayscale").append('<option value="'+percent+'%" selected>'+percent+'%</option>');
                            }else{
                                $("#cssImgFilterGrayscale").append('<option value="'+percent+'%">'+percent+'%</option>');
                            }
                        }
                    }
                }
            }
        }
    }
    selectStyleAnimation("#cssImgWidthLbl","#cssImgWidth","#cssImgWidthImg");
    selectStyleAnimation("#cssImgHeightLbl","#cssImgHeight","#cssImgHeightImg");
    selectStyleAnimation("#cssImgBorderRadiusLbl","#cssImgBorderRadius","#cssImgBorderRadiusImg");
    selectStyleAnimation("#cssImgMarginLeftLbl","#cssImgMarginLeft","#cssImgMarginLeftImg");
    selectStyleAnimation("#cssImgFilterBlurLbl","#cssImgFilterBlur","#cssImgFilterBlurImg");
    selectStyleAnimation("#cssImgFilterBrightnessLbl","#cssImgFilterBrightness","#cssImgFilterBrightnessImg");
    selectStyleAnimation("#cssImgFilterContrastLbl","#cssImgFilterContrast","#cssImgFilterContrastImg");
    selectStyleAnimation("#cssImgFilterGrayscaleLbl","#cssImgFilterGrayscale","#cssImgFilterGrayscaleImg");
    selectStyleAnimation("#imageLoaderContainerLbl","#imageLoaderContainer","#imageLoaderContainerImg");

    selectStyleAnimation("#cssTxtFontFamilyLbl","#cssTxtFontFamily","#cssTxtFontFamilyImg");
    selectStyleAnimation("#cssTxtFontSizeLbl","#cssTxtFontSize","#cssTxtFontSizeImg");
    selectStyleAnimation("#cssTxtLetterSpacingLbl","#cssTxtLetterSpacing","#cssTxtLetterSpacingImg");
    selectStyleAnimation("#cssTxtLineHeightLbl","#cssTxtLineHeight","#cssTxtLineHeightImg");
    selectStyleAnimation("#cssTxtWordSpacingLbl","#cssTxtWordSpacing","#cssTxtWordSpacingImg");
}

function selectStyleAnimation(label,select,image){
    var option = select+" option";
    $(label).click(function(){
        $(image).removeClass("labelSelectCSSHidden").addClass("labelSelectCSSVisible");
        $(select).show("slide", { direction: "left" }, 5);
    });
    $(select).click(function(){
        $(select).show();
    });
    $(option).click(function(){
        $(select).hide("slide", { direction: "left" }, 5);
        $(image).removeClass("labelSelectCSSVisible").addClass("labelSelectCSSHidden");
    });
    $(document).click(function(event) {
        $target = $(event.target);
        if(!$target.closest(label).length
            && !$target.closest(select).length
            && !$target.closest(option).length &&
            $(select).is(":visible")) {
            $(select).hide();
            $(image).removeClass("labelSelectCSSVisible").addClass("labelSelectCSSHidden");
            //clearInterval(checkFileNameVal);
        }
    });
}

function applyCSS(cssArray,order){
    //alert("cssArray : "+cssArray+" order : "+order);
    if(order == "img"){
        //$("#imageLoader").removeAttr("style");
        var cssArray = cssArray.split(";");
        for(var i = 0; i<cssArray.length; i++){
            var attrCSS = cssArray[i].split(":");
            //$("#imageLoader").css(attrCSS[0],attrCSS[1],null);
            selectStyleSetter(attrCSS[0],attrCSS[1],null,order);
        }
    }else{
        var cssArray = cssArray.split(";");
        for(var i = 0; i<cssArray.length; i++){
            var attrCSS = cssArray[i].split(":");
            if(attrCSS[0] == "color"){
                $("#textArea").css(attrCSS[0],"#"+attrCSS[1],null);
            }else{
                $("#textArea").css(attrCSS[0],attrCSS[1],null);
            }

            selectStyleSetter(attrCSS[0],attrCSS[1],null,order);
        }
    }
}


function updateCaseInDatapage(){
    //var position = "";
    //if(oldCurrentCase != ""){
    var position = oldCurrentCase-1;
    //pagePosition = $("#currentCase option:selected").val();
    //}
    console.log("position : "+position);
    var caseType = $('[name="valueType"]:radio:checked').val();
    var caseValue = "";
    var caseStyle = "";
    if(caseType == "img"){
        caseValue = $('#selectImageList option:selected').val();
        caseStyle = "width:"+cssImgWidth.value+
            ";height:"+cssImgHeight.value+
            ";border-radius:"+cssImgBorderRadius.value+
            ";margin-left:"+cssImgMarginLeft.value+
            ";filter:blur("+cssImgFilterBlur.value+
            ") brightness("+cssImgFilterBrightness.value+
            ") contrast("+cssImgFilterContrast.value+
            ") grayscale("+cssImgFilterGrayscale.value+
            ")";
    }
    if(caseType == "txt"){
        if($("#textArea").val() == "undefined" || $("#textArea").val() == "" || $("#textArea").val() == null){
            caseType = "";
            caseValue = "";
            caseStyle = "";
        }else{
            caseType = $('[name="valueType"]:radio:checked').val();
            caseValue = $("#textArea").val();
            caseStyle = "font-family:"+cssTxtFontFamily.value+
                ";font-size:"+cssTxtFontSize.value+
                ";color:"+cssTxtColor.value.substr(1)+
                ";text-align:"+$('input[name="cssTxtAlign"]:radio:checked').val()+
                ";letter-spacing:"+cssTxtLetterSpacing.value+
                ";line-height:"+cssTxtLineHeight.value+
                ";word-spacing:"+cssTxtWordSpacing.value;
        }
        //console.log("caseType : "+caseType+" / caseValue : "+caseValue+" / caseStyle : "+caseStyle);
    }
    if(caseType == "bck"){
        caseValue = $('#selectImageList option:selected').val();
        caseStyle = "width:"+cssImgWidth.value+
            ";height:"+cssImgHeight.value+
            ";border-radius:"+cssImgBorderRadius.value+
            ";margin-left:"+cssImgMarginLeft.value+
            ";filter:blur("+cssImgFilterBlur.value+
            ") brightness("+cssImgFilterBrightness.value+
            ") contrast("+cssImgFilterContrast.value+
            ") grayscale("+cssImgFilterGrayscale.value+
            ")";
        templateCases.splice(1,1,caseValue);
        templateCases.splice(2,1,caseStyle);
    }
    var newCase = caseType +"#"+caseValue+"#"+caseStyle;
    //console.log("newCase : "+newCase);
    //console.log("cases[position] (avant splice()) : "+cases[position]);
    if(cases != "" && caseType != "bck" && position != -1){
        cases.splice(position,1,newCase);
    }
    //console.log("cases[position] (après splice()) : "+cases[position]);
    if(templateCases != null){
        var templateString = templateCases.join(',').replace(/,/g, '#');
    }
    //alert(templateString);
    data = templateString +"/"+ cases;
    data = data.replace(/,/g, '|');
    //console.log("data : "+data);
    dataPages.splice(pagePosition-1,1,data);
    dataBrut = dataPages.join('§');
    //console.log("dataBrut : "+dataBrut);
    var queryValues = [];
    queryValues.push(testId);
    queryValues.push(dataBrut);
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxUpdatePage.php',
        data: 'data='+data,
        success: function(){
            if(flag2 == 1){
                $("#textArea").val("");
                caseType="";
                caseValue = "";
                getTest(null);
                timeFlag = true;
                $("#saveButton").hide();
            }
        }
    });
    //$("#textArea").val("");
    //fileName = "";
    //textAreaValue = "";
    //cssArrayGlobal = "";
}

function previewLoader(arrowClicked){
    $("#preview").empty();
    //PREVIEW
    //alert(datapage);
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(dataPages[pagePosition-1]);
    queryValues.push("write");
    var page = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxPreviewLoader.php',
        data: 'datapage='+page,
        dataType: 'html',
        success: function (page) {
            if(arrowClicked == "P"){
                $("#preview").hide().html(page).show("slide", { direction: "left" }, 75);
            }else{
                if(arrowClicked == "N"){
                    $("#preview").hide().html(page).show("slide", { direction: "right" }, 75);
                }
                else{
                    $("#preview").html(page);
                }
            }
            focusedCaseCSS();
        }
    });
}

function checkFileName(){
    if(caseArray[0] == "img"){
        checkFileNameVal = setInterval(function(){
            var _file = document.getElementById('_file');
            if(_file.files.item(0) != null){
                fileName = _file.files.item(0).name;
            }
            if(fileName != $("#fileToUp").val()){
                $("#fileToUp").val(fileName);
            }
        },500);
    }
}


function editorButtons(){
    if(testId != 0){
        $("#editor").slideDown();
    }else{
        $("#editor").slideUp();
    }
    $("#imageLoaderContainer").hide();
    //chargement panel options
    $('[name="valueType"]').on("change",function(){
        txtOrImgPanel()
    });
    $("#searchImgBtn").click(function(){
        var displayFile = setInterval(function(){
            var _file = document.getElementById('_file');
            fileName = _file.files.item(0).name;
            $("#fileToUp").show("slide", { direction: "left" }, 5).val(fileName);
            $("#uploadEnvoiImg").removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.gif");
            clearInterval(displayFile);
            checkFileName();
        },500)
    });
    //bouton upload
    var _submitBtn = document.getElementById('_submit');
    _submitBtn.onclick = function(){
        clearInterval(checkFileNameVal);
        $("#fileToUp").hide("slide", { direction: "left" }, 5).val(fileName);
        $("#uploadEnvoiImg").removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.jpg");
        $("#imageLoaderContainer").show();
        $("#_progress").show();
        imageUpload();
        $("#imageLoader").hide().attr( "src", "" );
        $("#errorSpan").empty();
    };
    //selectimage
    $("#selectImageList").on('change',function(e){
        flag2 = 1;
        updateCaseInDatapage();
        $("#errorSpan").hide();
    });
    //$("#textArea").on('input', function(){
    //    if($("#textArea").val() != null){
    //        updateTimer();
    //    }
    //});
    //$("#textArea").change(function(){
    //    if($("#textArea").val() != null){
    //        updateTimer();
    //    }
    //});
    $('#preview').on('click', ".previewBorder", function (){
        if(oldCurrentCase == ""){
            //console.log("oldCurrentCase in preview after click : "+oldCurrentCase);
            flag2 = 1;
            getTest(null);
            oldCurrentCase = $(this).attr("data-value");
            focusedCase = $(this).attr("id");
        }else{
            flag2 = 1;
            updateCaseInDatapage();
            oldCurrentCase = $(this).attr("data-value");
            focusedCase = $(this).attr("id");
        }
        $("#radioTxt").attr('disabled',false).removeAttr('title');
        $("#radioImg").attr('disabled',false).removeAttr('title');
        $("#radioTxtLbl").removeAttr('title');
        $("#radioImgLbl").removeAttr('title');
        console.log("oldCurrentCase : "+oldCurrentCase);
    });
    $('#preview').on('click', ".previewBorder, #textArea", function (e){
        e.stopPropagation();
        textAreaValue = "";
    });
    $("#saveButton").click(function(){
        flag2 = 1;
        updateCaseInDatapage();
        $("#saveButton").hide();
    });
    $("#addPage").click(function(){
        dialogLoading("addPage");
    });
    $("#removePage").click(function(){
        dialogLoading("removePage");
    });
    $("#currentPage").change(function(){
        oldCurrentCase = "";
        focusedCase = "";
        $("#radioTxt").prop("checked", true);
        getTest(null);
        //console.log("currentPage : "+$(this).val());
        oldCurrentPage = pagePosition;
        pagePosition = $(this).val();
    });
    $("#precButton").click(function(){
        //alert("prec");
        pagePosition = +pagePosition-1;
        currentPageSetter();
        oldCurrentCase = "";
        focusedCase = "";
        $("#radioTxt").prop("checked", true);
        getTest("P");
        //console.log("pagePosition : "+pagePosition);
        oldCurrentPage = pagePosition;
        pagePosition = $("#currentPage option:selected").val();
        nextPrevArrowDisplay();
    });
    $("#nextButton").click(function(){
        //alert("next");
        pagePosition = +pagePosition+1;
        currentPageSetter();
        oldCurrentCase = "";
        focusedCase = "";
        $("#radioTxt").prop("checked", true);
        getTest("N");
        //console.log("pagePosition : "+pagePosition);
        oldCurrentPage = pagePosition;
        pagePosition = $("#currentPage option:selected").val();
        nextPrevArrowDisplay();
    });
}

function nextPrevArrowDisplay(){
    if(pagePosition < dataPages.length){
        $("#nextButton").show();
    }else{
        $("#nextButton").hide();
    }
    if(pagePosition > 1){
        $("#precButton").show();
    }else{
        $("#precButton").hide();
    }
}

function getTestsByName(order){
    var ope = "write";
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxOptionsSelectTests.php',
        data:'ope='+ope,
        dataType: 'JSON',
        success: function (response) {
            //alert(response);
            var len = response.length;
            $("#selectTest").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez un test</option>");
            for( var i = 0; i<len; i++){
                var titre = JSON.stringify(response[i].theme);
                titre = titre.replace(/^"(.*)"$/, '$1');
                if(order == null){
                    if(titre != testNom){
                        $("#selectTest").append("<option>"+titre+"</option>");
                    }
                }else{
                    $("#selectTest").append("<option>"+titre+"</option>");
                }
            }
            //appel de select
            if(order == null){
                $("#selectTest").on('change',function(){
                    //document.getElementById('selectLangue').style.display = 'block';
                    //document.getElementById('lblSelectLangue').style.display = 'block';
                    testNom = jQuery('#selectTest option:selected').text();
                    getLanguagesForTest(testNom,order);
                    flag = 1;
                    getImagesForTest(testNom);
                });
            }else{
                $("#selectTest").on('change',function(){
                    //document.getElementById('selectLangue').style.display = 'block';
                    //document.getElementById('lblSelectLangue').style.display = 'block';
                    testNomToDel = jQuery('#selectTest option:selected').text();
                    getLanguagesForTest(testNomToDel,order);
                    flag = 1;
                    getImagesForTest(testNom);
                });
            }
        },
        fail: function(){
            $("#selectTest").empty().append("<option style='color: dimgray;font-style: italic;'>Fin authentification - Rechargez la page</option>");
        }
    });
}

function getLanguagesForTest(categorie,order){
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxOptionsSelectLangues.php',
        data: 'categorie='+categorie,
        dataType: 'JSON',
        success: function (data) {
            var len = data.length;
            if(order == null){
                //$("#selectLangue").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez une langue</option>");
                //for( var i = 0; i<len; i++){
                //    var langue = JSON.stringify(data[i].langue);
                //    langue = langue.replace(/^"(.*)"$/, '$1');
                //    $("#selectLangue").append("<option>"+langue+"</option>");
                //}
                //$("#selectLangue").on('change',function(e){
                    testLangue = "français";
                    getTest(null);
                //});
            }else{
                //$("#selectLangue").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez une langue</option>");
                //if(len > 1){
                //    $("#selectLangue").append("<option>Toutes les langues</option>");
                //}
                //for( var i = 0; i<len; i++){
                //    var langue = JSON.stringify(data[i].langue);
                //    langue = langue.replace(/^"(.*)"$/, '$1');
                //    $("#selectLangue").append("<option>"+langue+"</option>");
                //}
                //$("#selectLangue").on('change',function(e){
                    testLangueToDel = "français";
                    langueLength = len;
                    closeDialog();
                    dialogLoading("warningDeleteTest");
                //});
            }
        }
    });
}

function getImagesForTest(categorie){
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxOptionsSelectImages.php',
        data: 'categorie='+categorie,
        dataType: 'JSON',
        success: function (data) {
            if(flag == 1){
                setSelectImage(data);
            }
        }
    });
}

function setSelectImage(data){
    flag = 0;
    var len = data.length;
    //réinitialisation
    if(fileName == "" || fileName == null || fileName == "undefined"){
        $("#selectImageList").empty();
        $("#selectImageList").append("<option selected>Sélectionnez une image</option>");
        for( var i = 0; i<len; i++){
            var nom = JSON.stringify(data[i].nom);
            nom = nom.replace(/^"(.*)"$/, '$1');
            $("#selectImageList").append("<option>"+nom+"</option>");
        }
    }else{
        $("#selectImageList").empty();
        for( var i = 0; i<len; i++){
            var nom = JSON.stringify(data[i].nom);
            //console.log(len);
            nom = nom.replace(/^"(.*)"$/, '$1');
            if(nom == fileName){
                $("#selectImageList").append("<option selected>"+nom+"</option>");
            }else{
                $("#selectImageList").append("<option>"+nom+"</option>");
            }
        }
    }
    updateCaseInDatapage();
}


function getTest(arrowClicked){
    flag2 = 0;
    $("#_file").val("");
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push("français");
    var dataTest = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxGetTest.php',
        data: 'dataTest='+dataTest,
        dataType: 'JSON',
        success: function (testJson) {
            testId=testJson[0];
            //datapage= testJson[1];
            dataBrut = testJson[1];
            $("#contentEditor").show();
            //console.log("json [0].type = "+dataBrut);
            readDataPage(arrowClicked);
            closeDialog();
            if(testId != 0){
                $("#editor").slideDown();
            }else{
                $("#editor").slideUp();
            }
        }
    });
}

function imageUpload(){
    var _file = document.getElementById('_file');
    fileName = _file.files.item(0).name;
    if(_file.files.length === 0){
        return;
    }
    var data = new FormData();
    data.append('SelectedFile', _file.files[0]);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            try {
                var resp = JSON.parse(request.response);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + request.responseText + ']'
                };
            }
            //console.log(resp.status + ': ' + resp.data);
            if(resp.status == "success"){
                moveUploadedFile();
                $("#_progress").hide();
            }
            if(resp.status == "error"){
                imageUploaderExceptions(resp.data);
                request.abort();
                $("#_progress").hide();
            }
        }
    };
    request.open('POST', '../obj_mvc_ts2/upload.php');
    request.send(data);
}

function imageUploaderExceptions(errorMsg){
    $("#imageLoader").hide();
    $("#_progress").hide();
    $("#errorSpan").text(errorMsg).show();
}

function moveUploadedFile(){
    //console.log("fileName : "+fileName);
    //console.log("testNom : "+testNom);
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(fileName);
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxMoveUploadedFile.php',
        data: 'data='+data,
        datatype : "text",
        success: function(response){
            //console.log(response);
            if(response == "ok"){
                insertImageInBDD();
                flag = 1;
                flag2 = 1;
                getImagesForTest(testNom);
            }else{
                imageUploaderExceptions(response);
            }

        }
    });
}


function insertImageInBDD(){
    var queryValues = [];
    queryValues.push(fileName);
    queryValues.push(testNom);
    var data = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxInsertImage.php',
        data: 'data='+data
    });
}

function tokenRewriter(){
    //alert(tokenValue);
    $.ajax({
        type: 'POST',
        url: '../obj_mvc_ts2/ajaxTokenRewriter.php',
        data: 'token='+tokenValue,
        dataType:'text'
    });
}

function ctrlVstrs(){
    var city="";
    $.get("https://ipinfo.io?token=6e0060c8234f84", function(response) {
        city = response.city;
    }, "jsonp");
    $.getJSON('https://api.ipify.org?format=json', function(data){
        var queryValues = [];
        queryValues.push(window.location.href);
        queryValues.push(data.ip);
        queryValues.push(city);
        var dataCtrl = JSON.stringify(queryValues);
        $.ajax({
            type: 'POST',
            url: '../obj_mvc_ts2/ajaxCtrlVstrs.php',
            data: 'dataCtrl='+dataCtrl
        });
    });
}
