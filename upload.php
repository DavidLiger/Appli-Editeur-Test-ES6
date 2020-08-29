<?php
// Output JSON
function outputJSON($msg, $status = 'error'){
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $msg,
        'status' => $status
    )));
}

// Check for errors
if($_FILES['SelectedFile']['error'] > 0){
    outputJSON('Une erreur s\'est produite durant l\'importation.');
}

if(!getimagesize($_FILES['SelectedFile']['tmp_name'])){
    outputJSON('Merci de vous assurer d\'importer une image.');
}

// Check filetype
if($_FILES['SelectedFile']['type'] != 'image/png' && $_FILES['SelectedFile']['type'] != 'image/jpg'
    && $_FILES['SelectedFile']['type'] != 'image/jpeg'){
    outputJSON('Type de fichier non-admis.');
}

// Check filesize
if($_FILES['SelectedFile']['size'] > 2000000){
    outputJSON('Le fichier importé dépasse la taille admise (2MB).');
}

// Check if the file exists
if(file_exists('images/' . $_FILES['SelectedFile']['name'])){
    outputJSON('Un fichier portant le même nom est déjà présent.');
}

// Upload file
if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], 'images/' . $_FILES['SelectedFile']['name'])){
    outputJSON('Erreur d\'importation. Assurez-vous d\'avoir les droits d\'écriture sur le dossier de destination.');
}

// Success!
outputJSON('Fichier importé avec succès : "' . 'images/' . $_FILES['SelectedFile']['name'] . '".', 'success');
?>
