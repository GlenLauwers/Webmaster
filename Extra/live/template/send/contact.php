<?php
require_once('real_ip.php');
if((!isset($_POST['data'])) || (!isset($_POST['receiver'])) || (!isset($_POST['subject']))) {
	echo $error;
    die();
}
$receiver = decode($_POST['receiver']);
$subject  = decode($_POST['subject']);
$headers  = "From: " . decode($_POST['data'][1]['value']) . "\r\n";
$headers .= "Reply-To: " . decode($_POST['data'][1]['value']) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$message .= '<table cellpadding="10">';
foreach ($_POST['data'] as $key => $value) {
    $message .= '<tr><th align="right" valign="top">' . decode($value['title']) . ':</th><td>' . decode($value['value']) . '</td></tr>';
}
$message .= '<tr><th align="right">IP-address:</th><td>' . real_ip() . '</td></tr>';
$message .= '</table>';
mail($receiver, $subject, $message, $headers);
?>