<?php

function insert_insurance_carrier(array $data): int
{
    global $pdo;
    $query = "INSERT INTO insurance_carrier (
        full_name,
        date_of_birth,
        passport_number,
        phone,
        email
    ) VALUES (
        :full_name,
        :date_of_birth,
        :passport_number,
        :phone,
        :email
    )";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'full_name' => $data['full_name'],
        'date_of_birth' => $data['date_of_birth'],
        'passport_number' => $data['passport_number'],
        'phone' => $data['phone'],
        'email' => $data['email']
    ]);

    return $pdo->lastInsertId();
}

function insert_additional_insured(array $data): array
{
    global $pdo;
    $query = "INSERT INTO additional_insured (
        full_name,
        date_of_birth,
        passport_number
    ) VALUES (
        :full_name,
        :date_of_birth,
        :passport_number
    )";
    $stmt = $pdo->prepare($query);
    $insertedIds = [];

    foreach ($data as $insured) {
        $stmt->execute([
            'full_name' => $insured['full_name'],
            'date_of_birth' => $insured['date_of_birth'],
            'passport_number' => $insured['passport_number']
        ]);
        $insertedIds[] = $pdo->lastInsertId();
    }

    return $insertedIds;
}

function insert_insurance_policy(array $data): int
{
    global $pdo;
    $query = "INSERT INTO insurance_policy (
        insurance_carrier_id,
        insertion_date,
        date_of_travel_from,
        date_of_travel_to,
        number_of_days,
        type_of_insurance_policy
    ) VALUES (
        :insurance_carrier_id,
        :insertion_date,
        :date_of_travel_from,
        :date_of_travel_to,
        :number_of_days,
        :type_of_insurance_policy
    )";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'insurance_carrier_id' => $data['insurance_carrier_id'],
        'insertion_date' => date('Y-m-d'),
        'date_of_travel_from' => $data['date_of_travel_from'],
        'date_of_travel_to' => $data['date_of_travel_to'],
        'number_of_days' => $data['number_of_days'],
        'type_of_insurance_policy' => $data['type_of_insurance_policy']
    ]);

    return $pdo->lastInsertId();
}

function insert_insurance_policy_additional_insured(int $policyId, array $additionalInsuredIds): void
{
    global $pdo;
    $query = "INSERT INTO insurance_policy_additional_insured (
        insurance_policy_id,
        additional_insured_id
    ) VALUES (
        :insurance_policy_id,
        :additional_insured_id
    )";
    $stmt = $pdo->prepare($query);
    foreach ($additionalInsuredIds as $insuredId) {
        $stmt->execute([
            'insurance_policy_id' => $policyId,
            'additional_insured_id' => $insuredId
        ]);
    }
}