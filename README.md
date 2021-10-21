Langkah-langkah setelah pertama kali nge pull:
1. ke folder projek
2. buka terminal, ketik npm i (buat nge install semua module yang ada di package.json)
3. Kalo gagal, pastiin udh donlod dan install nodejs yg bener.

Cara ngejalaninnya:
1. Buka terminal
2. ketik npm run start
3. buka di browser localhost:3000


FOLDER BUAT BACK END:

1. SRC:
 
  1.1. Controller
      Tempat proses data terjadi, contohnya, ngambil data dari database atau ngirim data ke database dsb.

  1.2. Models
      Folder bikin schema database disini 

  1.3. Routes
      Nentuin proses apa yang bakal terjadi untuk tiap page url.
  
  1.4. ValidationModel
      Ngevalidasi data yang dikirim Client / User nanti, kalo engga sesuai sama yang diminta, Bisa
      dibikin error.