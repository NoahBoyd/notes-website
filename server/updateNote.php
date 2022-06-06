<?php

// get parameters
$userid = filter_input(INPUT_GET, "userid", FILTER_SANITIZE_SPECIAL_CHARS);
$noteid = filter_input(INPUT_GET, "noteid", FILTER_SANITIZE_SPECIAL_CHARS);
$noteTitle = filter_input(INPUT_GET, "noteTitle", FILTER_SANITIZE_SPECIAL_CHARS);
$noteBody = filter_input(INPUT_GET, "noteBody", FILTER_SANITIZE_SPECIAL_CHARS);
$noteDate = filter_input(INPUT_GET, "noteDate", FILTER_SANITIZE_SPECIAL_CHARS);

$valid = true;

// result error codes (-1 invalid entries, 1 success, 0 db failure, -2 password is wrong)
$result = [];
if ($userid === "" || $userid === null || $noteTitle === "" || $noteTitle === null ||  $noteDate === "" || $noteDate === null ||  $noteid === "" || $noteid === null ||  $noteBody === "" || $noteBody === null) {
    $valid = false;
    $result = [-1];
}

include "connect.php";

if ($valid) {
    $command = "UPDATE notes SET notes_title = ?, notes_body = ?, notes_date_created = ? WHERE users_id = ? AND notes_id = ?";
    $params = [$noteTitle, $noteBody, $noteDate, $userid, $noteid];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {
        $result = [1];
    } else {
        $result = [-2];
    }
}
// $result = [$userid, $noteid, $noteTitle, $noteBody, $noteDate];

echo json_encode($result);
