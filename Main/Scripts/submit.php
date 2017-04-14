<?php
if(isset($_POST['email'])) {
    $email_to = "parth@nodal.co";
    $email_subject = "SUPPORT";
    $name = $_POST['name']; // required
    $organization = $_POST['organization']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $message = $_POST['message']; // required

    function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
    }

    $email_message = "Form details below.\n\n";
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Organization: ".clean_string($organization)."\n";
    $email_message .= "Email Address: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_to, $email_subject, $email_message, $headers);
?>
  <!-- include your own success html here -->

  <!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Thank You!</title>
      <link rel="stylesheet" href="../Stylesheets/login/css/style.css">
  
</head>

<body>
  <div class="wrapper">
    <div class="container">
        <h1>Thank you for contacting us.</h1>
        <br>
        <br>
        <h1>We will be in touch with you very soon.</h1>
        <br>
        <br>
        <a href="../index.html"><img src="../Assets/NodalWebLogo-01.png" style="width:50%"></a>
    </div>
    
    
</div>

</body>
</html>
  <?php
}
?>