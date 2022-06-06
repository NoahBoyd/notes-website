<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style/styles.css">
    <script src="../script/signup.js"></script>
    <title>Signup Page</title>
</head>

<body>
    <section class="signup-page">
        <div class="signup-wrapper">
            <h1>Create Account</h1>
            <input id="signup-user-email" class="login-input" type="text" placeholder="Email">
            <input id="signup-user-name" class="login-input" type="text" placeholder="Username" maxlength="10">
            <input id="signup-user-password" class="login-input" type="password" placeholder="Password">
            <input id="signup-user-confirm" class="login-input" type="password" placeholder="Confirm Password">
            <span class="error"></span>
            <div class="signup-button">
                Create Account
            </div>
            <a class="text-link" href="../index.php"><span class="login">Log in</span></a>
        </div>
    </section>
</body>

</html>