<?php

function connect_to_database(): PDO
{
    $dsn = 'mysql:host=' . getenv('MYSQL_HOST') . ';dbname=' . getenv('MYSQL_DATABASE');
    $username = getenv('MYSQL_USER');
    $password = getenv('MYSQL_PASSWORD');

    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        die();
    }
}
