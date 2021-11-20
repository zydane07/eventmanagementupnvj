const Mahasiswa = require("../Models/mahasiswa");
const Event = require("../Models/event");
exports.profile = async (req, res) => {
    try {
        //Mencari profile di database collection Mahasiswa email yang ada di cookie
        const profileMhs = await Mahasiswa.findOne({ email: req.user.email });
        if (!profileMhs) {
            return res.send({
                success: false,
                message: "User tidak ada",
            });
        } /*
    return res.status(200).send({
      success: true,
      data:{
        user:{
          email: profileMhs.email,
          nama_lengkap: profileMhs.nama_lengkap,
          tanggal_lahir: profileMhs.tanggal_lahir,
          Jenis_Kelamin: profileMhs.jenis_kelamin,
          nim: profileMhs.nim,
          prodi: profileMhs.prodi,
          fakultas: profileMhs.fakultas,
          angkatan: profileMhs.angkatan,
          no_hp:profileMhs.no_hp,
          photo: profileMhs.photo
        }
      }
    })*/
        const user = {
            email: profileMhs.email,
            nama_lengkap: profileMhs.nama_lengkap,
            tanggal_lahir: profileMhs.tanggal_lahir,
            Jenis_Kelamin: profileMhs.jenis_kelamin,
            nim: profileMhs.nim,
            prodi: profileMhs.prodi,
            fakultas: profileMhs.fakultas,
            angkatan: profileMhs.angkatan,
            no_hp: profileMhs.no_hp,
            photo: profileMhs.photo,
        };
        return res.render("profile", {
            layout: "layouts/main-layout",
            title: "Profile",
            css: "styleProfile",
            nama: req.user.nama,
            user,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: "Gagal load profile",
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userProfile = await Mahasiswa.findOne({ email: req.user.email });
        if (!userProfile) {
            return res.render("login", {
                layout: "layouts/login-layout",
                css: "styleLoginUser",
                title: "login",
                error: "User tidak ada, silahkan login kembali",
            });
        }
        await Mahasiswa.updateOne(
            { email: userProfile.email },
            {
                $set: {
                    nama_lengkap: req.body.nama,
                    nim: req.body.nim,
                    fakultas: req.body.fakultas,
                    prodi: req.body.prodi,
                    jenis_kelamin: req.body.jenis_kelamin,
                    tanggal_lahir: req.body.tgl_lahir,
                },
            }
        );
        return res.redirect("/profile");
    } catch (err) {
        const userProfile = await Mahasiswa.findOne({ email: req.user.email });
        if (!userProfile) {
            return res.render("login", {
                layout: "layouts/login-layout",
                css: "styleLoginUser",
                title: "login",
                error: "Terjadi kesalahan saat update, silahkan login kembali!",
            });
        }
    }
};

exports.eventSaya = async (req, res) => {
    const mhs = await Mahasiswa.findOne({ email: req.user.email });

    const ids = mhs.historyEvent.map((el) => el.id_event);

    const events = await Event.find({
        id_event: { $in: ids },
    });
    if (events.length === 0) {
        return res.render("eventsaya", {
            judul: "Event Saya",
            nama: req.user.nama,
            layout: "layouts/main-layout",
            title: "Event Saya",
            css: "styleDetail",
        });
    }
    return res.render("eventsaya", {
        judul: "Event Saya",
        nama: req.user.nama,
        layout: "layouts/main-layout",
        title: "Event Saya",
        css: "styleDetail",
        events,
    });
};

exports.eventWishSaya = async (req, res) => {
    const mhs = await Mahasiswa.findOne({ email: req.user.email });

    const ids = mhs.savedEvent.map((el) => el.id_event);

    const events = await Event.find({
        id_event: { $in: ids },
    });

    if (events.length === 0) {
        return res.render("wishlist", {
            judul: "Event Wishlist Saya",
            nama: req.user.nama,
            layout: "layouts/main-layout",
            title: "Event Saya",
            css: "styleDetail",
        });
    }
    return res.render("wishlist", {
        judul: "Event Wishlist Saya",
        nama: req.user.nama,
        layout: "layouts/main-layout",
        title: "Event Saya",
        css: "styleDetail",
        events,
    });
};
