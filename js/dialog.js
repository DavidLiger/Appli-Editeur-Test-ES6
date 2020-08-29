var elementSelector;

class Dialog {
  constructor(width, height, eSelector) {
    this.width = width;
    this.height = height;
    this.elementSelector = eSelector;
    elementSelector.dialog.dialog({
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        open: function() {
            $(this).parents('.ui-dialog').attr('tabindex', -1)[0].focus();
        }
    }).prev(".ui-dialog-titlebar").css("background","darkblue");
  }
  close(){
    elementSelector.dialog.dialog("close");
  }
  newTest(){
    //attribution du titre
    elementSelector.dialog.dialog('option', 'title', 'Créer un nouveau test').empty().html(
        '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end">' +
        '<div id="txtConfirmation">' +
        '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px">' +
        '<label id="lblSelectTexte" style="color: black">Test : </label>' +
        '<input id="newTest" style="font-size: 0.8em" placeholder="Entrez le nom du thème">' +
        '</div>' +
        '<label style="margin-top:30px;color: black;">Modèle de la première page : </label>' +
        '<div id="selectTemplate"></div>'+
        '<div style="display: flex;flex-direction: row;margin-top: 2%">' +
        '<button id="dialogCancelC" style="margin-left: 80%;font-size:0.8em;">Annuler</button>'+
        '<button id="dialogOKC" style="font-size:0.8em;">OK</button>' +
        '</div>' +
        '</div>'
    );
    this.pageTemplateList();
    elementSelector.dialog.dialog("open");
  }
  modTest(testList){
    elementSelector.dialog.dialog('option', 'title', 'Modifier un test').empty().html(
        '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end"><div id="txtConfirmation">' +
        '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px"><label id="lblSelectTexte" style="color: black">' +
        'Test : </label>'+
        '<select id="selectTest"></select></div>'
    );
    var len = testList.length;
    $("#selectTest").empty().append("<option style='color: dimgray;font-style: italic;'>Sélectionnez un test</option>");
    for( var i = 0; i<len; i++){
        var titre = JSON.stringify(testList[i].theme);
        titre = titre.replace(/^"(.*)"$/, '$1');
        $("#selectTest").append("<option>"+titre+"</option>");

    }
    elementSelector.dialog.dialog("open");
  }
  remTest(){
    //attribution du titre
    elementSelector.dialog.dialog('option', 'title', 'Suppression de test').empty().html(
        '<div id="dialogBackground" style="display: flex; flex-direction:column;align-content: flex-end"><div id="txtConfirmation">' +
        '<div style="display: flex; flex-direction:row;margin-top:15px;margin-bottom: 15px"><label id="lblSelectTexte" style="color: black">' +
        'Test : </label><select ' +
        'id="selectTest"></select></div>'
    );
    elementSelector.dialog.dialog("open");
  }
  pageTemplateList(){
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
  confirmEraseCaseContent(caseSelectedVal){
    function getTypeOfCheckBox(){
        if(caseSelectedVal == "txt"){
            return "une image";
        }else{
            return "un texte";
        }
    }
    var type = getTypeOfCheckBox();
    elementSelector.dialog.dialog('option', 'title', 'Suppression de contenu').empty().html(
        '<div style="display: flex; flex-direction:column;align-items: center">' +
        '<span style="color: red;font-size: 1.5em">ATTENTION !</span>' +
        '<span style="color: black;font-size: 0.9em">Voulez-vous ajoutez '+type+' ?</span>' +
        '<span style="color: black;font-size: 0.9em">Le contenu précédent sera perdu !</span>' +
        '<div style="display: flex;flex-direction: row;margin-top: 5%">'+
        '<button id="dialogCancel" style="margin-left: 77%;font-size:0.8em;">Annuler</button>'+
        '<button id="dialogOK" style="font-size:0.8em;">OK</button></div>'+
        '</div>'
    );
    elementSelector.dialog.dialog("open");
  }

}
