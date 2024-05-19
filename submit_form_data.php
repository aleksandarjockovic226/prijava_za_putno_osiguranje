<?php
$dsn = 'mysql:host=' . getenv('MYSQL_HOST') . ';dbname=' . getenv('MYSQL_DATABASE');
$username = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    die();
}

// $stmt = $pdo->query('SELECT DATABASE()');
// $row = $stmt->fetch(PDO::FETCH_ASSOC);

// print_r($row);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $postData = json_decode(file_get_contents("php://input"), true);

    echo "Received POST data:\n";
    print_r($postData);
} else {
    echo "Error: POST data not received.";
}