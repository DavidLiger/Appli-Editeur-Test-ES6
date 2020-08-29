<?php
if(!empty($_POST['data'])){
    $data = base64_decode($_POST['data']);
// print_r($data);
    file_put_contents( "images/test.pdf", $data );
    echo $data;
} else {
    echo "No Data Sent";
}
exit();
?>