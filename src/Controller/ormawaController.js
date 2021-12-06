const Event = require("../Models/event");
const valEvent = require("../ValidationModel/createEventVal");
const { customAlphabet } = require("nanoid");
const { model } = require("mongoose");
const Ormawa = require("../Models/ormawa");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

exports.createEvent = async (req, res) => {
    try {
        const { nama_event, kategori, tanggal_event, deskripsi_event, benefits } = req.body;
        const result = valEvent.validate(req.body);
        if (result.error) {
            /*
      return res.status(400).send({
        success: false,
        message: result.error.details[0].message
      });*/
            return res.status(400).send({
                success: false,
                message: result.error.details[0].message,
            });
        }

        const ormawa = await Ormawa.findOne({ nama_ormawa: req.user.nama });
        if (!ormawa) {
            return res.status(400).send({
                success: false,
                message: "Detail ormawa tidak ditemukan, coba lagi",
            });
        }

        const resultPhoto = await cloudinary.uploader.upload(req.file.path);
        const token = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 7); // create 7 digit token
        model.id = token();
        await new Event({
            id_event: model.id,
            nama_event,
            kategori,
            tanggal_event,
            detil_eo: ormawa.id_ormawa,
            deskripsi_event,
            benefits,
            isVerified: false,
            "photo.avatar": resultPhoto.secure_url,
            "photo.cloudinary_id": resultPhoto.public_id,
        }).save();
        return res.redirect("/event-ormawa");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.pengaturanOrmawa = async (req, res) => {
    const dataEo = await Ormawa.findOne({ nama_ormawa: req.user.nama });
    if (!dataEo) {
        return res.send({
            message: "Akun tidak valid",
        });
    }

    return res.render("pengaturanOrmawa-ormawa", {
        layout: "layouts/dashboardOrmawa-layout",
        css: "dashboard",
        title: "Pengaturan Akun Ormawa",
        dataEo,
    });
};

exports.editPengaturanOrmawa = async (req, res) => {
    const dataEo = await Ormawa.findOne({ nama_ormawa: req.user.nama });
    if (!dataEo) {
        return res.send({
            message: "Akun tidak valid",
        });
    }
    if (dataEo.photo.cloudinary_id !== "nxpkjd0hoqt4cekpg9xa") {
        await cloudinary.uploader.destroy(dataEo.photo.cloudinary_id);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    await Ormawa.updateOne(
        { email_ormawa: dataEo.email_ormawa },
        {
            $set: {
                deskripsi: req.body.deskripsi,
                "photo.avatar": result.secure_url || userProfile.photo.avatar,
                "photo.cloudinary_id": result.public_id || userProfile.photo.cloudinary_id,
                "photo.path": req.file.path,
            },
        }
    );
    return res.redirect("/PerngaturanAkun-ormawa");
};
