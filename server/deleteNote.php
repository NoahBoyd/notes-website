<?php

// get parameters
$userid = filter_input(INPUT_GET, "userid", FILTER_SANITIZE_SPECIAL_CHARS);
$noteid = filter_input(INPUT_GET, "noteid", FILTER_SANITIZE_SPECIAL_CHARS);

$valid = true;

// result error codes (-1 invalid entries, 1 success, 0 db failure, -2 password is wrong)
$result = [];
if ($userid === "" || $userid === null || $noteid === "" || $noteid === null) {
    $valid = false;
    $result = [-1];
}

include "connect.php";

if ($valid) {
    $command = "DELETE FROM notes WHERE users_id = ? AND notes_id = ?";
    $params = [$userid, $noteid];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {
        $result = [1];
    } else {
        $result = [-2];
    }
}

echo json_encode($result);
