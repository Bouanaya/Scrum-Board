// validate button
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('demo-form');
    var submitButton = document.getElementById('submitBtn');

    form.addEventListener('input', function() {
        let allFilled = true;
        var inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (input.value === '') {
                allFilled = false;
                console.log("hhhhhhhhhhhh");
                return false;
            }
        });
        submitButton.disabled = !allFilled;
    });

    // Trigger the input event to check the initial state
    var event = new Event('input');
    form.dispatchEvent(event);
});

const btnOpen = document.getElementById("show");
var show = 0;

const openModel = () => {
    if (show == 0) {
        btnOpen.style.display ="block"
        show = 1
        
    }
    else {
        btnOpen.style.display = "none"
        show = 0
    }
 
    
}