$("#bantuan, #ttg, #pengenalan").on("click", function () {
    toastr.error("Fitur masih dalam tahap pengembangan", "Warning");
    var audio = new Audio("/sounds/notification.mp3");
    audio.play();
});

$("#addwish, #daftar-event").on("click", function () {
    toastr.success("Event Berhasil ditambahkan ke Wishlist", "Success");
    var audio = new Audio("/sounds/notification.mp3");
    audio.play();
});
