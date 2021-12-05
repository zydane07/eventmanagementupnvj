const mongoose = require("mongoose");

const savedEvent = mongoose.Schema({
    id_event: String,
});

const historyEvent = mongoose.Schema({
    id_event: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const mahasiswaSchema = mongoose.Schema({
    email: String,
    nama_lengkap: String,
    password: String,
    no_hp: String,
    jenis_kelamin: String,
    tanggal_lahir: Date,
    nim: String,
    fakultas: String,
    prodi: String,
    angkatan: String,
    photo: {
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dz1q2dbty/image/upload/v1637467460/nxpkjd0hoqt4cekpg9xa.png",
        },
        cloudinary_id: {
            type: String,
            default: "nxpkjd0hoqt4cekpg9xa",
        },
        path: {
            type: String,
            default: "/img/PP/DefaultPhoto.png",
        },
    },
    isVerified: Boolean,
    savedEvent: {
        type: [savedEvent],
        require: false,
    },
    historyEvent: [historyEvent],
});

module.exports = mongoose.model("Mahasiswa", mahasiswaSchema);
