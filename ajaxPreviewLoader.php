<?php
require_once ('../fonction/base.php');
require_once 'HTML/QuickForm/Renderer/ITStatic.php';
require_once ('../outil_bi/bi_function_a.php');


$data = json_decode($_POST['data']);
$order = $data[2];
$testNom = $data[0];
$arrayTemplateData = explode("/",$data[1]);
$templateCases = explode("#",$arrayTemplateData[0]);
$template = $templateCases[0];
$cases = $arrayTemplateData[1];

$imgPath = "../obj_mvc_ts2/images/".$testNom."/".$templateCases[1];

$background = "";
if($templateCases[1] != null){
    $background = "<img src='$imgPath' style='$templateCases[2]'>";
}

$arrayCases = explode("|",$cases);

$arrayPage = array();

$noPointer = "";
$page = "";

$checkBoxNb = 0;

foreach($arrayCases as $case){
    $typeValueStyle = explode("#",$case);
    if($typeValueStyle[0]=="txt"){
        //démonte la valeur de style
        $arrayCSS = explode(";",$typeValueStyle[2]);
        foreach($arrayCSS as $css){
            $arrayAttrCSS = explode(":",$css);
            if($arrayAttrCSS[0] == "color"){
                $arrayAttrCSS[1] = "#".$arrayAttrCSS[1];
            }
            $arrayCSS[]= $arrayAttrCSS[0].":".$arrayAttrCSS[1];
            foreach($arrayCSS as $finalcss){
                $typeValueStyle[2] .= $finalcss.";";
            }
        }
        $arrayPage[] = "<div style='$typeValueStyle[2]'>$typeValueStyle[1]</div>";
    }
    if($typeValueStyle[0]=="img"){
        if($typeValueStyle[1] != "Sélectionnez une image"){
            $arrayPage[] = "<img src='../obj_mvc_ts2/images/".$testNom."/".$typeValueStyle[1]."' style='$typeValueStyle[2]'>";
        }
    }
    if($typeValueStyle[0]=="qst"){
        $arrayPage[] = "<div style='display:flex;flex-direction: column;height: 100%'>
                            <div style='display:flex;font-family: comic sans ms;color:black;font-size:20px;align-items: center;justify-content: center;height: 40%'>$typeValueStyle[1]</div>
                            <div style='display:flex;flex-direction: row;height: 30%'>
                                <div style='display:flex;align-items: center;justify-content: center;font-family: comic sans ms;color:black;width: 50%;font-size:20px'>$typeValueStyle[2]</div>
                                <div style='display:flex;align-items: center;justify-content: center;font-family: comic sans ms;color:black;width: 50%;font-size:20px'>$typeValueStyle[3]</div>
                            </div>
                            <div style='display:flex;flex-direction: row;height: 30%'>
                                <div style='display:flex;align-items: center;justify-content: center;width: 50%;'>
                                    <input type='radio' name='response$checkBoxNb' value='0' checked/>
                                </div>
                                <div style='display:flex;align-items: center;justify-content: center;width: 50%;'>
                                    <input type='radio' name='response$checkBoxNb' value='1'/>
                                </div>
                            </div>
                            <input id='goodResponse$checkBoxNb' type='text' value='$typeValueStyle[4]' hidden/>
                        </div>";
        $checkBoxNb += 1;
    }
    if($typeValueStyle[0]==""){
        $arrayPage[] = " ";
    }
}

if($template == "1"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:75%">
            <div id="1" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
            <div style="display: flex; flex-direction: column;width:75%">
                <div id="2" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
                <div id="3" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
                <div style="height:40%;display: flex; flex-direction: row">
                    <div id="4" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
                    <div id="5" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
                </div>
            </div>
        </div>
    </div>';
}

if($template == "2"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
    </div>';
}

if($template == "3"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="height:25%;display: flex; flex-direction: row">
            <div id="1" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="width:75%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        </div>
        <div style="height:25%;display: flex; flex-direction: row">
            <div id="3" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="width:75%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
        <div style="height:25%;display: flex; flex-direction: row">
            <div id="5" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="6" class="previewBorder" style="width:75%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        </div>
    </div>';
}

if($template == "4"){
    $page = '
    <div style="display: flex; flex-direction: row;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: column;width:50%;">
        <div id="1" class="previewBorder" style="height:34%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        </div>
    </div>';
}

if($template == "5"){
    $page = '
    <div style="display: flex; flex-direction: row;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="width:33%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: column;width:67%;">
        <div id="1" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
    </div>';
}

if($template == "6"){
    $page = '
    <div style="display: flex; flex-direction: row;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="width:33%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: column;width:67%;">
        <div id="1" class="previewBorder" style="height:27%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:12%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:12%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="height:12%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        <div id="5" class="previewBorder" style="height:12%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="6" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        </div>
    </div>';
}

if($template == "7"){
    $page = '
    <div style="display: flex; flex-direction: row;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div style="display: flex; flex-direction: column;width:60%;">
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="height:18%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:16%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:16%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
        <div style="display: flex; flex-direction: column;width:40%;">
        <div id="5" class="previewBorder" style="height:50%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="6" class="previewBorder" style="height:50%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        </div>
    </div>';
}

if($template == "8"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div style="display: flex; flex-direction: row;height:50%;">
        <div id="2" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        </div>
    </div>';
}

if($template == "9"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div style="display: flex; flex-direction: row;height:25%;">
        <div id="0" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        </div>
        <div style="display: flex; flex-direction: row;height:75%;">
        <div style="display: flex; flex-direction: column;width:67%;">
        <div id="2" class="previewBorder" style="height:34%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
        <div style="display: flex; flex-direction: column;width:33%;">
        <div id="5" class="previewBorder" style="height:50%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="6" class="previewBorder" style="height:50%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        </div>
        </div>
    </div>';
}

if($template == "10"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:70%;">
        <div id="1" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        </div>
    </div>';
}

if($template == "11"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:35%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:65%;">
        <div id="1" class="previewBorder" style="width:36%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div style="display: flex; flex-direction: column;width:65%;">
        <div id="2" class="previewBorder" style="height:34%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="height:33%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
        </div>
    </div>';
}

if($template == "12"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:40%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:40%;">
        <div id="1" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="width:25%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        </div>
        <div id="5" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
    </div>';
}

if($template == "13"){
    $page = '
    <div style="display: flex; flex-direction: row;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="width:30%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: column;width:70%;">
        <div id="1" class="previewBorder" style="height:30%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div style="display: flex; flex-direction: row;height:70%;">
        <div style="display: flex; flex-direction: column;width:50%;">
        <div id="2" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="4" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        <div id="6" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        <div id="8" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="9">'.$arrayPage[8].'</div>
        <div id="10" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="11">'.$arrayPage[10].'</div>
        </div>
        <div style="display: flex; flex-direction: column;width:50%;">
        <div id="3" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="5" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="7" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="8">'.$arrayPage[7].'</div>
        <div id="9" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="10">'.$arrayPage[9].'</div>
        <div id="11" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="12">'.$arrayPage[11].'</div>
        </div>
        </div>
        </div>
        </div>
    </div>';
}

if($template == "14"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:35%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:65%;">
        <div id="1" class="previewBorder" style="width:33%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="width:34%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="width:33%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        </div>
    </div>';
}

if($template == "15"){
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div style="display: flex; flex-direction: row;height:60%;">
        <div id="2" class="previewBorder" style="width:17%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="width:16%;position:relative;word-wrap: break-word;" data-value="4">'.$arrayPage[3].'</div>
        <div id="4" class="previewBorder" style="width:17%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
        <div id="5" class="previewBorder" style="width:17%;position:relative;word-wrap: break-word;" data-value="6">'.$arrayPage[5].'</div>
        <div id="6" class="previewBorder" style="width:16%;position:relative;word-wrap: break-word;" data-value="7">'.$arrayPage[6].'</div>
        <div id="7" class="previewBorder" style="width:17%;position:relative;word-wrap: break-word;" data-value="8">'.$arrayPage[7].'</div>
        </div>
    </div>';
}

if($template == "16"){
    if($order == "write"){
        $noPointer = "pointer-events: none";
    }
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div id="1" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        <div id="3" class="previewBorder" style="height:25%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="4">'.$arrayPage[3].'</div>
    </div>';
}

if($template == "17"){
    if($order == "write"){
        $noPointer = "pointer-events: none";
    }
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div id="0" class="previewBorder" style="height:20%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
        <div style="display: flex; flex-direction: row;height:40%;">
            <div id="1" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="2">'.$arrayPage[1].'</div>
        <div id="2" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
        </div>
        <div style="display: flex; flex-direction: row;height:40%;">
            <div id="3" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="4">'.$arrayPage[3].'</div>
            <div id="4" class="previewBorder" style="width:50%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="5">'.$arrayPage[4].'</div>
        </div>
    </div>';
}

if($template == "18"){
    if($order == "write"){
        $noPointer = "pointer-events: none";
    }
    $page = '
    <div style="display: flex; flex-direction: column;margin-top:2%;margin-bottom:2%;width:800px;height:600px;border-radius:5px;">

    <div style="display: flex; align-items: center;justify-content: center;height:600px;width:800px;position: absolute;z-index:-50;background-color: floralwhite;">
     '.$background.'
    </div>
        <div style="display: flex; flex-direction: row;height:33%;">
            <div id="0" class="previewBorder" style="width:30%;position:relative;word-wrap: break-word;" data-value="1">'.$arrayPage[0].'</div>
            <div id="1" class="previewBorder" style="width:70%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="2">'.$arrayPage[1].'</div>
        </div>
        <div style="display: flex; flex-direction: row;height:33%;">
            <div id="2" class="previewBorder" style="width:30%;position:relative;word-wrap: break-word;" data-value="3">'.$arrayPage[2].'</div>
            <div id="3" class="previewBorder" style="width:70%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="4">'.$arrayPage[3].'</div>
        </div>
        <div style="display: flex; flex-direction: row;height:34%;">
            <div id="4" class="previewBorder" style="width:30%;position:relative;word-wrap: break-word;" data-value="5">'.$arrayPage[4].'</div>
            <div id="5" class="previewBorder" style="width:70%;position:relative;word-wrap: break-word;'.$noPointer.'" data-value="6">'.$arrayPage[5].'</div>
        </div>
    </div>';
}

$arrayPage = array();

if($order == "read"){
    $arrayPage[] = $template;
    $arrayPage[] = $page;
    echo json_encode($arrayPage);
}else{
    echo $page;
}


?>
