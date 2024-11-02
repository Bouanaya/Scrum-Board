// validate button
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('demo-form');
    const submitButton = document.getElementById('submitBtn');
    const ubdatebtn = document.querySelector("#ubdatebtn")


    form.addEventListener('input', function () {
        let allFilled = true;
        const inputs = form.querySelectorAll('.botn');
        inputs.forEach(function (input) {
            if (input.value === '') {
                allFilled = false;
                return false;
            }
        });
        submitButton.disabled = !allFilled;
        ubdatebtn.disabled = !allFilled;

    });




});

