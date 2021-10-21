Langkah-langkah setelah pertama kali nge pull:
1. ke folder projek
2. buka terminal, ketik npm i (buat nge install semua module yang ada di package.json)
3. Kalo gagal, pastiin udh donlod dan install nodejs yg bener.

Cara ngejalaninnya:
1. Buka terminal
2. ketik npm run start
3. buka di browser localhost:3000


FOLDER BUAT FRONT END:

1) VIEWS: <br>
  Tempat content tiap halaman website dan layoutnya, 
  contoh: isi content dari page / halaman index dan profil ada di folder ini.

    1.1) Layouts
      Ada dua folder dan satu File:
      1) Component, isinya itu component yang selalu ada di tiap page / halaman website. <br>
        Contoh: Navbar, footer, script (script untuk tiap halaman) selalu sama.

      2)Pages, isi dari page atau content dari page. <br>
        Contoh: Untuk saat ini ada dua folder, homepage dan profil. Isi dari masing-masing folder itu content 
                untuk page tersebut.

      3)Main-Layout.ejs, Layout website kita / kerangka website kita, kalo diliat, itu yang bakal keganti <br>
        <% body %> nya doang. 

2) Public <br>
  Tempat css, icons, img, js, sounds.

3) SRC > ROUTES > routers.js <br>
  Tempat buat ngerender halaman atau page website kita di url tertentu. Bisa diliat dibawah ada contoh


FOLDER BUAT BACK END:
<br>
1) SRC:
 
  1.1) Controller<br>
      Tempat proses data terjadi, contohnya, ngambil data dari database atau ngirim data ke database dsb.

  1.2) Models<br>
      Folder bikin schema database disini 

  1.3) Routes<br>
      Nentuin proses apa yang bakal terjadi untuk tiap page url.
  
  1.4) ValidationModel<br>
      Ngevalidasi data yang dikirim Client / User nanti, kalo engga sesuai sama yang diminta, Bisa
      dibikin error.
