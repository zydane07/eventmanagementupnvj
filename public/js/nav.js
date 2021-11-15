$('#aturakun').click(function () {
  var idx = $(this).closest('#aturakun').index();
  $('#prof').removeClass('active fw-bold nav__link')
  $(this).addClass('active fw-bold nav__link');
  $('#dprofile').hide();
  $('#dpengaturan').show();
});
$('#prof').click(function () {
  var idx = $(this).closest('#prof').index();
  $('#aturakun').removeClass('active fw-bold nav__link')
  $(this).addClass('active fw-bold nav__link');
  $('#dprofile').show();
  $('#dpengaturan').hide();
});