var controller;
var elementSelector;
var view;
var model;
var dialog;

class Controller {
  constructor(){
    elementSelector = new ElementSelector();
    view = new View();
    model = new Model(elementSelector,view);
  }
  editorBtnListener() {
    elementSelector.editBtn.click(function(){
      view.slideDownMenu(elementSelector.editActionsList);
      view.hide(elementSelector.helpActionsList);
      // alert(model.getTestNom())
    });
    elementSelector.editActionBtn.click(function(){
      view.slideUp(elementSelector.editActionsList);
    });
    elementSelector.helpBtn.click(function(){
      view.slideDownMenu(elementSelector.helpActionsList);
      view.hide(elementSelector.editActionsList);
    });
    elementSelector.helpActionBtn.click(function(){
      view.slideUp(elementSelector.helpActionsList);
    });
  }
  actionBtnListener(){
    elementSelector.addActionBtn.click(function(){
      dialog = new Dialog(630,460,elementSelector);
      dialog.newTest();
      controller.dialogBtnsListener();
    });
    elementSelector.modActionBtn.click(function(){
      dialog = new Dialog(330,140,elementSelector);
      dialog.modTest(model.getTests());
    });
    elementSelector.remActionBtn.click(function(){
      dialog = new Dialog(330,140,elementSelector);
      dialog.remTest();
    });
  }
  testListListener(){
    elementSelector.selectTest.change(function(){
      model.setTestNom(elementSelector.getTestSelected().text());
      model.dataCutter();
      view.empty(elementSelector.pageViewer);
      view.show(elementSelector.pageViewer.html(model.pageViewer()));
      view.show(elementSelector.editorContainer);
      view.slideDown(elementSelector.editor);
      view.pageNumSelector(model.getPagesLength(),model.getPagePosition());
      view.nextPrevArrowDisplay(model.getPagesLength(),model.getPagePosition());
      view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
      view.resetTextStylers();
      dialog.close();
    });
  }
  pageNumListListener(){
    elementSelector.pageSelector.change(function(){
      model.setPagePosition(elementSelector.getPageSelected().val());
      model.setOldCurrentCase("");
      model.setFocusedCase("");
      view.editorBtnAutoChecker("txt",model.getBckImg());
      view.pageNumSelector(model.getPagesLength(),model.getPagePosition());
      view.nextPrevArrowDisplay(model.getPagesLength(),model.getPagePosition());
      view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
      view.empty(elementSelector.pageViewer);
      view.show(elementSelector.pageViewer.html(model.pageViewer()));
      view.show(elementSelector.editorContainer);
      model.setOldCurrentPage(model.getPagePosition());
      model.setPagePosition($(this).val());
    });
  }
  nextPrevArrowListener(){
    elementSelector.nextBtn.click(function(){
      model.setPagePosition(+model.getPagePosition()+1);
      model.setOldCurrentCase("");
      model.setFocusedCase("");
      view.editorBtnAutoChecker("txt",model.getBckImg());
      view.pageNumSelector(model.getPagesLength(),model.getPagePosition());
      view.nextPrevArrowDisplay(model.getPagesLength(),model.getPagePosition());
      view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
      view.empty(elementSelector.pageViewer);
      view.show(elementSelector.pageViewer.html(model.pageViewer()));
      view.show(elementSelector.editorContainer);
      model.setOldCurrentPage(model.getPagePosition());
      model.setPagePosition(elementSelector.getPageSelected().val());
    })
    elementSelector.prevBtn.click(function(){
      model.setPagePosition(+model.getPagePosition()-1);
      model.setOldCurrentCase("");
      model.setFocusedCase("");
      view.editorBtnAutoChecker("txt",model.getBckImg());
      view.pageNumSelector(model.getPagesLength(),model.getPagePosition());
      view.nextPrevArrowDisplay(model.getPagesLength(),model.getPagePosition());
      view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
      view.empty(elementSelector.pageViewer);
      view.show(elementSelector.pageViewer.html(model.pageViewer()));
      view.show(elementSelector.editorContainer);
      model.setOldCurrentPage(model.getPagePosition());
      model.setPagePosition(elementSelector.getPageSelected().val());
    })
  }
  editorTypeListener(){
    elementSelector.valueTypeOpt.change(function(){
      if(elementSelector.getTypeSelected().val() != model.getCaseTypeValue(model.getFocusedCase())){
        view.preventEraseCaseContent(elementSelector.getTypeSelected().val(),model.getCaseDataValue(model.getFocusedCase()));
        model.resetValuesForCaseErasing(model.getCaseTypeValue(model.getFocusedCase()));
      }
      if(elementSelector.getTypeSelected().val() == "txt"){
        elementSelector.getTextArea().val(model.getCaseDataValue(model.getFocusedCase()));
        model.clearIntervalCheckFileName();
      }
      if(elementSelector.getTypeSelected().val() == "bck"){
        model.setFocusedCase("");
        model.setOldCurrentCase("");
        model.setFileName(model.getTemplateData());
        view.applyEditorAndTextareaStyle("bck",model.getTemplateStyle());
        view.setImgSelector(model.XMLHttpRequest('POST','../obj_mvc_ts2/ajaxOptionsSelectImages.php',model.getTestNom(),'JSON'),model.getFileName());
        view.show(elementSelector.pageViewer.html(model.pageViewer()));
      }
      view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
    });
    for(var i = 0; i < elementSelector.imgStylerArray.length; i++){
      view.selectStyleAnimation(elementSelector.imgStylerArray[i][0],elementSelector.imgStylerArray[i][1],elementSelector.imgStylerArray[i][2]);
    }
    for(var i = 0; i < elementSelector.txtStylerArray.length; i++){
      if(elementSelector.txtStylerArray[i][1] != "#cssTxtColor"){
        view.selectStyleAnimation(elementSelector.txtStylerArray[i][0],elementSelector.txtStylerArray[i][1],elementSelector.txtStylerArray[i][2]);
      }
    }
  }
  pageViewerListener(){
    $('#preview').on('click', ".previewBorder", function (){
      model.setFocusedCase($(this).attr("id"));
      if(model.getCaseTypeValue(model.getFocusedCase()) == "img"){
        model.setFileName(model.getCaseDataValue(model.getFocusedCase()));
      }
      let oldImgName = $('#selectImageList option:selected').val();
      view.setImgSelector(model.XMLHttpRequest('POST','../obj_mvc_ts2/ajaxOptionsSelectImages.php',model.getTestNom(),'JSON'),model.getFileName());
        if(model.getOldCurrentCase() == ""){
            view.show(elementSelector.pageViewer.html(model.pageViewer()));
            model.setOldCurrentCase($(this).attr("data-value"));
        }else{
            model.dataRecorder(oldImgName);
            view.hide(elementSelector.saveBtn);
            view.show(elementSelector.pageViewer.html(model.pageViewer()));
            model.setOldCurrentCase($(this).attr("data-value"));
        }
        if(model.getCaseTypeValue(model.getFocusedCase()) == ""){
          view.editorBtnAutoChecker("txt",model.getBckImg());
          view.editorToolsDisplay(model.getBckImg(),elementSelector.getTypeSelected().val());
          // elementSelector.getTextArea().val("");
          view.resetTextStylers();
          model.setFileName("");
          view.setImgSelector(model.XMLHttpRequest('POST','../obj_mvc_ts2/ajaxOptionsSelectImages.php',model.getTestNom(),'JSON'),model.getFileName());
        }
        controller.textAreaSettings()
        view.hide(elementSelector.errorSpan);
      });
    $('#preview').on('click', ".previewBorder, #textArea", function (e){
        e.stopPropagation();
        // model.setTextAreaValue("");
    });
  }
  textAreaListener(){
    elementSelector.getTextArea().on('input', function(){
        if(elementSelector.getTextArea().val() != null){
            view.show(elementSelector.saveBtn);
        }
    });
    elementSelector.getTextArea().change(function(){
        if(elementSelector.getTextArea().val() != null){
            view.show(elementSelector.saveBtn);
        }
    })
  }
  saveBtnListener(){
    elementSelector.saveBtn.click(function(){
      model.dataRecorder();
      view.hide(elementSelector.saveBtn);
    })
  }
  txtStylersListener(){
    view.setFontSelector();
    for(var i = 0; i < elementSelector.txtStylerArray.length-1; i++){
      $(elementSelector.txtStylerArray[i][1]).change(function(){
        if(i==0){
          view.setFontSelector();
        }
        model.dataRecorder();
        view.show(elementSelector.pageViewer.html(model.pageViewer()));
        controller.textAreaSettings();
        })
    }
    $('input[name="cssTxtAlign"]').click(function(e) {
        e.stopPropagation();
        model.dataRecorder();
        view.show(elementSelector.pageViewer.html(model.pageViewer()));
        controller.textAreaSettings();
    });
  }
  textAreaSettings(){
    view.editorBtnAutoChecker(model.getCaseTypeValue(model.getFocusedCase()),model.getBckImg());
    view.focusedCaseBlackLiner(model.getFocusedCase());
    view.txtAndImgEditorBtnDisabler(false);
    view.txtAreaAppender(model.getFocusedCase(),model.getCaseDataValue(model.getFocusedCase()),model.getCaseStyleValue(model.getFocusedCase()),model.getCaseTypeValue(model.getFocusedCase()));
    controller.textAreaListener();
    view.applyEditorAndTextareaStyle(model.getCaseStyleValue(model.getFocusedCase()),model.getCaseTypeValue(model.getFocusedCase()));
  }
  imgStylersListener(){
    for(var i = 0; i < elementSelector.imgStylerArray.length; i++){
      $(elementSelector.imgStylerArray[i][1]).change(function(){
        model.dataRecorder(elementSelector.getImgSelected().val());
        view.show(elementSelector.pageViewer.html(model.pageViewer()));
        view.focusedCaseBlackLiner(model.getFocusedCase());
      })
    }
    $("#selectImageList").change(function(){
      model.dataRecorder(elementSelector.getImgSelected().val());
      view.show(elementSelector.pageViewer.html(model.pageViewer()));
      view.focusedCaseBlackLiner(model.getFocusedCase());
    })
  }
  uploadImgBtnsListener(){
    $("#searchImgBtn").click(function(){
      var displayFile = setInterval(function(){
          var _file = document.getElementById('_file');
          model.setFileName(_file.files.item(0).name);
          $("#fileToUp").show("slide", { direction: "left" }, 5).val(fileName);
          $("#uploadEnvoiImg").removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.gif");
          clearInterval(displayFile);
          model.checkFileName();
      },500)
    });
    //bouton upload
    var _submitBtn = document.getElementById('_submit');
    _submitBtn.onclick = function(){
      clearInterval(model.checkFileNameVal);
      $("#fileToUp").hide("slide", { direction: "left" }, 5).val(fileName);
      $("#uploadEnvoiImg").removeAttr("src").attr("src","../obj_mvc_ts2/images/tsecu2/upload-envoi.jpg");
      $("#imageLoaderContainer").show();
      $("#_progress").show();
      model.imageUpload();
      $("#imageLoader").hide().attr( "src", "" );
      $("#errorSpan").empty();
    };
  }
}

$(document).ready(function () {
    controller = new Controller();
    controller.editorBtnListener();
    controller.actionBtnListener();
    controller.testListListener();
    controller.pageNumListListener();
    controller.nextPrevArrowListener();
    controller.editorTypeListener();
    controller.pageViewerListener();
    controller.saveBtnListener();
    controller.txtStylersListener();
    controller.imgStylersListener();
    controller.uploadImgBtnsListener();
});
