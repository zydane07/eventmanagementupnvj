$("#detail, #detail2, #detail3").on("click", function () {
  toastr.error("Fitur masih dalam tahap pengembangan", "Warning");
  var audio = new Audio("sounds/notification.mp3");
  audio.play();
});