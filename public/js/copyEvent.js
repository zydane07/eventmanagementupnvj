$("#copy").on("click", function () {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
    toastr.success("Event Berhasil ditambahkan ke Wishlist", "Success");
    var audio = new Audio("sounds/notification.mp3");
    audio.play();
});
