var state = false;
function toggle2() {
    if (state) {
        document.getElementById("password1").setAttribute("type", "password");
        document.getElementById("eye1").style.color = "#008493";
        state = false;
    } else {
        document.getElementById("password1").setAttribute("type", "text");
        document.getElementById("eye1").style.color = "#2f4858";
        state = true;
    }
}
