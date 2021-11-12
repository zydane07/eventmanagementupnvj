const currentLocation = location.href;
const menuItem = document.querySelectorAll(".nav__link");
const menuLength = menuItem.length;
for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className = "nav-link fw-bold nav__link active";
    }
}