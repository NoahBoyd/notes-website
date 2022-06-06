<?php session_start();
?>
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
    <script src="../script/app.js"></script>
    <title>Notes Page</title>
</head>

<body>
    <?php
    if (!isset($_SESSION["username"])) { // if session doesnt exist (not logged in) display something

    ?>
        <div class="logged-out">
            <h1>Please Sign in to view list</h1>
            <a href="../index.php"><button>Login</button></a>
        </div>
    <?php
    } else { // if session does exist. Display something else. 

    ?>
        <section class="app-wrapper">
            <div class="sidebar-wrapper">
                <div class="sidebar-top">
                    <div class="create-button">
                        +
                    </div>
                    <span class="create-text">Create new</span>
                </div>
                <div class="sidebar-bottom">
                    <div class="sm-note-wrapper">
                        <div class="sm-note-top">
                            <div class="sm-note-title">
                                <span>Title Here</span>
                            </div>
                            <div class="sm-note-delete">
                                <img class="sm-trash-svg" src="../images/trash-white.svg" alt="">
                            </div>
                        </div>
                        <div class="sm-note-bottom">
                            <span>Body Here</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-wrapper">
                <div class="main-top">
                    <div class="main-top-header">
                        <div class="mobileBackButton">
                            <button class="backButton"><img src="../images/chevron-left.svg"> Notes</button>
                        </div>
                        <span class="main-header-title"><?php echo ucfirst($_SESSION["username"]); ?>'s Notepad</span>
                        <a id="logout-button" href="../server/logout.php">Logout</a>
                        <span class="hiddenUserID"><?php echo ucfirst($_SESSION["userid"]) ?></span>
                    </div>
                    <div class="main-top-body">
                        <div class="top-body-title">
                            <input class="title-input" type="text" placeholder="title...">
                        </div>

                        <div class="top-body-buttons">
                            <div class="save-button">
                                Save
                            </div>
                            <img class="lg-trash-svg" src="../images/trash-white.svg" alt="">
                        </div>
                    </div>
                </div>

                <div class="main-body">
                    <!-- <div class="main-body-note">

                </div> -->
                    <textarea class="note-textarea" name="note-text" id="note-text"></textarea>
                </div>
            </div>
        </section>
    <?php
    }
    ?>
</body>

</html>