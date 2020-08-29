class ElementSelector{
  constructor(){
    this.editBtn = $("#menuButton");
    this.helpBtn = $("#helpButton");
    this.saveBtn = $("#saveButton");
    this.editActionsList = $("#menuList");
    this.helpActionsList = $("#helpList");
    this.editActionBtn = $(".subMenuButton");
    this.helpActionBtn = $(".subHelpButton");
    this.addActionBtn = $("#newTestButton");
    this.modActionBtn = $("#modifyTestButton");
    this.remActionBtn = $("#removeTestButton");

    this.editActionsList = $("#menuList");
    this.helpActionsList = $("#helpList");
    this.errorSpan = $("#errorSpan");

    this.selectTest = $("#dialogMenu, #selectTest");

    this.editorContainer = $("#contentEditor");
    this.dialog = $("#dialogMenu");
    this.editor = $("#editor");
    this.textEditor = $("#textEditor");
    this.imgEditor = $("#imgEditor");

    this.textEditorBtn = $("#radioTxt");
    this.imgEditorBtn = $("#radioImg");
    this.textEditorBtnLbl = $("#radioTxtLbl");
    this.imgEditorBtnLbl = $("#radioImgLbl");
    this.uploadImgBtn = $("#uploadEnvoiImg");
    this.imgSelectedInput = $("#fileToUp");

    this.pageSelector = $("#currentPage");
    this.nextBtn = $("#nextButton");
    this.prevBtn = $("#precButton");

    this.pageViewer = $("#preview");
    this.valueTypeOpt = $('[name="valueType"]');

    this.imgStylerArray = [
      ['#cssImgWidthLbl','#cssImgWidth','#cssImgWidthImg'],
      ['#cssImgHeightLbl','#cssImgHeight','#cssImgHeightImg'],
      ['#cssImgBorderRadiusLbl','#cssImgBorderRadius','#cssImgBorderRadiusImg'],
      ['#cssImgMarginLeftLbl','#cssImgMarginLeft','#cssImgMarginLeftImg'],
      ['#cssImgFilterBlurLbl','#cssImgFilterBlur','#cssImgFilterBlurImg'],
      ['#cssImgFilterBrightnessLbl','#cssImgFilterBrightness','#cssImgFilterBrightnessImg'],
      ['#cssImgFilterContrastLbl','#cssImgFilterContrast','#cssImgFilterContrastImg'],
      ['#cssImgFilterGrayscaleLbl','#cssImgFilterGrayscale','#cssImgFilterGrayscaleImg']
    ];

    this.txtStylerArray = [
      ['#cssTxtFontFamilyLbl','#cssTxtFontFamily','#cssTxtFontFamilyImg'],
      ['#cssTxtFontSizeLbl','#cssTxtFontSize','#cssTxtFontSizeImg'],
      ['#cssTxtColorLbl','#cssTxtColor','#cssTxtColorImg'],
      ['#cssTxtLetterSpacingLbl','#cssTxtLetterSpacing','#cssTxtLetterSpacingImg'],
      ['#cssTxtLineHeightLbl','#cssTxtLineHeight','#cssTxtLineHeightImg'],
      ['#cssTxtWordSpacingLbl','#cssTxtWordSpacing','#cssTxtWordSpacingImg'],
      ['#cssTxtAlignLbl','#cssTxtAlign','#cssTxtAlignImg']
    ];
  }
  /**
  * Méthodes récupérant des éléments injectés dans le DOM après le premier chargement
  */
  getPageSelected(){
    return this.pageSelected = $("#currentPage option:selected");
  }
  getTestSelected(){
    return this.testSelected = $('#selectTest option:selected');
  }
  getTypeSelected(){
    return this.typeSelected = $('[name="valueType"]:radio:checked');
  }
  getTextArea(){
    return this.textArea = $("#textArea");
  }
  getTxtAlignSelected(){
    return this.txtAlign = $('input[name="cssTxtAlign"]:radio:checked');
  }
  getImgSelected(){
    return this.imgSelected = $("#selectImageList option:selected");
  }
  getDialogOKBtnC(){
    return this.dialogOKBtn = $("#dialogOKC");
  }
  getDialogCancelBtnC(){
    return this.dialogCancelBtn = $("#dialogCancelC");
  }
  getInputNewTest(){
    return this.inputNewTest = $("#newTest");
  }
}
