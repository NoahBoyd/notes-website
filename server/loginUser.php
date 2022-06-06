<?php

// get parameters
$username = filter_input(INPUT_GET, "username", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);

$valid = true;
$passwordsMatch = false;
// result error codes (-1 user doesnt exist, 1 success, 0 db failure, -2 password is wrong)
$result = [];
if ($username === "" || $username === null || $password === "" || $password === null) {
    $valid = false;
    $result = [-1];

}

include "connect.php";

if ($valid) {
    $command = "SELECT * FROM users WHERE users_name = ?";
    $params = [$username];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {

        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch()) {
                $hash = $row['users_password']; // hashed pw from db
                $userid = $row['users_id'];

                // if password entered matches hashed pw from db
                if (password_verify($password, $hash)) {
                    $passwordsMatch = true;
                    $result = [1];
                    // start session and save user details
                    session_start();
                    $_SESSION['username'] = $username;
                    $_SESSION['userid'] = $userid;
                } else {
                    $result = [-2];
                }
            }
        } else {
            $result = [-1];
        }
    }
}

echo json_encode($result);
