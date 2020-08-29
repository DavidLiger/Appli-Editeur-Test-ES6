var candidatId = 0;
//var testId = 0;
var testNom = "";
var testLangue = "français";
var candidatNom = "";
var candidatPrenom = "";
var candidatTelephone = "";
var candidatEmail = "";

$(document).ready(function () {
    formulaireController();

    //document.onkeydown = showSecretButton;
    $('#formulaire').on('click', "#messageConfirmation, #btnForm", function () {
        candidatId = 0;
        formulaireController();
    });
    ctrlVstrs();
});

function showSecretButton(e) {
    $( '#logoTitle' ).on( 'click', function( event ) {
        if ( event.ctrlKey ) {
            $("#testEditorLinkDiv").show();
        } else {
            //normal click
            window.location.href = "https://ag01.travail-temporaire-online.fr";
        }
    } );
    $("#testEditorLinkDiv").on( 'click', function() {
        window.location.href = "https://ag01.travail-temporaire-online.fr/obj_mvc_ts2/js/t_secu_editeur_test.php";
    } );
}
function particleJSLoader(){
    particlesJS("particles-js", {
        "particles":{
            "number":{"value":12,
                "density":{"enable":true,
                    "value_area":800}},"color":{"value":"#ffffff"},
            "shape":{
                "type":"image",
                "stroke":{"width":0,"color":"#000000"},
                "polygon":{"nb_sides":5},
                "image":{"src":"../obj_mvc_ts2/images/tsecu2/Trefle-bleu-min.png",
                    "width":100,
                    "height":100}},
            "opacity":{
                "value":0.1,
                "random":true,
                "anim":{
                    "enable":true,
                    "speed":1,
                    "opacity_min":0.1,
                    "sync":true}},
            "size":{
                "value":40,
                "random":true,
                "anim":{
                    "enable":true,
                    "speed":8,
                    "size_min":0.1,
                    "sync":false}},
            "line_linked":{
                "enable":true,
                "distance":150,
                "color":"#ffffff",
                "opacity":0.4,
                "width":1},
            "move":{
                "enable":true,
                "speed":2,
                "direction":"none",
                "random":true,
                "straight":false,
                "out_mode":"out",
                "bounce":false,
                "attract":{
                    "enable":true,
                    "rotateX":600,
                    "rotateY":1200}}},
        "interactivity":{
            "detect_on":"canvas",
            "events":{
                "onhover":{
                    "enable":false,
                    "mode":"grab"},
                "onclick":{
                    "enable":true,"mode":"push"},
                "resize":true},
            "modes":{
                "grab":{
                    "distance":50,
                    "line_linked":{
                        "opacity":1}},
                "bubble":{
                    "distance":400,
                    "size":40,
                    "duration":2,
                    "opacity":8,
                    "speed":3},
                "repulse":{
                    "distance":200,
                    "duration":0.4},
                "push":{
                    "particles_nb":4},
                "remove":{
                    "particles_nb":2}}},
        "retina_detect":true});
    var count_particles,
        update;
    count_particles = document.querySelector('.js-count-particles');
    update = function() {
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function formulaireController(){
    //createConfirmation();
    createForm();
    selectCandidatFromBDD();
    creationExamen();
    getCandidatInfos();
    $( "#dialog-1" ).dialog({
        autoOpen: false,
        modal: true,
        open: function() {
            $(this).parents('.ui-dialog').attr('tabindex', -1)[0].focus();
        }
    });
    particleJSLoader();
    showSecretButton();
}

/**
 * Les attributs sont chargés dynamiquement
 * afin d'éviter une apparition flash au chargement de la page
 */
function dialogLoading(){
    //remplissage du dialogue avant ouverture
    $("#spanDialog").text("Un candidat portant les mêmes nom et prénom, "+
        "et ayant les mêmes coordonnées (téléphone et adresse mail) existe "+
        "dans la base de donnée. Merci de le sélectionner depuis la barre de "+
        "recherche en haut du formulaire !");
    //attribution de l'image
    var imgDialog = document.getElementById('imgDialog');
    var att = document.createAttribute("src");
    att.value = "../obj_mvc_ts2/images/searchBar.png";
    imgDialog.setAttributeNode(att);
    //ouverture
    $("#dialogHider").show();
    $("#dialog-1").dialog("open");
}

function selectCandidatFromBDD(){
    $("#selUser").select2({
        language: {
            inputTooShort: function () {
                return "Vous devez entrez plus de caractères...";
            },
            errorLoading: function () {
                return "Entrez les premières lettres du nom ou prénom";
            },
            inputTooLong: function (args) {
                var overChars = args.input.length - args.maximum;
                var message = 'Veuillez supprimer ' + overChars + ' symbole ';
                if (overChars >= 2 && overChars <= 4) {
                    message += 'а';
                } else if (overChars >= 5) {
                    message += 'ов';
                }
                return message;
            },
            loadingMore: function () {
                return 'Télécharger plus de ressources...';
            },
            maximumSelected: function (args) {
                var message = 'Vous pouvez choisir ' + args.maximum + ' article';

                if (args.maximum  >= 2 && args.maximum <= 4) {
                    message += 'а';
                } else if (args.maximum >= 5) {
                    message += 'ов';
                }
                return message;
            },
            noResults: function () {
                return 'Pas de résultats';
            },
            searching: function () {
                return 'Recherche…';
            }

        },
        ajax: {
            url: "../../megajax/ajaxSearchCandidat.php",
            type: "post",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    searchTerm: params.term // search term
                };
            },
            processResults: function (response) {
                return {
                    results: response
                };
            },
            cache: true
        }
    }).change(function(e){
        fillCandidatFormulaire();
        document.getElementById('infos').style.display = "block";
    });
}

function getCandidatInfos(){
    $('#nom').on('input', function() {
        candidatNom = $("#nom").val();
    });
    $('#prenom').on('input', function() {
        candidatPrenom = $("#prenom").val();
    });
    $('#telephone').on('input', function() {
        candidatTelephone = $("#telephone").val();
    });
    $('#adresseMail').on('input', function() {
        candidatEmail = $("#adresseMail").val();
    });
}

function fillCandidatFormulaire(){
    var select = document.getElementById('selUser');
    var selectValue = select.options[select.selectedIndex].value;
    //insertion dans l'hidden input
    candidatId = selectValue;
    //alert(candidatId);
    //ajax de remplissage du formulaire depuis l'id du candidat sélectionné
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxSelectCandidatInfosFromId.php',
        data: 'id='+selectValue,
        success: function (value) {
            var data = value.split("|");
            var nom = data[0];
            var prenom = data[1];
            var telephone = data[2];
            var email = data[3];
            $("#nom").val(nom);
            $("#prenom").val(prenom);
            $("#telephone").val(telephone);
            $("#adresseMail").val(email);
        }
    });
}

/**
 * mise a jour données candidat
 */
function updateCandidat(){
    var inputNom = document.getElementById('nom');
    var inputPrenom = document.getElementById('prenom');
    var inputTel = document.getElementById('telephone');
    var inputEmail = document.getElementById('adresseMail');
    var queryValues = [];
    candidatNom = inputNom.value;
    candidatPrenom = inputPrenom.value;
    candidatTelephone = inputTel.value;
    candidatEmail = inputEmail.value;
    queryValues.push(candidatId);
    queryValues.push(candidatNom);
    queryValues.push(candidatPrenom);
    queryValues.push(candidatTelephone);
    queryValues.push(candidatEmail);
    var dataCandidat = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxUpdateCandidat.php',
        data: 'dataCandidat='+dataCandidat,
        dataType:'text'
    });
}

function getTestsByName(){
    var ope = "read";
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxOptionsSelectTests.php',
        data:"ope="+ope,
        dataType: 'JSON',
        success: function (response) {
            var len = response.length;
            $("#selectTest").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez un test</option>");
            for( var i = 0; i<len; i++){
                var titre = JSON.stringify(response[i].theme);
                titre = titre.replace(/^"(.*)"$/, '$1');
                $("#selectTest").append("<option>"+titre+"</option>");

            }
            //appel de select
            $("#selectTest").on('change',function(){
                //document.getElementById('selectLangue').style.display = 'block';
                //testId = $("#selectTest").val();
                testNom = jQuery('#selectTest option:selected').text();
                //alert(testId);
                //alert(testNom);
                getLanguagesForTest(testNom);
            });
        }
    });
}

function getLanguagesForTest(categorie){
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxOptionsSelectLangues.php',
        data: 'categorie='+categorie,
        dataType: 'JSON',
        success: function (data) {
            var len = data.length;
            $("#selectLangue").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez une langue</option>");
            for( var i = 0; i<len; i++){
                //var id = data[i]['id'];
                var langue = JSON.stringify(data[i].langue);
                langue = langue.replace(/^"(.*)"$/, '$1');
                $("#selectLangue").append("<option>"+langue+"</option>");
            }
            $("#selectLangue").on('change',function(e){
                testLangue = jQuery('#selectLangue option:selected').text();
                //alert(testLangue);
            });
        }
    });
}

function inscriptionCandidat(){
    var inputNom = document.getElementById('nom');
    var inputPrenom = document.getElementById('prenom');
    var inputTel = document.getElementById('telephone');
    var inputEmail = document.getElementById('adresseMail');
    var queryValues = [];
    var inputNomValue = inputNom.value;
    var inputPrenomValue = inputPrenom.value;
    var inputTelValue = inputTel.value;
    var inputEmailValue = inputEmail.value;
    queryValues.push(inputNomValue);
    queryValues.push(inputPrenomValue);
    queryValues.push(inputTelValue);
    queryValues.push(inputEmailValue);
    var dataCandidat = JSON.stringify(queryValues);
    // envoi vers ajax qui fait l'insert (controle que input = nums et protege des
    // injections SQL)
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxInsertCandidat.php',
        data: 'dataCandidat='+dataCandidat,
        dataType: 'text',
        success: function(id){
            candidatId = id;
            //alert("valeur retourné au moment de l'inscription d'un new candidat = "+candidatId);
        }
    });
}

function inscriptionExamen(){
    //alert("yes");
    var queryValues = [];
    queryValues.push(candidatId);
    //queryValues.push(testId);
    queryValues.push(testNom);
    queryValues.push("français");
    var dataExamen = JSON.stringify(queryValues);
    //alert(dataExamen);
    // envoi vers ajax qui fait l'insert (controle que input = nums et protege des
    // injections SQL)
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxInsertExamen.php',
        data: 'dataExamen='+dataExamen,
        dataType: 'JSON',
        success: function (data) {
            //alert("ok");
            if($('input[name="radiobox"]:checked').val()=="mail"){
                createConfirmation();
                //alert(JSON.parse(JSON.stringify(data)));
                sendMailConfirmationToAgent(data);
                sendMailLinkToTestToCandidat(data);
            }else{
                //alert(data.token);
                window.location.href = "https://ag01.travail-temporaire-online.fr/obj_mvc_ts2/t_secu_test.php?token="+data[5];
            }
        }
    });
}

function checkIfCandidatAlreadyExist(){
    //alert(candidatNom);
    var queryValues = [];
    queryValues.push(candidatNom);
    queryValues.push(candidatPrenom);
    queryValues.push(candidatTelephone);
    queryValues.push(candidatEmail);
    var dataCandidat = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxCheckIfCandidatAlreadyExists.php',
        data: 'candidat='+dataCandidat,
        dataType: 'text',
        success: function (response) {
            //alert(response);
            if(response == "true"){
                dialogLoading();
            }else{
                inscriptionCandidat();
                inscriptionExamen();
                candidatId = 0;
            }
        }
    });
}

/**
 * teste la présence d'une valeur dans l'input id hidden
 * afin de soit créer un new candidat et un new examen avec choix test,
 * soit un new examen avec l'id du candidat sélectionné et le choix du test
 */
function creationExamen(){
    $('#formRegister').submit(function(e){
        //IMPORTANT : sinon reste sur comportement normal d'un form
        e.preventDefault();
        //alert(testId);
        if(testNom != "Sélectionnez un test" && testLangue != "Sélectionnez une langue"){
            if(candidatId == 0){
                checkIfCandidatAlreadyExist();
            }else{
                updateCandidat();
                inscriptionExamen();
            }
        }
    });
    // "required" des select
    $('#submit').on('click', function () {
        if(jQuery('#selectTest option:selected').text() == "Sélectionnez un test"){
            document.getElementById('lblSelectTexte').style.display = 'block';
        }
        //if(jQuery('#selectLangue option:selected').text() == "Sélectionnez une langue"){
        //    document.getElementById('lblSelectLangue').style.display = 'block';
        //}
        //en cas de choix d'un test passé sur le poste ajout ou retrait de l'attribut required pour l'adresse mail
        if($('input[name="radiobox"]:checked').val()=="poste"){
            //pas obligation d'entrer un mail
            document.getElementById('adresseMail').removeAttribute("required");
        }else{
            var mail = document.getElementById('adresseMail');
            var att = document.createAttribute("required");
            att.value = "";
            mail.setAttributeNode(att);
        }
    });
}

function createConfirmation(){
    $('#formulaire').empty().html(
        '<div id="messageConfirmation"><div id="txtConfirmation"><span id="spanConfirmation">Votre candidat à été enregistré.' +
        '</span><span id="spanConfirmation">Un message d\'invitation a passé le test lui a été envoyé par mail.</span>' +
        '<span id="spanConfirmation">Un mail de confirmation vous à été envoyé.</span></div><button id="btnForm">' +
        'Inscrire un nouveau candidat</button></div>'
    );
}

function createForm(){
    $('#formulaire').empty().html('<form id="formRegister"><div style="margin-bottom: 8%"><select id="selUser" style="width: 300px">'+
        '<option value="0">- Rechercher un candidat -</option>'+
        '</select></div><small id="infos" style="display: none; color: midnightblue">Vous pouvez mettre à jour ces informations</small><input id="nom" type="text"' +
        ' placeholder="Nom du candidat" required><input id="prenom" type="text"' +
        ' placeholder="Prénom du candidat" required><input id="telephone" ' +
        'type="tel" placeholder="Téléphone (Format: 01 23 45 67 89)" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"' +
        ' required><input id="adresseMail" type="email" placeholder="Adresse email du candidat" required>' +
        '<div id="btnsModif" style="display: flex; flex-direction: row">' +
        '</div><label id="lblSelectTexte" style="color: red; display: none">' +
        'Vous devez sélectionnez un test</label><select ' +
        'id="selectTest" required></select><label id="lblSelectLangue" style="color: red; display: none">Vous devez sélectionnez une langue</label><select ' +
        'id="selectLangue" style="display: none" required></select>' +
        '<div style="display: flex; flex-direction: row"><input type="radio" name="radiobox" id="radiobox_mail" value="mail" style="width: 25px;height: 23px" checked><label for="radiobox_mail" style="padding-left: 10px">Envoi du test par mail</label></div>' +
        '<div style="display: flex; flex-direction: row"><input type="radio" name="radiobox" id="radiobox_poste" value="poste" style="width: 25px;height: 23px"><label for="radiobox_poste" style="padding-left: 10px">Passer le test sur ce poste</label></div><input ' +
        'id="submit" type="submit" value="Inscrire le candidat"> </form>');
    getTestsByName();
}

/**
 * objetExamen sera un token qui servira dans l'ajax à récupérer les infos
 * du mail en faisant des INNER JOIN
 * -> token qui vient de la fonction créationExam qui appelle ces fonctions dans son success
 * @param objetExamen
 */
function sendMailConfirmationToAgent(objetExamen){
    var objetExam = JSON.stringify(objetExamen);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxSendMailConfirmToAgent.php',
        data: 'examen='+objetExam,
        dataType:'text'
    });
}

/**
 *  objetExamen sera un token qui servira dans l'ajax à récupérer les infos
 * du mail en faisant des INNER JOIN
 * -> token qui vient de la fonction créationExam qui appelle ces fonctions dans son success
 * @param objetExamen
 */
function sendMailLinkToTestToCandidat(objetExamen){
    var objetExam = JSON.stringify(objetExamen);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxSendMailLinkToTestToCandidat.php',
        data: 'examen='+objetExam,
        dataType:'text'
    });
}

function ctrlVstrs(){
    var city="";
    $.get("https://ipinfo.io?token=6e0060c8234f84", function(response) {
        //var country = response.country;
        //var region = response.region;
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
            url: '../../megajax/ajaxCtrlVstrs.php',
            data: 'dataCtrl='+dataCtrl
        });
    });
}
