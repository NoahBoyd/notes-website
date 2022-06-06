<?php

// get parameters
$userid = filter_input(INPUT_GET, "userid", FILTER_SANITIZE_SPECIAL_CHARS);
$noteTitle = filter_input(INPUT_GET, "noteTitle", FILTER_SANITIZE_SPECIAL_CHARS);
$noteBody = filter_input(INPUT_GET, "noteBody", FILTER_SANITIZE_SPECIAL_CHARS);
$noteDate = filter_input(INPUT_GET, "noteDate", FILTER_SANITIZE_SPECIAL_CHARS);

$valid = true;

// result error codes (-1 invalid entries, 1 success, 0 db failure, -2 password is wrong)
$result = [];
if ($userid === "" || $userid === null || $noteTitle === "" || $noteTitle === null || $noteBody === "" || $noteBody === null || $noteDate === "" || $noteDate === null) {
    $valid = false;
    $result = [-1];
}

include "connect.php";

if ($valid) {
    $command = "INSERT INTO notes (users_id, notes_title, notes_body, notes_date_created) VALUES (?, ?, ?, ?)";
    $params = [$userid, $noteTitle, $noteBody, $noteDate];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {
        $result = [1];
    } else {
        $result = [-2];
    }
}

echo json_encode($result);
