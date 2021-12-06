const bcrypt = require("bcrypt");
const Ormawa = require("../Models/ormawa");
const Mahasiswa = require("../Models/mahasiswa");
const Event = require("../Models/event");
const valRegis = require("../ValidationModel/registerValOrmawa");
const valLogin = require("../ValidationModel/loginVal");
const LandingPage = require("../Models/landingPage");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Nodemailer/sendEmail");
const { customAlphabet } = require("nanoid");
const { model } = require("mongoose");

exports.register = async (req, res) => {
    try {
        const { email_ormawa, nama_ormawa, password, repassword } = req.body;
        const result = valRegis.validate(req.body);
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

        //Check apakah email ormawa sudah ada
        const checkDB = await Ormawa.findOne({ email_ormawa });
        if (checkDB) {
            return res.status(400).send({
                success: false,
                message: "Email sudah dipakai",
            });
        }
        if (password !== repassword) {
            return res.status(400).send({
                success: false,
                message: "Password dan Konfirm Password tidak sama!",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const token = customAlphabet("1234567890", 4); // create 4 digit token
        model.id = token();
        const newOrmawa = await new Ormawa({
            id_ormawa: model.id,
            email_ormawa,
            nama_ormawa,
            password: hashPassword,
        }).save();
        const message = `
      
        <h1>Registrasi berhasil!</h1>
        <p>Akun Ormawa berhasil dibuat! Silahkan login menggunakan email dan password berikut:</p>
        <p style="font-size: 24px;">Email: <strong>${newOrmawa.email_ormawa}</strong></p>
        <p style="font-size: 24px;">Password: <strong>${password}</strong></p>
      
    `;
        await sendEmail(process.env.TEST_GMAIL, "Register Ormawa", message);

        return res.redirect("/pengguna-ormawa");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.login = async (req, res) => {
    try {
        //Menerima input email dan password kemudian divalidasi
        const { email, password } = req.body;
        const result = valLogin.validate(req.body);
        let role = "admin";
        if (result.error) {
            return res.status(400).send({
                success: false,
                message: result.error.details[0].message,
            });
            /*
      return res.render("login-admin", {
        layout: "layouts/loginadmin-layout",
        css: "login",
        title: "login admin",
    });*/
        }
        //Cek apakah akun admin valid
        const checkPass = await bcrypt.compare(password, process.env.ADMIN_BPASS);

        if (email !== process.env.ADMIN_GMAIL || !checkPass) {
            return res.status(404).send({
                success: false,
                message: "User dengan email tersebut tidak ada!",
            });
            /*

      return res.render("login-admin", {
        layout: "layouts/loginadmin-layout",
        css: "login",
        title: "login admin",
    });*/
        }

        //Check apakah akun sudah verified, jika belum akan disuruh untuk verifikasi terlebih dahulu

        //Bikin jsonwebtoken, kemudian disimpen di Cookie browser sebagai autentikasi nantinya.
        const payload = { email, role };
        const tokenUser = jwt.sign(payload, process.env.SECRET_KEY);
        res.cookie("dataUser", tokenUser);

        return res.redirect("/dashboard-admin");
    } catch (err) {
        // console.log(process.env.ADMIN_BPASS);
        return res.status(400).send({
            success: false,
            message: `test ${err}`,
        });
        /*
    return res.render("login-admin", {
      layout: "layouts/loginadmin-layout",
      css: "login",
      title: "login admin",
  });*/
    }
};

exports.dashboardAdmin = async (req, res) => {
    try {
        const jumlahMhs = await Mahasiswa.countDocuments({});
        const jumlahOrm = await Ormawa.countDocuments({});
        const jumlahEvent2 = await Event.aggregate([
            { $limit: 4 },

            {
                $lookup: {
                    from: "ormawas",
                    localField: "detil_eo",
                    foreignField: "id_ormawa",
                    as: "ormawa",
                },
            },
            {
                $addFields: {
                    detil_eo: { $arrayElemAt: ["$ormawa.nama_ormawa", 0] },
                },
            },
            { $sort: { _id: -1 } },
        ]);

        const data = await Event.aggregate([
            {
                $unwind: {
                    path: "$registered_people",
                },
            },
            {
                $facet: {
                    Webinar: [
                        // Filter by id meet and status present
                        { $match: { kategori: "Webinar" } },
                        { $count: "Webinar" },
                    ],
                    Workshop: [
                        // Filter by id meet and status absent
                        { $match: { kategori: "Workshop" } },
                        { $count: "Workshop" },
                    ],
                    Lomba: [
                        // Filter by id meet and status permission
                        { $match: { kategori: "Lomba" } },
                        { $count: "Lomba" },
                    ],
                    Lainnya: [
                        // Filter by id meet and status permission
                        { $match: { kategori: "Lainnya" } },
                        { $count: "Lainnya" },
                    ],
                },
            },
            {
                $project: {
                    // data output (if status null, set to 0)
                    Webinar: { $ifNull: [{ $arrayElemAt: ["$Webinar.Webinar", 0] }, 0] },
                    Workshop: { $ifNull: [{ $arrayElemAt: ["$Workshop.Workshop", 0] }, 0] },
                    Lomba: { $ifNull: [{ $arrayElemAt: ["$Lomba.Lomba", 0] }, 0] },
                    Lainnya: { $ifNull: [{ $arrayElemAt: ["$Lainnya.Lainnya", 0] }, 0] },
                },
            },
        ]);

        return res.render("dashboard-admin", {
            layout: "layouts/dashboardadmin-layout",
            css: "admin",
            title: "dashboard admin",
            jumlahMhs,
            jumlahOrm,
            jumlahEvent2,
            jmlWebinar: data[0].Webinar,
            jmlWorkshop: data[0].Workshop,
            jmlLomba: data[0].Lomba,
            jmlLainnya: data[0].Lainnya,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `test ${err}`,
        });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.aggregate([
            { $match: { isVerified: true } },
            {
                $lookup: {
                    from: "ormawas",
                    localField: "detil_eo",
                    foreignField: "id_ormawa",
                    as: "ormawa",
                },
            },
            {
                $addFields: {
                    detil_eo: { $arrayElemAt: ["$ormawa.nama_ormawa", 0] },
                },
            },
            { $sort: { _id: -1 } },
        ]);

        const events2 = await Event.aggregate([
            { $match: { isVerified: false } },
            {
                $lookup: {
                    from: "ormawas",
                    localField: "detil_eo",
                    foreignField: "id_ormawa",
                    as: "ormawa",
                },
            },
            {
                $addFields: {
                    detil_eo: { $arrayElemAt: ["$ormawa.nama_ormawa", 0] },
                },
            },
            { $sort: { _id: -1 } },
        ]);

        return res.render("event-admin", {
            layout: "layouts/eventAdmin-layout",
            css: "admin",
            title: "Event",
            events,
            events2,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `test ${err}`,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        await res.clearCookie("dataUser");
        return res.redirect("/login-admin");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.accEvent = async (req, res) => {
    try {
        /*

    const event = await Event.findOne({id_event:req.params.id_event});
		if(!event){
			return res.status(400).send({
				success:false,
				message: 'Event tidak ada' 
			});
		}*/
        const event = await Event.aggregate([
            { $match: { id_event: req.params.id_event } },
            {
                $lookup: {
                    from: "ormawas",
                    localField: "detil_eo",
                    foreignField: "id_ormawa",
                    as: "ormawa",
                },
            },
            { $unwind: "$ormawa" },
            {
                $addFields: {
                    detil_eo: "$ormawa.nama_ormawa",
                },
            },
            {
                $project: {
                    _id: 1,
                    id_event: "$id_event",
                    nama_event: "$nama_event",
                    detil_eo: "$detil_eo",
                    email: "$ormawa.email_ormawa",
                    id_ormawa: "$ormawa.id_ormawa",
                    tanggal_event: "$tanggal_event",
                    registered_people: "$registered_people",
                },
            },
        ]);

        await Event.updateOne(
            { id_event: event[0].id_event },
            {
                $set: {
                    isVerified: true,
                },
            }
        );
        const message = `
      
        <h1>Event Accepted!</h1>
        <p>Event ${event[0].nama_event} telah berhasil di acc!</p>

    `;
        await sendEmail(process.env.TEST_GMAIL, "Event Confirmation", message);

        return res.redirect("/event-admin");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getEventDetail = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.status(400).send({
                success: false,
                message: "Event tidak ada",
            });
        }
        return res.render("eventDetails-admin", {
            layout: "layouts/eventAdmin-layout",
            css: "admin",
            title: "Event Details",
            event,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getMahasiswa = async (req, res) => {
    try {
        const mahasiswas = await Mahasiswa.find({});
        return res.render("penggunaMahasiswa", {
            layout: "layouts/penggunaMahasiswa-layout",
            css: "admin",
            title: "Pengguna Mahasiswa",
            mahasiswas,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.deleteMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findOne({ email: req.params.email });
        if (!mahasiswa) {
            return res.send({
                message: "Mahasiswa tidak ada",
            });
        }

        await Mahasiswa.deleteOne({ email: mahasiswa.email });

        const test = await Event.updateMany({}, { $pull: { registered_people: { email: mahasiswa.email } } }, { multi: true });
        return res.redirect("/pengguna-mahasiswa");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getOrmawa = async (req, res) => {
    try {
        /*
    const ormawas = await Event.aggregate([
      // {$match: {'isVerified': true}},
       {
         $lookup: {
           from: 'ormawas',
           localField: 'detil_eo',
           foreignField: 'id_ormawa',
           as: 'ormawa'
         }
       },
       {   $unwind:"$ormawa" },
      {
       $addFields: {
         "detil_eo": "$ormawa.nama_ormawa",
       }
      },
      {
        $group: {
            _id: '$detil_eo',
            detail:{$first:"$$ROOT"},
            count: { $sum: 1 },
            
        }
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ count: '$count' }, '$detail'] },
        },
      },
      {   
        $project:{
            _id : 1,
            detil_eo : "$detil_eo",
            count : "$count",
            email: "$ormawa.email_ormawa",
            id_ormawa: "$ormawa.id_ormawa"
        } 
    }
     ]);
     */
        const ormawas = await Ormawa.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "id_ormawa",
                    foreignField: "detil_eo",
                    as: "event",
                },
            },
            {
                $addFields: { event: { $size: "$event" } },
            },
        ]);
        console.log(ormawas[0].id_ormawa);
        return res.render("penggunaOrmawa", {
            layout: "layouts/penggunaMahasiswa-layout",
            css: "admin",
            title: "Pengguna Mahasiswa",
            ormawas,
        });
        
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.deleteOrmawa = async (req, res) => {
    try {
      console.log(req.params.id_ormawa);
        const ormawa = await Ormawa.findOne({ id_ormawa: req.params.id_ormawa });
        console.log('yg dihapus:',ormawa)
        if (!ormawa) {
            return res.send({
                message: "Ormawa tidak ada",
            });
        }

        await Ormawa.deleteOne({ id_ormawa: ormawa.id_ormawa });
        const events = await Event.find({ detil_eo: ormawa.id_ormawa });
        const id_event = events.map((el) => el.id_event);

        await Event.deleteMany({ detil_eo: ormawa.id_ormawa });
        await Mahasiswa.updateMany({}, { $pull: { historyEvent: { id_event: { $in: id_event } } } }, { multi: true });
        return res.redirect("/pengguna-ormawa");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.landingPage = async (req, res) => {
    try {
        const landing = await LandingPage.findOne({ id: 1 });

        return res.render("lpManagemenet-admin", {
            layout: "layouts/eventAdmin-layout",
            css: "admin",
            title: "Landing Page Management",
            landing,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.editLandingPage = async (req, res) => {
    try {
        const landing = await LandingPage.findOne({ id: 1 });
        await LandingPage.updateOne(
            { id: 1 },
            {
                $set: {
                    judul: req.body.judul,
                    deskripsi_lp: req.body.deskripsi_lp,
                },
            }
        );
        return res.redirect("/lp-management");
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.postLandingPage = async (req, res) => {
    try {
        await new LandingPage({
            id: 1,
            judul: req.body.judul,
            deskripsi_lp: req.body.deskripsi_lp,
        }).save();
        return res.status(400).send({
            success: true,
            message: "Berhasil save landing page",
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: `${err}`,
        });
    }
};
