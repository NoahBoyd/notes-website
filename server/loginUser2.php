<?php


include "connect.php";
$valid = true;
if ($valid) {
    $command = "SELECT * FROM users";
    $params = [];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute();

    if ($success) {
    $users = [];
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch()) {
                $userid = $row['users_id'];
                array_push($users, $userid);
            }
        } else {
            $result = [-1];
        }
    }
}

echo json_encode($users);
