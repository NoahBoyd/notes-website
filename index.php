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
    <link rel="stylesheet" href="style/styles.css">
    <script src="script/login.js"></script>
    <title>Login Page</title>
</head>

<body>
    <section class="login-page">
        <div class="login-wrapper">
            <h1>Welcome</h1>
            <input id="login-user-name" class="login-input" type="text" placeholder="Username">
            <input id="login-user-password" class="login-input" type="password" placeholder="Password">
            <span class="error"></span>
            <div class="login-button">
                Login
            </div>
            <a class="text-link" href="./pages/signup.php"><span class="signup">Sign me up!</span></a>
        </div>
    </section>
</body>

</html>