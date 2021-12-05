const { date } = require("joi");
const mongoose = require("mongoose");

const ormawaSchema = mongoose.Schema({
    id_ormawa: {
        type: Number,
        required: true,
        unique: true,
    },
    email_ormawa: {
        type: String,
        required: true,
        unique: true,
    },
    nama_ormawa: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
    },
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
});

module.exports = mongoose.model("Ormawa", ormawaSchema);
