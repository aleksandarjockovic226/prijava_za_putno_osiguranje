(function () {
    const additional_insured_wrapper = document.getElementById('additional_insured_wrapper');

    if (additional_insured_wrapper == null) {
        return false;
    }

    additional_insured_wrapper.addEventListener('click', (event) => { return add_additional_insured(event) });
    additional_insured_wrapper.addEventListener('click', (event) => { return remove_additional_insured(event) });

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

        const elements = document.querySelectorAll('.additional_insured');
        if (elements.length < 1) {
            document.getElementById('add_additional_insured').click();
        }
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