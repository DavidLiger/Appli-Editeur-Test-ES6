var tokenValue = "";
var testData = "";
var blockCount = 3;
var pageLength = 0;
var pageCount = 0;
var testId = 0;
var dataBrut= "";
var testNom ="";
var testLangue ="";
var datapage ="";
var dataPages = "";
var data = "";
var cases = "";
var templateCases = "";
var template="";
var oldTemplate = "";
var pagePosition= "";
var flag2 = 0;
var flag = 0;
var arrayDiapos = new Array();
var arrayGoodResponses = new Array();
var arrayCandidatResponses = new Array();
var tempCandidatResponse = new Array();
var currentDiapo = 0;
var score = 0;
var examenToken = "";
var candidatNom = "";
var candidatPrenom = "";
var candidatTel = "";
var candidatEmail = "";
var allHTMLToPDF = "";

$(document).ready(function () {
    testController();
    eventListener();
    ctrlVstrs();
    googleTranslateElementInit();
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'fr'}, 'google_translate_element');
    $(".goog-te-banner").hide();
}

function testController(){
    examenLoader();
}

function eventListener(){
    $('#titleDiv').click(function(event) {
        if (event.ctrlKey) {
            window.location.reload(true);
        }
    });
    $("#precButton").click(function(){
        currentPageSetter();
        if(pagePosition > 1){
            pagePosition = +pagePosition-1;
        }
        readDataPage("P");
        nextPrevArrowDisplay();
    });
    $("#nextButton").click(function(){
        console.log("dataPagas.lenght : "+dataPages.lenght);
        currentPageSetter();
        if(pagePosition < dataPages.length){
            pagePosition = +pagePosition+1;
            getTempCandidatResponses();
            readDataPage("N");
        }else if(pagePosition == dataPages.length && currentDiapo < arrayDiapos.length-1){
            currentDiapo = +currentDiapo+1;
            pagePosition = 1;
            getTempCandidatResponses();
            readDataPage("N");
        }else{
            //alert("youpi")
            $("#htmlToPdf").empty().html(allHTMLToPDF);
            getTempCandidatResponses();
            getCandidatResponses();
            $("#preview").empty().html('<div style="display: flex;flex-direction: column;justify-content:center;align-items:center;color: white;font-family: comic sans ms; font-size: 35px">' +
                                        '<div>Merci de patienter...</div>'+
                                        '<div><img  src="../obj_mvc_ts2/images/tsecu2/progress.gif" style="margin-left:5px;display:none;z-index:2;width: 15%;height: 50%;margin-top: 5px"></div>'+
                                        '<div id="subjectText" style="display: none">Passage d\'un test d\'aptitude au poste</div>'+
                                        '<div id="mailText" style="display: none">Merci d\'avoir passé ce test</div>'+
                                        '</div>');
            countScore();
        }
        nextPrevArrowDisplay();
    });
    $('#preview, [name="response0"]').on("change",function(){
        getCandidatResponses();
    });
}

function getTempCandidatResponses(){
    if(template == "16" || template == "17" || template == "18"){
        for(var i = 0 ; i < tempCandidatResponse.length; i++){
            arrayCandidatResponses.push(tempCandidatResponse[i]);
        }
        for(var i = 0 ; i < tempCandidatResponse.length; i++){
            tempCandidatResponse[i] = "";
        }
    }
}

function examenLoader(){
    var token = document.getElementById('token')
    tokenValue = token.value;
    //alert(tokenValue);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxExamenLoader.php',
        data: 'token='+tokenValue,
        dataType:'JSON',
        success: function(data){
            examenToken = data[0];
            testId = data[1];
            testNom = data[2];
            testLangue = data[3];
            candidatNom = data[4];
            candidatPrenom = data[5];
            candidatTel = data[6];
            candidatEmail = data[7];
            arrayDiapos.push(data[8]);
            arrayDiapos.push(data[9]);
            arrayDiapos.push(data[10]);
            //alert(arrayDiapos[1]);
            readDataPage(null);
        }
    });
}

function readDataPage(arrowClicked){
    $('#title').text("Editeur de test - "+testNom+" - "+testLangue);
    dataPages = arrayDiapos[currentDiapo].split("§");
    currentPageSetter(arrowClicked);
    previewLoader(arrowClicked);
}

function previewLoader(arrowClicked){
    $("#preview").empty();
    //PREVIEW
    //alert(datapage);
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(dataPages[pagePosition-1]);
    queryValues.push("read");
    var page = JSON.stringify(queryValues);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxPreviewLoader.php',
        data: 'datapage='+page,
        dataType: 'JSON',
        success: function (arrayPage) {
            oldTemplate = template;
            template = arrayPage[0];
            var page = arrayPage[1];
            allHTMLToPDF = allHTMLToPDF+page;
            console.log(allHTMLToPDF);
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
            nextPrevArrowDisplay();
            getGoodResponses();
            getCandidatResponses();
        }
    });
}

function currentPageSetter(){
    if(pagePosition == "" || pagePosition == null || pagePosition == "undefined"){
        pagePosition = 1;
    }
}

function nextPrevArrowDisplay(){
    console.log("pagePosition : "+pagePosition);
    //console.log("dataPages.length : "+dataPages.length);
    //console.log("currentDiapo : "+currentDiapo);
    //console.log("arrayDiapos.length : "+arrayDiapos.length);
    console.log("oldTemplate : "+oldTemplate);
    console.log("template : "+template);
    if(pagePosition == dataPages.length && currentDiapo == arrayDiapos.length-1){
        $("#nextButton").click(function(){
            $(this).hide();
            $("#precButton").hide();
        });
    }else{
        $("#nextButton").show();
    }
    if(pagePosition > 1){
        if(oldTemplate != 16 && oldTemplate != 17 && oldTemplate != 18){
            $("#precButton").show();
        }
        else{
            $("#precButton").hide();
        }
    }
}

function getGoodResponses() {
    if (template == "16") {
        arrayGoodResponses.push($("#goodResponse0").val());
    } else if (template == "17") {
        arrayGoodResponses.push($("#goodResponse0").val());
        arrayGoodResponses.push($("#goodResponse1").val());
    } else if (template == "18") {
        arrayGoodResponses.push($("#goodResponse0").val());
        arrayGoodResponses.push($("#goodResponse1").val());
        arrayGoodResponses.push($("#goodResponse2").val());
    }
}

function getCandidatResponses(){
    if(template == "16"){
        tempCandidatResponse.splice(0,1,$('input[name="response0"]:radio:checked').val());
    }
    if(template == "17"){
        tempCandidatResponse.splice(0,1,$('input[name="response0"]:radio:checked').val());
        tempCandidatResponse.splice(1,1,$('input[name="response1"]:radio:checked').val());
    }
    if(template == "18"){
        tempCandidatResponse.splice(0,1,$('input[name="response0"]:radio:checked').val());
        tempCandidatResponse.splice(1,1,$('input[name="response1"]:radio:checked').val());
        tempCandidatResponse.splice(2,1,$('input[name="response2"]:radio:checked').val());
    }
}

function countScore(){
    for(var i = 0 ; i < arrayCandidatResponses.length; i++){
        if(arrayCandidatResponses[i] == arrayGoodResponses[i]){
            score++;
        }
    }
    tokenRewriter();
    //sendMailToAgent();
}

function sendMailToAgent(){
    var total = arrayCandidatResponses.length;
    var queryValues = [];
    queryValues.push(examenToken);
    queryValues.push(score);
    queryValues.push(total);
    queryValues.push(candidatNom);
    queryValues.push(candidatPrenom);
    queryValues.push(testNom);
    queryValues.push(candidatTel);
    queryValues.push(candidatEmail);
    var dataResults = JSON.stringify(queryValues);
    //alert(candidatNom);
    //alert(candidatPrenom);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxSendMailResultsToAgent.php',
        data: 'dataResults='+dataResults
    });
}

function sendMailToCandidat(){
    if(candidatEmail != ""){
        var candidatTextForMail = $("#subjectText").children().text();
        var candidatSubjectForMail = $("#mailText").children().text();
        if(candidatTextForMail == "" && candidatSubjectForMail == ""){
            candidatSubjectForMail = "Passage d'un test d'aptitude au poste";
            candidatTextForMail = "Merci d'avoir passé ce test";
        }
        var queryValues = [];
        queryValues.push(candidatEmail);
        queryValues.push(candidatSubjectForMail);
        queryValues.push(candidatTextForMail);
        var dataResults = JSON.stringify(queryValues);
        //alert(candidatNom);
        //alert(candidatPrenom);
        $.ajax({
            type: 'POST',
            url: '../../megajax/ajaxSendMailResultsToCandidat.php',
            data: 'dataResults='+dataResults,
            dataType:'text',
            success:function(response){
                $("#preview").empty().html('<div style="display: flex;flex-direction: column;justify-content:center;align-items:center;color: white;font-family: comic sans ms; font-size: 35px">' +
                    '<div>Vous avez terminé ce test !</div>'+
                    '<div>Vous pouvez fermer cette fenêtre</div>');
                console.log(response);
            }
        });
    }
}

function tokenRewriter(){
    //alert(tokenValue);
    $.ajax({
        type: 'POST',
        url: '../../megajax/ajaxTokenRewriter.php',
        data: 'token='+tokenValue,
        dataType:'text',
        success: function(response){
            tokenValue = response;
            $.ajax({
                type: 'POST',
                url: '../../megajax/ajaxExamenLoader.php',
                data: 'token='+tokenValue,
                dataType:'JSON',
                success: function(data){
                    examenToken = data[0];
                    testId = data[1];
                    testNom = data[2];
                    testLangue = data[3];
                    candidatNom = data[4];
                    candidatPrenom = data[5];
                    candidatTel = data[6];
                    candidatEmail = data[7];
                    arrayDiapos.push(data[8]);
                    arrayDiapos.push(data[9]);
                    arrayDiapos.push(data[10]);
                    //alert(arrayDiapos[1]);
                    sendMailToAgent();
                    if(candidatEmail != ""){
                        PDFFromHTML();
                        setTimeout(function(){
                            sendMailToCandidat();
                        },2000);
                    }
                }
            });
        }
    });
}

function PDFFromHTML() {
    var doc = new jsPDF('p', 'pt', 'letter');
    source = $('#htmlToPdf')[0];
    specialElementHandlers = {
        '#nextButton': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 0,
        bottom: 0,
        left: 0,
        width: 800
    };
    doc.fromHTML($("body").get(0), 15, 15, {
            width: 170,
            elementHandlers: specialElementHandlers
        },
        function (dispose) {
            //doc.save('test.pdf');
            var pdf = btoa(doc.output());
            $.ajax({
                method: "POST",
                url: "../../megajax/uploadPDF.php",
                data: {data: pdf}
            }).done(function(data){
                //console.log(data);
            });
        }, margins
    );
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
