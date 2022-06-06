<?php

try {
    $dbh = new PDO("mysql:host=localhost;dbname=u329623402_notesDB", "u329623402_nwboyd", "Password1");
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
