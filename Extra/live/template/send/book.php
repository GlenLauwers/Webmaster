<?php
require_once('real_ip.php');
if((!isset($_POST['data'])) || (!isset($_POST['receiver'])) || (!isset($_POST['subject']))) {
	echo $error;
    die();
}
$day      = array(
    'title' => decode($_POST['data'][0]['title']),
    'value' => decode($_POST['data'][0]['value'])
);
$month    = array(
    'title' => decode($_POST['data'][1]['title']),
    'value' => decode($_POST['data'][1]['value'])
);
$year     = array(
    'title' => decode($_POST['data'][2]['title']),
    'value' => decode($_POST['data'][2]['value'])
);
$hour     = array(
    'title' => decode($_POST['data'][3]['title']),
    'value' => decode($_POST['data'][3]['value'])
);
$minute   = array(
    'title' => decode($_POST['data'][4]['title']),
    'value' => decode($_POST['data'][4]['value'])
);
$receiver = decode($_POST['receiver']);
$subject  = decode($_POST['subject']);
$headers  = "From: " . $receiver . "\r\n";
$headers .= "Reply-To: " . $receiver . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$message .= '<table cellpadding="10">';
$message .= '<tr><th align="right">Date:</th><td>'.$day['value'].'-'.$month['value'].'-'.$year['value'].'</td></tr>';
$message .= '<tr><th align="right">Time:</th><td>'.$hour['value'].':'.$minute['value'].'</td></tr>';
foreach ($_POST['data'] as $key => $value) {
    if ($key > 4) {
        $message .= '<tr><th align="right" valign="top">'.decode($value['title']).':</th><td>'.decode($value['value']).'</td></tr>';
    }
}
$message .= '<tr><th align="right">IP-address:</th><td>'.real_ip().'</td></tr>';
$message .= '</table>';
mail($receiver, $subject, $message, $headers);
?>