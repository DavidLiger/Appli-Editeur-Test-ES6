var elementSelector;
var dialog;
var imgStylersResetValues = [
  ['#cssImgWidth',1,6,25,50],
  ['#cssImgHeight',1,6,25,100],
  ['#cssImgBorderRadius',0,10,5,0],
  ['#cssImgMarginLeft',0,10,10,0],
  ['#cssImgFilterBlur','#cssImgFilterBlurImg'],
  ['#cssImgFilterBrightness',0,5,25,100],
  ['#cssImgFilterContrast',0,7,25,100],
  ['#cssImgFilterGrayscale',0,10,10,0]
];

class View {
  constructor(){
    elementSelector = new ElementSelector();
  }
  slideDownMenu(element){
    // alert(element)
    this.elementList = element;
    this.elementList.slideDown(document.body.addEventListener('click', this.slideUpMenu, false));

  }
  slideUpMenu(e){
    // alert(elementList);
    if(e.target.id != 'menuList' && e.target.id != 'menuButton'){
        document.body.removeEventListener('click', this.slideUpMenu, false);
        elementSelector.editActionsList.slideUp();
    }
    if(e.target.id != 'helpList' && e.target.id != 'helpButton'){
        document.body.removeEventListener('click', this.slideUpMenu, false);
        elementSelector.helpActionsList.slideUp();
    }
  }
  hide(element){
    element.hide();
  }
  slideDown(element){
    element.slideDown();
  }
  slideUp(element){
    element.slideUp();
  }
  show(element){
    element.show();
  }
  empty(element){
    element.empty();
  }
  pageNumSelector(pagesLength, pagePos){
    elementSelector.pageSelector.empty();
    for(var i = 0; i < pagesLength; i++){
        if(i+1 == pagePos){
            elementSelector.pageSelector.append('<option selected>'+(i+1)+'</option>')
        }else{
            elementSelector.pageSelector.append('<option>'+(i+1)+'</option>')
        }
    }
  }
  nextPrevArrowDisplay(pagesLength, pagePos){
    if(pagePos < pagesLength){
        this.show(elementSelector.nextBtn);
    }else{
        this.hide(elementSelector.nextBtn);
    }
    if(pagePos > 1){
        this.show(elementSelector.prevBtn);
    }else{
        this.hide(elementSelector.prevBtn);
    }
  }
  editorToolsDisplay(bckImg,radioChecked){
      if(radioChecked == "bck" || radioChecked == "img"){
          elementSelector.textEditor.hide();
          elementSelector.imgEditor.show();
          if(radioChecked == "bck"){
              this.txtAndImgEditorBtnDisabler(true);
            if(bckImg == ""){
                this.resetImgStylers();
            }
          }
      }
      if(radioChecked == "txt" || radioChecked == ""){
          elementSelector.textEditor.show();
          elementSelector.imgEditor.hide();
          elementSelector.imgSelectedInput.hide("slide", { direction: "left" }, 5).val(fileName);
          elementSelector.uploadImgBtn.removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.jpg");
      }
  }
  txtAndImgEditorBtnDisabler(bool){
    if(bool == true){
      elementSelector.textEditorBtn.attr('disabled',true);
      elementSelector.imgEditorBtn.attr('disabled',true);
      elementSelector.textEditorBtnLbl.attr('title','Cliquez sur une case pour l\'éditer');
      elementSelector.imgEditorBtnLbl.attr('title','Cliquez sur une case pour l\'éditer');
    }else{
      elementSelector.textEditorBtn.attr('disabled',false);
      elementSelector.imgEditorBtn.attr('disabled',false);
      elementSelector.textEditorBtnLbl.removeAttr('title');
      elementSelector.imgEditorBtnLbl.removeAttr('title');
    }
  }
  preventEraseCaseContent(radioBoxChecked, caseDataValue){
        if(radioBoxChecked == "img"){
          if(caseDataValue != ""){
            this.resetImgStylers();
            dialog = new Dialog(380,220,elementSelector);
            dialog.confirmEraseCaseContent("txt");
          }else{
              
          }
        }
        if(radioBoxChecked == "txt"){
            this.resetTextStylers();
            dialog = new Dialog(380,220,elementSelector);
            dialog.confirmEraseCaseContent("img");
        }
  }
  resetTextStylers(){
    elementSelector.getTextArea().removeAttr("style").css("height","180px").css("border-radius","5px").css("font-size","0.9em");
    //reset des selects
    $("#cssTxtFontFamily").empty().append('<option value="Times New Roman" style="font-family: Times New Roman" selected>Times New Roman</option>')
        .append('<option value="Verdana" style="font-family: Verdana">Verdana</option>')
        .append('<option value="Courier New" style="font-family: Courier New">Courier New</option>')
        .append('<option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option>')
        .append('<option value="Cottonwood" style="font-family: Cottonwood">Cottonwood</option>');
    $("#cssTxtFontFamily").removeAttr("style");
    $("#cssTxtFontFamily").css("border-radius","5px").css("font-size","0.9em").css("display","none").css("margin-top","1px")
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
  }
  resetImgStylers(){
    // console.log(imgStylersResetValues[1][1]);
    $("#cssImgFilterBlur").empty();
    for(var j = 0; j<=5 ; j++){
        if(j == 0){
            $("#cssImgFilterBlur").append('<option value="'+j+'px" selected>'+j+'px</option>');
        }else{
            $("#cssImgFilterBlur").append('<option value="'+j+'px">'+j+'px</option>');
        }
    }
    for(var i = 0; i < elementSelector.imgStylerArray.length; i++){
      if(elementSelector.imgStylerArray[i][1] != '#cssImgFilterBlur'){
        if(elementSelector.imgStylerArray[i][1] == imgStylersResetValues[i][0]){
          this.imgStylerLooper(imgStylersResetValues[i][0], imgStylersResetValues[i][1], imgStylersResetValues[i][2], imgStylersResetValues[i][3], imgStylersResetValues[i][4])
        }
      }
    }
  }
  imgStylerLooper(element, minRange, maxRange, step, offset){
    $(element).empty();
    for(var i = minRange; i<=maxRange ; i++){
        var percent = i*step;
        if(percent == offset){
            $(element).append('<option value="'+percent+'%" selected>'+percent+'%</option>');
        }else{
            $(element).append('<option value="'+percent+'%">'+percent+'%</option>');
        }
    }
  }
  setTextStylers(cssAttr, value){
    if(cssAttr == "font-family"){
      // console.log(value);
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
        this.setFontSelector();
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
setFontSelector(){
  $("#cssTxtFontFamily").removeAttr("style");
  $("#cssTxtFontFamily").css("border-radius","0px 5px 5px 0px").css("font-size","0.9em")
      .css("display","none").css("margin-top","0px").css("width","120px")
      .css("font-family",$("#cssTxtFontFamily option:selected").val());
}
  setImgStylers(cssAttr, value){
    value = value.slice(0,-1);
    if(cssAttr == "width"){
      this.imgStylerLooper(imgStylersResetValues[0][0], imgStylersResetValues[0][1], imgStylersResetValues[0][2], imgStylersResetValues[0][3], value);
    }
    if(cssAttr == "height"){
      this.imgStylerLooper(imgStylersResetValues[1][0], imgStylersResetValues[1][1], imgStylersResetValues[1][2], imgStylersResetValues[1][3], value);
    }
    if(cssAttr == "border-radius"){
      this.imgStylerLooper(imgStylersResetValues[2][0], imgStylersResetValues[2][1], imgStylersResetValues[2][2], imgStylersResetValues[2][3], value);
    }
    if(cssAttr == "margin-left"){
      this.imgStylerLooper(imgStylersResetValues[3][0], imgStylersResetValues[3][1], imgStylersResetValues[3][2], imgStylersResetValues[3][3], value);
    }
    if(cssAttr == "filter"){
        var attrFilter = value.split(" ");
        for(var i = 0; i<attrFilter.length; i++){
            var attrFilterParam = attrFilter[i].split("(");
            attrFilterParam[1] = attrFilterParam[1].replace(')', '');
            if(attrFilterParam[0] == "blur"){
              attrFilterParam[1] = attrFilterParam[1].slice(0,-2);
                $("#cssImgFilterBlur").empty();
                for(var j = 0; j<=5 ; j++){
                    if(j == attrFilterParam[1]){
                        $("#cssImgFilterBlur").append('<option value="'+j+'px" selected>'+j+'px</option>');
                    }else{
                        $("#cssImgFilterBlur").append('<option value="'+j+'px">'+j+'px</option>');
                    }
                }
            }
            if(attrFilterParam[0] == "brightness"){
              attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                this.imgStylerLooper(imgStylersResetValues[5][0], imgStylersResetValues[5][1], imgStylersResetValues[5][2], imgStylersResetValues[5][3], attrFilterParam[1]);
            }
            if(attrFilterParam[0] == "contrast"){
              attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                this.imgStylerLooper(imgStylersResetValues[6][0], imgStylersResetValues[6][1], imgStylersResetValues[6][2], imgStylersResetValues[6][3], attrFilterParam[1]);
            }
            if(attrFilterParam[0] == "grayscale"){
              attrFilterParam[1] = attrFilterParam[1].slice(0,-1);
                this.imgStylerLooper(imgStylersResetValues[7][0], imgStylersResetValues[7][1], imgStylersResetValues[7][2], imgStylersResetValues[7][3], attrFilterParam[1]);
            }
        }
    }
  }
  selectStyleAnimation(label,select,image){
      var option = select+" option";
      // console.log(option);
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
      $("body").click(function(e) {
        if(e.target.id != select.substr(1) && e.target.id != option.substr(1) && e.target.id != image.substr(1) && $(select).is(":visible")) {
              $(select).hide();
              $(image).removeClass("labelSelectCSSVisible").addClass("labelSelectCSSHidden");
              //clearInterval(checkFileNameVal);
          }
      });
  }
  focusedCaseBlackLiner(focusedCase){
    $(".previewBorder").css("border","1px solid lightgray");
    var thisCase = document.getElementById(focusedCase);
    thisCase.style["border"] = "1px solid black";
  }
  editorBtnAutoChecker(caseTypeValue,bckImg){
    if(caseTypeValue == "txt"){
        $("#radioTxt").prop("checked", true);
        this.editorToolsDisplay(bckImg, caseTypeValue);
      }
    if(caseTypeValue == "img"){
        $("#radioImg").prop("checked", true);
        this.editorToolsDisplay(bckImg, caseTypeValue);
      }
    if(caseTypeValue == ""){
        $("#radioTxt").prop("checked", true);
        this.editorToolsDisplay(bckImg, caseTypeValue);
      }
  }
  txtAreaAppender(focusedCase, caseDataValue, caseStyleValue, caseTypeValue){
    //textArea dans la div
    let textAreaValue;
    var thisCase = document.getElementById(focusedCase);
    if(elementSelector.getTypeSelected().val() == "txt"){
      if(caseDataValue == "" || caseDataValue == "undefined" || caseDataValue == null){
          textAreaValue = "";
      }else{
          textAreaValue = caseDataValue;
      }
        var width = thisCase.offsetWidth;
        var height = thisCase.offsetHeight;
        elementSelector.getTextArea().remove();
        thisCase.innerHTML =
            "<div style='z-index: 50;position:absolute'><textarea id='textArea' style='width:"+width+"px;height:"+height+"px;border-radius: 5px" +
            ";font-size: 0.9em;background:transparent;border:transparent;outline: none;border:none;resize: none;'>"+textAreaValue+"</textarea></div>";
        // txtStyleSelectAndTextareaListener();
        //fonction qui renvoie le curseur derrière le dernier caractère
        (function($){
            $.fn.focusTextToEnd = function(){
                this.focus();
                var $thisVal = this.val();
                this.val('').val($thisVal);
                return this;
            }
        }(jQuery));
        elementSelector.getTextArea().focusTextToEnd();
    }
  }
  applyEditorAndTextareaStyle(caseStyleValue, caseTypeValue){
      if(caseTypeValue == "img" || caseTypeValue == "bck"){
          let cssArray = caseStyleValue.split(";");
          for(var i = 0; i<cssArray.length; i++){
              var attrCSS = cssArray[i].split(":");
              this.setImgStylers(attrCSS[0],attrCSS[1]);
          }
      }else{
          let cssArray = caseStyleValue.split(";");
          for(var i = 0; i<cssArray.length; i++){
              var attrCSS = cssArray[i].split(":");
              if(attrCSS[0] == "color"){
                  elementSelector.getTextArea().css(attrCSS[0],"#"+attrCSS[1],null);
              }else{
                  elementSelector.getTextArea().css(attrCSS[0],attrCSS[1],null);
                  // console.log(attrCSS[1]);
              }
              this.setTextStylers(attrCSS[0],attrCSS[1]);
          }
      }
  }
  setImgSelector(data,fileName){
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
  }
}
