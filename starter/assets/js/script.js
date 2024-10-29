const btnOpen = document.getElementById("show");
var show = 0;

const openModel = () => {
    if (show == 0) {
        btnOpen.style.display ="block"
        show = 1
        console.log("hhhhhh");
        

    }
    else {
        btnOpen.style.display = "none"
        show = 0
    }
 
    
}