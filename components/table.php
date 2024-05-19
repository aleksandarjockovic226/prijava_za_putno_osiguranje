<?php
require_once ("./utilities/get_functions.php");
$insurance_policy = get_list();
?>

<section class="container-fluid mt-5">
    <?php if (sizeof($insurance_policy) > 0) { ?>
        <table class="table table-bordered" id="insurance_policy_table">
            <thead>
                <tr>
                    <th scope="col">Datum unosa polise</th>
                    <th scope="col">Ime i prezime nosioca</th>
                    <th scope="col">Datum rođenja</th>
                    <th scope="col">Broj pasoša</th>
                    <th scope="col">Email</th>
                    <th scope="col">Datum putovanja od</th>
                    <th scope="col">Datum putovanja do</th>
                    <th scope="col">Broj dana</th>
                    <th scope="col">Tip polise</th>
                    <th scope="col">Akcije</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($insurance_policy as $key => $insurance) { ?>
                    <tr class="parent-row">
                        <td><?= $insurance["insertion_date"]; ?></td>
                        <td><?= $insurance["carrier_name"]; ?></td>
                        <td><?= $insurance["carrier_date_of_birth"]; ?></td>
                        <td><?= $insurance["carrier_passport_number"]; ?></td>
                        <td><?= $insurance["carrier_email"]; ?></td>
                        <td><?= $insurance["date_of_travel_from"]; ?></td>
                        <td><?= $insurance["date_of_travel_to"]; ?></td>
                        <td><?= $insurance["number_of_days"]; ?></td>
                        <td><?= $insurance["type_of_insurance_policy"]; ?></td>
                        <td>
                            <?php if ($insurance["type_of_insurance_policy"] == "grupno" && isset($insurance["additional_insured"]) && sizeof($insurance["additional_insured"]) > 0) { ?>
                                <button type="button" class="btn btn-outline-primary btn-sm" data-key="<?= $key; ?>">Dodatna lica</button>
                            <?php } ?>
                        </td>
                    </tr>
                    <tr id="additional_insured_table_<?= $key; ?>" data-key="<?= $key; ?>" style="display: none;">
                        <td colspan="10">
                            <p>Dodatna lica na polisi:</p>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Ime i prezime</th>
                                        <th scope="col">Datum rođenja</th>
                                        <th scope="col">Broj pasoša</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (isset($insurance["additional_insured"]) && sizeof($insurance["additional_insured"]) > 0) {
                                        foreach ($insurance["additional_insured"] as $ai) { ?>
                                            <tr>
                                                <td><?= $ai["full_name"]; ?></td>
                                                <td><?= $ai["date_of_birth"]; ?></td>
                                                <td><?= $ai["passport_number"]; ?></td>
                                            </tr>
                                        <?php }
                                    } ?>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    <?php } else { ?>
        <p>Nema unetih polisa.</p>
    <?php } ?>
</section>