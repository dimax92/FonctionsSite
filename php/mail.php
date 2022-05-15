<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function envoiMail($destinataire, $message){
    $mail = new PHPMailer(true);
    try {
        //$mail->SMTPDebug = 2;
        $mail->Priority = 3;
        $mail->From = 'contact@machatvente.com';
        $mail->Sender = 'contact@machatvente.com';
        $mail->FromName = 'MAchatVente';
        $mail->Port = "587";
        $mail->DKIM_domain = 'machatvente.com';
        $mail->DKIM_private = '/var/www/html/NouveauSite/php/dkim.private.key';
        $mail->DKIM_selector = '1640255695.machatvente';
        $mail->DKIM_passphrase = '';
        $mail->DKIM_identity = $mail->From;
        $mail->AddAddress($destinataire);
        $mail->Subject = 'confirmation';
        $mail->IsHTML(TRUE);
        $mail->Body = $message;
        $mail->AddCustomHeader("List-Unsubscribe: <mailto:contact@machatvente.com?subject=Unsubscribe>, <http://machatvente.com/unsubscribe>");
        $mail->Send();
        return "envoye";
    } catch (Exception $e) {
        return "echec";
    };
};

?>
