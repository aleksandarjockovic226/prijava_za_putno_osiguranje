(function () {
    const insurance_policy_table = document.getElementById('insurance_policy_table');
    if (insurance_policy_table) {
        insurance_policy_table.addEventListener('click', (event) => { show_hide_additional_insured(event) });
    }

    const full_name_input = document.getElementById('full_name');
    const date_of_birth_input = document.getElementById('date_of_birth');
    const passport_number_input = document.getElementById('passport_number');
    const phone_input = document.getElementById('phone');
    const email_input = document.getElementById('email');

    const submit_form_button = document.getElementById('submit_form');
    if (submit_form_button) {
        submit_form_button.addEventListener('click', () => { submit_form() });
    }

    const date_of_travel_from_input = document.getElementById('date_of_travel_from');
    const date_of_travel_to_input = document.getElementById('date_of_travel_to');
    if (date_of_travel_from_input && date_of_travel_to_input) {
        init_show_number_of_days();

        [date_of_travel_from_input, date_of_travel_to_input].forEach((element) => {
            element.addEventListener('change', () => { init_show_number_of_days() });
        });
        date_of_travel_from_input.addEventListener('change', () => { date_of_travel_to_input.min = date_of_travel_from_input.value; });
        date_of_travel_to_input.addEventListener('change', () => { date_of_travel_from_input.max = date_of_travel_to_input.value; });
    }

    const type_of_insurance_policy_select = document.getElementById('type_of_insurance_policy');
    const additional_insured_wrapper = document.getElementById('additional_insured_wrapper');
    if (type_of_insurance_policy_select && additional_insured_wrapper) {
        init_additional_insured(type_of_insurance_policy_select);

        type_of_insurance_policy_select.addEventListener('change', () => { init_additional_insured(type_of_insurance_policy_select) });
        additional_insured_wrapper.addEventListener('click', (event) => { add_additional_insured(event) });
        additional_insured_wrapper.addEventListener('click', (event) => { remove_additional_insured(event) });
    }

    function show_hide_additional_insured(event) {
        if (!event.target.hasAttribute('data-key')) {
            return false;
        }

        const button = event.target;
        const key = button.getAttribute('data-key');
        const table = document.getElementById(`additional_insured_table_${key}`);

        table.style.display = table.style.display === 'none' ? 'table-row' : 'none';
    }

    function init_additional_insured(select_element) {
        if (select_element.options[select_element.options.selectedIndex].value === 'grupno') {
            const additional_insured_rows = document.querySelectorAll('.additional_insured');
            if (additional_insured_rows.length < 1) {
                document.getElementById('add_additional_insured').click();
            }

            additional_insured_wrapper.style.display = 'block';
        } else {
            additional_insured_wrapper.style.display = 'none';
        }
    }

    function add_additional_insured(event) {
        if (event.target.getAttribute('id') !== 'add_additional_insured') {
            return false;
        }

        const elements = document.querySelectorAll('.additional_insured');
        let maxIndex = 0;

        elements.forEach(element => {
            const index = parseInt(element.getAttribute('data-index'));
            if (index > maxIndex) {
                maxIndex = index;
            }
        });

        const newIndex = maxIndex + 1;
        const new_element = additional_insured_template(newIndex);
        const additional_insured_list = document.getElementById('additional_insured_list');

        additional_insured_list.innerHTML += new_element;
    }

    function remove_additional_insured(event) {
        if (event.target.getAttribute('id') !== 'remove_additional_insured') {
            return false;
        }

        const target_index = event.target.getAttribute('data-target_index');
        const element_for_removal = document.querySelector(`[data-index="${target_index}"]`)
        if (!element_for_removal) {
            return false
        }

        element_for_removal.remove();

        const additional_insured_rows = document.querySelectorAll('.additional_insured');
        if (additional_insured_rows.length < 1) {
            document.getElementById('add_additional_insured').click();
        }
    }

    function get_additional_insuted_data() {
        let data = [];

        const additional_insured_rows = document.querySelectorAll('.additional_insured');
        additional_insured_rows.forEach(element => {
            let ai_data = {};

            const index = parseInt(element.getAttribute('data-index'));

            const ai_full_name = document.getElementById(`full_name_${index}`);
            const ai_date_of_birth = document.getElementById(`date_of_birth_${index}`);
            const ai_passport_number = document.getElementById(`passport_number_${index}`);

            const required_fields = [ai_full_name, ai_date_of_birth, ai_passport_number];

            validate_required_fields(required_fields);

            ai_data.full_name = ai_full_name.value.trim();
            ai_data.date_of_birth = ai_date_of_birth.value.trim();
            ai_data.passport_number = ai_passport_number.value.trim();

            data.push(ai_data);
        });

        return data;
    }

    function init_show_number_of_days() {
        const number_of_days = calculate_number_of_days(date_of_travel_from_input.value, date_of_travel_to_input.value);
        const text = number_of_days > 0 ? `Broj dana: ${number_of_days}.` : '';

        document.querySelector('.numebr_of_days').innerText = text;
    }

    function calculate_number_of_days(date_from, date_to) {
        let from = new Date(date_from);
        let to = new Date(date_to);

        let difference_in_time = to.getTime() - from.getTime();
        let difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));

        return difference_in_days >= 0 ? difference_in_days + 1 : 0;
    }

    function validate_required_fields(required_fields) {
        required_fields.forEach(element => {
            let error_message = ''

            const value = element.value.trim();

            if (value == "") {
                element.classList.add("is-invalid");
                error_message = 'Ovo polje je obavezno.';
            } else {
                element.classList.remove("is-invalid");
            }

            const error_message_holder = get_sibling(element, '.error_message');
            error_message_holder.innerText = error_message;
        });
    }

    function validate_email_field(email_field) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        let error_message = ''

        const value = email_field.value.trim();

        if (value == "") {
            email_field.classList.add("is-invalid");
            error_message = 'Ovo polje je obavezno.';
        } else if (!value.match(regex)) {
            email_field.classList.add("is-invalid");
            error_message = 'Unesite validan email.';
        } else {
            email_field.classList.remove("is-invalid");
        }

        const error_message_holder = get_sibling(email_field, '.error_message');
        error_message_holder.innerText = error_message;
    }

    function get_sibling(element, sibling_selector) {
        var parent = element.parentNode;
        var siblings = parent.children;

        for (var i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) continue;

            if (siblings[i].matches(sibling_selector)) {
                return siblings[i];
            }
        }

        return null;
    }

    function send_request(url, method, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("Request failed with status: " + xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify(data));
    }

    function submit_form() {
        let data = {};

        const required_fields = [
            full_name_input,
            date_of_birth_input,
            passport_number_input,
            email_input,
            date_of_travel_from_input,
            date_of_travel_to_input
        ];

        validate_required_fields(required_fields);
        validate_email_field(email_input);

        data.full_name = full_name_input.value.trim();
        data.date_of_birth = date_of_birth_input.value.trim();
        data.passport_number = passport_number_input.value.trim();
        data.phone = phone_input.value.trim();
        data.email = email_input.value.trim();
        data.date_of_travel_from = date_of_travel_from_input.value.trim();
        data.date_of_travel_to = date_of_travel_to_input.value.trim();
        data.number_of_days = calculate_number_of_days(data.date_of_travel_from, data.date_of_travel_to);
        data.type_of_insurance_policy = type_of_insurance_policy_select.options[type_of_insurance_policy_select.options.selectedIndex].value.trim();

        if (data.type_of_insurance_policy === 'grupno') {
            data.additional_insured = get_additional_insuted_data();
        }

        const invalid_fields = document.querySelectorAll('.is-invalid');

        if (invalid_fields.length > 0) {
            return false;
        }

        const form_element = document.getElementById('form');
        const form_action = form_element.getAttribute('action');
        const form_method = form_element.getAttribute('method');

        send_request(form_action, form_method, data, function (err, response) {
            if (err) {
                console.error("Error:", err);
            } else {
                if (response == "success") {
                    alert("Podaci uneti u bazu!");
                }
            }
        });
    }

    const additional_insured_template = (index) => {
        return `<div class="additional_insured p-2" data-index="${index}">
    <div class="row">
        <div class="col-sm-2">
            <div class="form-group mt-3 d-grid">
                <button type="button" id="remove_additional_insured" data-target_index="${index}" class="btn btn-danger mt-4">Ukloni</button>
            </div>
        </div>

        <div class="col-sm-10 col-lg-4">
            <div class="form-group mt-3">
                <div>
                    <label for="full_name_${index}">Ime i Prezime</label>
                    <input type="text" class="form-control" id="full_name_${index}">
                    <p class="error_message"></p>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="form-group mt-3">
                <label for="date_of_birth_${index}">Datum rođenja</label>
                <input type="date" class="form-control" id="date_of_birth_${index}">
                <p class="error_message"></p>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="form-group mt-3">
                <label for="passport_number_${index}">Broj pasoša</label>
                <input type="text" class="form-control" id="passport_number_${index}">
                <p class="error_message"></p>
            </div>
        </div row>
    </div>
</div>`
    };
})();