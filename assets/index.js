(function () {
    const date_of_travel_from_input = document.getElementById('date_of_travel_from');
    const date_of_travel_to_input = document.getElementById('date_of_travel_to');

    init_show_number_of_days();

    [date_of_travel_from_input, date_of_travel_to_input].forEach((element) => {
        element.addEventListener('change', () => { init_show_number_of_days() });
    });
    date_of_travel_from_input.addEventListener('change', () => { date_of_travel_to_input.min = date_of_travel_from_input.value; });
    date_of_travel_to_input.addEventListener('change', () => { date_of_travel_from_input.max = date_of_travel_to_input.value; });

    const type_of_insurance_policy_select = document.getElementById('type_of_insurance_policy');
    const additional_insured_wrapper = document.getElementById('additional_insured_wrapper');

    init_additional_insured(type_of_insurance_policy_select);

    type_of_insurance_policy_select.addEventListener('change', () => { init_additional_insured(type_of_insurance_policy_select) });
    additional_insured_wrapper.addEventListener('click', (event) => { add_additional_insured(event) });
    additional_insured_wrapper.addEventListener('click', (event) => { remove_additional_insured(event) });

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

        return difference_in_days + 1;
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
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="form-group mt-3">
                <label for="date_of_birth_${index}">Datum rođenja</label>
                <input type="date" class="form-control" id="date_of_birth_${index}">
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="form-group mt-3">
                <label for="passport_number_${index}">Broj pasoša</label>
                <input type="text" class="form-control" id="passport_number_${index}">
            </div>
        </div row>
    </div>
</div>`
    };
})()