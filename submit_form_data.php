<?php
require ("./utilities/database.php");

$pdo = connect_to_database();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $post_data = json_decode(file_get_contents("php://input"), true);

    require ("./utilities/helpers.php");
    require_once ("./utilities/insert_functions.php");

    $insurance_carrier_data = get_insurance_carrier_data($post_data);
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
