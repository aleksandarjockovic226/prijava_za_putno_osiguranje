<section class="container mt-5">
    <div class="row">
        <div class="col-sm-12 col-lg-8">
            <form>
                <div class="insurance_carrier">
                    <h1>Nosilac osiguranja</h1>

                    <div class="form-group mt-3">
                        <label for="full_name">Ime i Prezime*</label>
                        <input type="text" class="form-control" id="full_name">
                    </div>

                    <div class="form-group mt-3">
                        <label for="date_of_birth">Datum rođenja*</label>
                        <input type="date" class="form-control" id="date_of_birth">
                    </div>

                    <div class="form-group mt-3">
                        <label for="passport_number">Broj pasoša*</label>
                        <input type="text" class="form-control" id="passport_number">
                    </div>

                    <div class="form-group mt-3">
                        <label for="phone">Telefon</label>
                        <input type="tel" class="form-control" id="phone">
                    </div>

                    <div class="form-group mt-3">
                        <label for="email">Email*</label>
                        <input type="email" class="form-control" id="email">
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group mt-3">
                            <label for="date_of_travel_from">Datum putovanja Od*</label>
                            <input type="date" class="form-control" id="date_of_travel_from">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group mt-3">
                            <label for="date_of_travel_to">Datum putovanja Do*</label>
                            <input type="date" class="form-control" id="date_of_travel_to">
                        </div>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <label for="type_of_insurance policy">Vrsta polise osiguranja</label>
                    <select class="form-control" id="type_of_insurance policy">
                        <option value"">Odaberite</option>
                        <option value"individualno">Individualno</option>
                        <option value"grupno">Grupno</option>
                    </select>
                </div>

                <div id="additional_insured_wrapper">
                    <div class="d-flex justify-content-between">
                        <h4 class="mt-3">Dodatna lica na polisi</h4>
                        <button type="button" id="add_additional_insured" class="btn btn-outline-success btn-sm self-right my-3">Dodavanje dodatnih
                            osiguranika</button>
                    </div>


                    <div id="additional_insured_list">

                    </div>
                </div>

                <button type="button" class="btn btn-primary mt-5">Prosledi</button>
            </form>
        </div>
    </div>
</section>