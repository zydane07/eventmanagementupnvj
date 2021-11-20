var state = false;
function toggle() {
    if (state) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye").style.color = "#008493";
        state = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eye").style.color = "#2f4858";
        state = true;
    }
}
