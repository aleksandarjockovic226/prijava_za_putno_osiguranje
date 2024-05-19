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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $post_data = json_decode(file_get_contents("php://input"), true);

    require_once ("./utilities/helpers.php");
    require_once ("./utilities/insert_functions.php");

    $insurance_carrier_data = get_insura_insurance_carrier_data($post_data);
    $carrier_id = insert_insurance_carrier($insurance_carrier_data);

    if ($post_data['type_of_insurance_policy'] == 'grupno') {
        $additional_insured_data = get_additional_insured_data($post_data);
        $additional_insured_ids = insert_additional_insured($additional_insured_data);
    }

    $insurance_policy_data = get_insurance_policy_data($carrier_id, $post_data);
    $policy_id = insert_insurance_policy($insurance_policy_data);

    if ($post_data['type_of_insurance_policy'] == 'grupno') {
        insert_insurance_policy_additional_insured($policy_id, $additional_insured_ids);
    }

    echo "success";
} else {
    echo "Error: POST data not received.";
}