<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');

$BDD = $GLOBALS['EC']['DB']['CLIENT'];

$data = json_decode($_POST['data']);
$emailCandidat = $data[0];
$subjectTranslated = $data[1];
$htmlTranslated = $data[2];
$curdir = getcwd();


$to = $emailCandidat;

//sender
$from = 'ag01.travail-temporaire-online.fr';
$fromName = 'TTOnline';

//email subject
$subject = $subjectTranslated;

//attachment file path
$file = $curdir."/images/test.pdf";

//email body content
$htmlContent = ' <p>'.$htmlTranslated.'</p>';

//header for sender info
$headers = "From: $fromName"." <".$from.">";

//boundary
$semi_rand = md5(time());
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

//headers for attachment
$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

//multipart boundary
$message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
    "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";

//preparing attachment
if(!empty($file) > 0){
    if(is_file($file)){
        $message .= "--{$mime_boundary}\n";
        $fp =    @fopen($file,"rb");
        $data =  @fread($fp,filesize($file));

        @fclose($fp);
        $data = chunk_split(base64_encode($data));
        $message .= "Content-Type: application/octet-stream; name=\"".basename($file)."\"\n" .
            "Content-Description: ".basename($file)."\n" .
            "Content-Disposition: attachment;\n" . " filename=\"".basename($file)."\"; size=".filesize($file).";\n" .
            "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
    }
}

$message .= "--{$mime_boundary}--";
$returnpath = "-f" . $from;

//send email
$mail = @mail($to, $subject, $message, $headers, $returnpath);


?>
