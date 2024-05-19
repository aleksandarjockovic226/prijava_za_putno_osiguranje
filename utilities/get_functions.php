<?php
require ("./utilities/database.php");
require ("./utilities/helpers.php");

$pdo = connect_to_database();

function get_list(): array
{
    $insucance_data = get_base_insurance_data();

    foreach ($insucance_data as &$insucance) {
        if ($insucance["type_of_insurance_policy"] == "grupno") {
            $insucance["additional_insured"] = get_additional_insured_data_by_policy_id((int) $insucance["id"]);
        }
    }

    return $insucance_data;
}

function get_base_insurance_data(): array
{
    global $pdo;
    $query = "SELECT p.*,
                     c.full_name AS carrier_name,
                     c.date_of_birth AS carrier_date_of_birth,
                     c.passport_number AS carrier_passport_number,
                     c.email AS carrier_email
              FROM insurance_policy AS p
              INNER JOIN insurance_carrier AS c
              ON p.insurance_carrier_id = c.id";
    $stmt = $pdo->query($query);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result ? process_base_insurance_data($result) : [];
}

function get_additional_insured_data_by_policy_id($policy_id): array
{
    global $pdo;

    $query = "SELECT ai.*
              FROM additional_insured AS ai
              INNER JOIN insurance_policy_additional_insured AS ipai
              ON ai.id = ipai.additional_insured_id
              WHERE ipai.insurance_policy_id = :policy_id";

    $stmt = $pdo->prepare($query);
    $stmt->execute(["policy_id" => $policy_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result ? process_additional_insured_data($result) : [];
}

function process_base_insurance_data(array $data): array
{
    foreach ($data as &$item) {
        $item["insertion_date"] = format_display_date($item["insertion_date"]);
        $item["carrier_date_of_birth"] = format_display_date($item["carrier_date_of_birth"]);
        $item["date_of_travel_from"] = format_display_date($item["date_of_travel_from"]);
        $item["date_of_travel_to"] = format_display_date($item["date_of_travel_to"]);
    }

    return $data;
}

function process_additional_insured_data(array $data): array
{
    foreach ($data as &$item) {
        $item["date_of_birth"] = format_display_date($item["date_of_birth"]);
    }

    return $data;
}