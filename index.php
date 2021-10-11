<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Dashboard</title>
</head>

<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white nav-font my-shadow pt-3 pb-3">
        <div class="container">
            <a class="navbar-brand pe-5" href="#">Navbar w/ text</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item pe-3">
                        <a class="nav-link active fw-bold nav__link" aria-current="page" href="#">Beranda</a>
                    </li>
                    <li class="nav-item pe-3">
                        <a class="nav-link" href="#">Bantuan</a>
                    </li>
                    <li class="nav-item pe-3">
                        <a class="nav-link" href="#">Tentang Aplikasi</a>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item d-flex align-items-center">
                        <div class="text-center">
                            <img src="icons/Bell.svg" class="pe-3" alt="notifikasi">
                        </div>
                    </li>
                    <li class="nav-item d-flex align-items-center">
                        <div class="text-center">
                            <img src="img/profil 1.png" class="rounded nav-pict" alt="photo profil">
                        </div>
                    </li>
                    <li class="nav-item dropdown ps-1">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Mohamad Zydane Ulir Rizqi Toyyibi
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Event Saya</a></li>
                            <li><a class="dropdown-item" href="#">Lihat Sertifikat</a></li>
                            <li><a class="dropdown-item" href="#">Keluar</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Jumbotron -->
    <div class="jumbotron jumbotron-fluid bg-image bg-info">
        <div class="container pt-5 pb-5">
            <h1 class="head-font text-white">Hi, Mohamad Zydane!</h1>
            <p class="p-font text-white">Selamat datang di Sistem Informasi Event Management ORMAWA dan Mahasiswa</p>
            <p class="p-font mb-4 text-white">UPN Veteran Jakarta. Ikuti event-event menarik yang dapat mengembangkan skillmu.</p>
            <a class="btn btn-custom mb-4" href="#" role="button">Pengenalan Aplikasi</a>
        </div>
    </div>

    <!-- search button -->
    <div class="container">
        <div class="box mt-4">
            <form action="">
                <input type="text" placeholder="Cari event yang ingin kamu ikuti...">
                <select name="" id="">
                    <option value="">Webinar</option>
                    <option value="">Workshop</option>
                    <option value="">Lomba</option>
                    <option value="">Lainnya</option>
                </select>
                <input type="submit" value="Cari">
            </form>
        </div>
    </div>



    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>



</body>

</html>