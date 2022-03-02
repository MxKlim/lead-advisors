<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';
  

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage( 'ru', 'phpmailer/language/');
  $mail->isHTML( true);
  $mail->isSMTP (true);                                          
  $mail->Host = 'smtp.gmail.com';                    
  $mail->SMTPAuth = true ;                                 
  $mail->Username = 'maxklimjob91@gmail.com' ;                    
  $mail->Password = '9743537m' ;                             
  $mail->SMTPSecure = PHPMailer :: ENCRYPTION_SMTPS ;            
  $mail->Port = 465 ; 

  // от кого
  $mail->setFrom('maxklimjob91@gmail.com', 'leadadvisors.com');
  // кому 
  $mail->addAddress($_POST["email"]);
  $mail->Subject = 'Subscription completed successfully Lead Advisors';
  $body = '<h1>Hello</>' . $_POST["email"];
  $mail->Body = $body;
  $mail->send();
?>