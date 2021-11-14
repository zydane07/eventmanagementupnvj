$("#fakultas").on('change', function () {
  var el = $(this);
  if (el.val() === "Ilmu Komputer") {
      $("#prodi").empty();
      $("#prodi").append("<option>Informatika</option>");
      $("#prodi").append("<option>S1 Sistem Informasi</option>");
      $("#prodi").append("<option>D3 Sistem Informasi</option>");
  } else if (el.val() === "Teknik") {
      $("#prodi").empty();
      $("#prodi").append("<option>Mesin</option>");
      $("#prodi").append("<option>Industri</option>");
      $("#prodi").append("<option>Perkapalan</option>");
      $("#prodi").append("<option>Elektro</option>");
  } else if (el.val() === "Kedokteran") {
      $("#prodi").empty();
      $("#prodi").append("<option>Kedokteran</option>");
      $("#prodi").append("<option>Farmasi</option>");
      $("#prodi").append("<option>Pendidikan Profesi Dokter</option>");
  } else if (el.val() === "Ilmu Sosial dan Politik") {
      $("#prodi").empty();
      $("#prodi").append("<option>Ilmu Komunikasi</option>");
      $("#prodi").append("<option>Hubungan Internasional</option>");
      $("#prodi").append("<option>Ilmu Politik</option>");
  } else if (el.val() === "Hukum") {
      $("#prodi").empty();
      $("#prodi").append("<option>Hukum</option>");
  } else if (el.val() === "Ilmu Kesehatan") {
      $("#prodi").empty();
      $("#prodi").append("<option>D3 Keperawatan</option>");
      $("#prodi").append("<option>D3 Fisioterapi</option>");
      $("#prodi").append("<option>S1 Keperawatan</option>");
      $("#prodi").append("<option>Kesehatan Masyarakat</option>");
      $("#prodi").append("<option>Gizi</option>");
  } else if (el.val() === "Ekonomi dan Bisnis") {
      $("#prodi").empty();
      $("#prodi").append("<option>D3 Perbankan dan Keuangan</option>");
      $("#prodi").append("<option>D3 Akuntansi</option>");
      $("#prodi").append("<option>S1 Akuntansi</option>");
      $("#prodi").append("<option>Manajemen</option>");
      $("#prodi").append("<option>Ekonomi Pembangunan</option>");
      $("#prodi").append("<option>Ekonomi Syariah</option>");
  }
});