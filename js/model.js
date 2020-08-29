var testId = 0;
var testNom ="";
var testLangue ="français";
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
var pagePosition= 1;
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
//flag servant à stopper la redondance d'exécution des méthodes
//durant le temps de réponses des requetes HTTP
var flag = 0;
var flag2 = 0;
var flag3 = 0;
var timeFlag = true;

var elementSelector;
var view;
var dataJSON;

class Model{
  constructor(eSelector, view){
    elementSelector = Object.create(eSelector);
    view = Object.create(view);
  }
  XMLHttpRequest(type, url, data, datatype){
    var result = "";
    $.get({
        type: type,
        url: url,
        data:'data='+data,
        dataType: datatype,
        async: false,
        success: function (response){
            result = response;
        }
    });
    return result;
  }
  getTests(){
    let queryValues = [];
    queryValues.push("testList");
    queryValues.push("write");
    let data = JSON.stringify(queryValues);
    return this.XMLHttpRequest("POST","../obj_mvc_ts2/DAL.php",data,"JSON");
  }
  getTestNom(){
    return testNom;
  }
  setTestNom(value){
    testNom = value
  }
  dataCutter(){
    let queryValues = [];
    queryValues.push("getTest");
    queryValues.push(testNom);
    queryValues.push(testLangue);
    let data = JSON.stringify(queryValues);
    dataJSON = this.XMLHttpRequest("POST","../obj_mvc_ts2/DAL.php",data,"JSON");
    testId = dataJSON[0];
    dataBrut = dataJSON[1];
    dataPages = dataBrut.split("§");
    data = dataPages[pagePosition-1].split("/");
    templateCases = data[0].split("#");
    template = templateCases[0];
    cases = data[1].split("|");
  }
  pageViewer(){
    console.log(testNom);
    var queryValues = [];
    queryValues.push(testNom);
    queryValues.push(dataPages[pagePosition-1]);
    queryValues.push("write");
    let data = JSON.stringify(queryValues);
    let page = this.XMLHttpRequest("POST","../obj_mvc_ts2/ajaxPreviewLoader.php",data,"html");
    return page;
  }
  dataRecorder(imgName){
    var position = oldCurrentCase-1;
    // console.log("position : "+position);
    var caseType = $('[name="valueType"]:radio:checked').val();
    var caseValue = "";
    var caseStyle = "";
    if(caseType == "img"){
        caseValue = imgName;
        caseStyle = "width:"+$(elementSelector.imgStylerArray[0][1]).val()+
            ";height:"+$(elementSelector.imgStylerArray[1][1]).val()+
            ";border-radius:"+$(elementSelector.imgStylerArray[2][1]).val()+
            ";margin-left:"+$(elementSelector.imgStylerArray[3][1]).val()+
            ";filter:blur("+$(elementSelector.imgStylerArray[4][1]).val()+
            ") brightness("+$(elementSelector.imgStylerArray[5][1]).val()+
            ") contrast("+$(elementSelector.imgStylerArray[6][1]).val()+
            ") grayscale("+$(elementSelector.imgStylerArray[7][1]).val()+
            ")";
            //exception choix img sans data
            console.log(imgName);
            if(imgName == "Sélectionnez une image"){
              console.log("fuck");
              caseType = "txt";
              caseValue = "";
              caseStyle = "";
            }
    }
    if(caseType == "txt"){
        if($("#textArea").val() == "undefined" || $("#textArea").val() == "" || $("#textArea").val() == null){
            caseType = "";
            caseValue = "";
            caseStyle = "";
        }else{
            caseType = $('[name="valueType"]:radio:checked').val();
            caseValue = $("#textArea").val();
            caseStyle = "font-family:"+$(elementSelector.txtStylerArray[0][1]).val()+
                ";font-size:"+$(elementSelector.txtStylerArray[1][1]).val()+
                ";color:"+$(elementSelector.txtStylerArray[2][1]).val().substr(1)+
                ";text-align:"+elementSelector.getTxtAlignSelected().val()+
                ";letter-spacing:"+$(elementSelector.txtStylerArray[3][1]).val()+
                ";line-height:"+$(elementSelector.txtStylerArray[4][1]).val()+
                ";word-spacing:"+$(elementSelector.txtStylerArray[5][1]).val();
        }
        // console.log(caseValue);
      }
    if(caseType == "bck"){
        caseValue = imgName;
        caseStyle = "width:"+$(elementSelector.imgStylerArray[0][1]).val()+
            ";height:"+$(elementSelector.imgStylerArray[1][1]).val()+
            ";border-radius:"+$(elementSelector.imgStylerArray[2][1]).val()+
            ";margin-left:"+$(elementSelector.imgStylerArray[3][1]).val()+
            ";filter:blur("+$(elementSelector.imgStylerArray[4][1]).val()+
            ") brightness("+$(elementSelector.imgStylerArray[5][1]).val()+
            ") contrast("+$(elementSelector.imgStylerArray[6][1]).val()+
            ") grayscale("+$(elementSelector.imgStylerArray[7][1]).val()+
            ")";
        templateCases.splice(1,1,caseValue);
        templateCases.splice(2,1,caseStyle);
    }

    var newCase = caseType +"#"+caseValue+"#"+caseStyle;
    if(cases != "" && caseType != "bck" && position != -1){
        cases.splice(position,1,newCase);
    }
    if(templateCases != null){
        var templateString = templateCases.join(',').replace(/,/g, '#');
    }
    // console.log("pagePosition : "+pagePosition);
    data = templateString +"/"+ cases;
    data = data.replace(/,/g, '|');
    dataPages.splice(pagePosition-1,1,data);
    dataBrut = dataPages.join('§');
    var queryValues = [];
    queryValues.push(testId);
    queryValues.push(dataBrut);
    var data = JSON.stringify(queryValues);
    this.XMLHttpRequest("POST","../obj_mvc_ts2/ajaxUpdatePage.php",data,null);
  }
  getPagesLength(){
    return dataPages.length;
  }
  getPagePosition(){
    return pagePosition;
  }
  getBckImg(focusedCase){
    this.dataCutter();
    return templateCases[1];
  }
  getCaseData(focusedCase){
    this.dataCutter();
    if(focusedCase == "" || focusedCase == "undefined" || focusedCase == null){
        focusedCase = 0;
    }
    let currentCase = cases[focusedCase];
    caseArray = currentCase.split("#");
    return caseArray;
  }
  getCaseTypeValue(focusedCase){
    return this.getCaseData(focusedCase)[0];
  }
  getCaseDataValue(focusedCase){
    return this.getCaseData(focusedCase)[1];
  }
  getCaseStyleValue(focusedCase){
    return this.getCaseData(focusedCase)[2];
  }
  getOldCurrentCase(){
    return oldCurrentCase;
  }
  getFocusedCase(){
    return focusedCase;
  }
  getTemplateData(){
    return templateCases[1];
  }
  getTemplateStyle(){
    return templateCases[2];
  }
  getFileName(){
    return fileName;
  }
  getTestNom(){
    return testNom;
  }
  getPagePosition(){
    return pagePosition;
  }
  setTestNom(nom){
    testNom = nom;
  }
  setPagePosition(pos){
    pagePosition = pos;
  }
  setOldCurrentCase(value){
    oldCurrentCase = value;
  }
  setFocusedCase(value){
    focusedCase = value;
  }
  setTextAreaValue(value){
    textAreaValue = value;
  }
  setFileName(value){
    fileName = value;
  }
  setOldCurrentPage(value){
    oldCurrentPage = value;
  }
  clearIntervalCheckFileName(){
    clearInterval(checkFileNameVal);
  }
  resetValuesForCaseErasing(caseSelectedVal){
    if(caseSelectedVal == "txt"){
        fileName = "";
        flag = 1;
    }
    if(caseSelectedVal == "img"){
        elementSelector.textArea.val(" ");
        textAreaValue = "";
    }
    if(caseSelectedVal == "bck"){
      if(this.getBckImg() == "" || this.getBckImg() == "undefined" || this.getBckImg() == null){
        fileName = "";
        flag = 1;
      }else{
        // getTest(null)
        focusedCase = "";
        oldCurrentCase = "";
      }

    }
  }
  checkFileName(){
    if(this.getCaseTypeValue(this.getFocusedCase()) == "img"){
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
  imageUpload(){
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
                        var queryValues = [];
                        queryValues.push(fileName);
                        queryValues.push(testNom);
                        var data = JSON.stringify(queryValues);
                        $.ajax({
                            type: 'POST',
                            url: '../obj_mvc_ts2/ajaxInsertImage.php',
                            data: 'data='+data
                        });
                        view.setImgSelector(model.XMLHttpRequest('POST','../obj_mvc_ts2/ajaxOptionsSelectImages.php',model.getTestNom(),'JSON'),model.getFileName());
                        model.dataRecorder($('#selectImageList option:selected').val());
                        view.show(elementSelector.pageViewer.html(model.pageViewer()));
                        view.focusedCaseBlackLiner(model.getFocusedCase());
                      }else{
                        $("#imageLoader").hide();
                        $("#_progress").hide();
                        $("#errorSpan").text(response).show();
                      }

                  }
              });
                $("#_progress").hide();
            }
            if(resp.status == "error"){
                $("#imageLoader").hide();
                $("#_progress").hide();
                $("#errorSpan").text(resp.data).show();
                request.abort();
                $("#_progress").hide();
            }
        }
    };
    request.open('POST', '../obj_mvc_ts2/upload.php');
    request.send(data);
  }
  creationNewTest(){
  console.log(elementSelector.getInputNewTest().val());
      testNom = elementSelector.getInputNewTest().val();
      //testLangue = jQuery('#selectLangue option:selected').text();
      testLangue = "français";
      if(testNom !="" && testLangue != "Sélectionnez une langue"){
        var queryValues = [];
        queryValues.push(testNom);
        queryValues.push(testLangue);
        var data = JSON.stringify(queryValues);
        //console.log(dataTest);
        $.ajax({
            type: 'POST',
            url: '../obj_mvc_ts2/ajaxCheckIfTestAlreadyExists.php',
            data: 'data='+data,
            dataType: 'text',
            success: function (response) {
                //alert(response);
                if(response == "true"){
                    // dialogLoading("warningDuplicateSavingTentative");
                    console.log("error");
                }else{
                    var tempValue = $('input[name="tempChoicer"]:radio:checked').val();
                    tempValue = tempValue.split("|");
                    var dataNewPage = tempValue[0]+"##/##";
                    var nbCases = tempValue[1];
                    for(var i = 0; i < nbCases-1; i++){
                        dataNewPage = dataNewPage+"|##";
                    }
                    var queryValues = [];
                    queryValues.push(testNom);
                    queryValues.push(testLangue);
                    queryValues.push(dataNewPage);
                    var data = JSON.stringify(queryValues);
                    $.ajax({
                        type: 'POST',
                        url: '../obj_mvc_ts2/ajaxInsertNewTest.php',
                        data: 'data='+data,
                        datatype:'text',
                        success: function(response){
                            //console.log(response);
                            flag = 1;
                            getImagesForTest(testNom);
                            getTest(null);
                        }
                    });
                }
            }
        });
      }
      else{
        console.log("testNom manquant");
      }
  }
}
