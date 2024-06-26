<?php

function format_display_date(string $date): string
{
    $dateTime = DateTime::createFromFormat('Y-m-d', $date);
    if ($dateTime === false) {
        throw new Exception("Invalid date format: $date");
    }
    return $dateTime->format('d.m.Y.');
}

function get_insurance_carrier_data(array $post_data): array
{
    $data = [];
    $data["full_name"] = $post_data["full_name"];
    $data["date_of_birth"] = $post_data["date_of_birth"];
    $data["passport_number"] = $post_data["passport_number"];
    $data["phone"] = $post_data["phone"];
    $data["email"] = $post_data["email"];

    return $data;
}

function get_additional_insured_data(array $post_data): array
{
    $data = [];
    $data = $post_data['additional_insured'];

    return $data;
}

function get_insurance_policy_data(int $carrier_id, array $post_data): array
{
    $data = [];
    $data["insurance_carrier_id"] = $carrier_id;
    $data["date_of_travel_from"] = $post_data["date_of_travel_from"];
    $data["date_of_travel_to"] = $post_data["date_of_travel_to"];
    $data["number_of_days"] = $post_data["number_of_days"];
    $data["type_of_insurance_policy"] = $post_data["type_of_insurance_policy"];

    return $data;
}
