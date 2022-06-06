<?php

// get parameters
$userEmail = filter_input(INPUT_GET, "userEmail", FILTER_SANITIZE_EMAIL);
$username = filter_input(INPUT_GET, "userName", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "userPassword", FILTER_SANITIZE_SPECIAL_CHARS);


$valid = true;
$passwordsMatch = false;
// result error codes (-1 input invalid, 1 success, 0 db failure, -2 username already exists)
$result = [];
if ($userEmail === "" || $userEmail === null || $username === "" || $username === null || $password === "" || $password === null) {
    $valid = false;
    $result = [-1];
}

include "connect.php";
$userTaken = false;
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if ($valid) {
    // check if username already exists in database
    $command = "SELECT * FROM users WHERE users_name = ?";
    $params = [$username];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {

        if ($stmt->fetch()) {
            $userTaken = true;
            $result = [-2];
        }
    } else {
        $result = [-3];
    }

    // if username is available
    if ($userTaken === false) {
        $command = "INSERT INTO users (users_email, users_name, users_password) VALUES (?, ?, ?)";
        $params = [$userEmail, $username, $hashedPassword];
        $stmt = $dbh->prepare($command);

        $success2 = $stmt->execute($params);


        if ($success2) {
            $result = [1];
        } else {
            $result = [0];
        }
    } else {
        $result = [-1];
    }
}


echo json_encode($result);
