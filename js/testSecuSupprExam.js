$(document).ready(function () {
    $("#deleteExamBtn").click(function(){
        var examenToken = $("#idExamen").val();
        //alert(examenToken);
        $.ajax({
            type: 'POST',
            url: '../tsecu2/ajaxDeleteExamen.php',
            data: 'examenToken='+examenToken,
            success: function(){
                window.location.href = "https://ag01.travail-temporaire-online.fr/tsecu2/t_secu_inscription.php";

            }
        });
    })
});