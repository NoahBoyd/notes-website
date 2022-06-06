<?php

// get parameters
$userid = filter_input(INPUT_GET, "userid", FILTER_SANITIZE_SPECIAL_CHARS);

$valid = true;

// result error codes (-1 invalid entries, 1 success, 0 db failure, -2 password is wrong)
$result = [];
if ($userid === "" || $userid === null) {
    $valid = false;
    $result = [-1];
}

include "connect.php";

if ($valid) {
    $command = "SELECT * FROM notes WHERE users_id = ?";
    $params = [$userid];
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($params);

    if ($success) {
        $notes = [];
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch()) {
                $noteID = $row['notes_id'];
                $noteTitle = $row['notes_title'];
                $noteBody = $row['notes_body'];
                $noteDate = $row['notes_date_created'];

                $note = [$noteID, $noteTitle, $noteBody, $noteDate];
                array_push($notes, $note);
            }
        } else {
            $result = [-1];
        }
        $result = [1];
    } else {
        $result = [-2];
    }
}

echo json_encode([$result, $notes]);
