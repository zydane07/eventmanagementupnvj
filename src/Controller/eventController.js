const Event = require('../Models/event');
const Mahasiswa = require('../Models/mahasiswa');
const Ormawa = require('../Models/ormawa');
const LandingPage = require('../Models/landingPage');
const Prasyarat = require('../Models/prasyarat');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
exports.getEvents = async(req,res)=>{
  try {
    const events = await Event.find({isVerified: true}).sort([['_id',-1]]).limit(9);
		const newestEvents = await Event.find({isVerified: true}).sort({'_id':-1}).limit(3);
    // const homePage = await HomePage.find();{
      /*return res.status(200).send({
        success : true,
        message : 'Berhasil get all events',
        data : {
            events
        }
      })*/
        // return res.json(homePage)
        const landing = await LandingPage.findOne({ id: 1 });
        res.render("index", {
            nama: req.user.nama,
            photo: req.user.photo,
            layout: "layouts/main-layout",
            title: "Home",
            css: "styleHome",
            events,
            newestEvents,
            landing,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: "Gagal load all events",
        });
    }
};

exports.getEventsDetails = async (req, res) => {
    try {
        // const event = await Event.findOne({}).select('id_event nama_event tanggal_event detail_eo poster_event kategori deskripsi_event benefits register_people -_id');{
        const event = await Event.findOne({ id_event: req.params.id_event });
        const namaEo = await Ormawa.findOne({ id_ormawa: event.detil_eo });

        const data = {
            id_event: event.id_event,
            nama_event: event.nama_event,
            tanggal_event: event.tanggal_event,
            id_eo: event.detil_eo,
            detil_eo: namaEo.nama_ormawa,
            poster_event: event.poster_event,
            kategori: event.kategori,
            deskripsi_event: event.deskripsi_event,
            benefits: event.benefits,
            registered_people: event.registered_people,
            photo: event.photo,
            photoOrmawa: namaEo.photo,
        };
        let tombol = undefined;
        let tombol2 = undefined;
        const check = await Mahasiswa.findOne({ email: req.user.email, "historyEvent.id_event": event.id_event });
        const checkSaved = await Mahasiswa.findOne({ email: req.user.email, "savedEvent.id_event": event.id_event });
        if (check) {
            tombol = "ada";
        }
        if (checkSaved) {
            tombol2 = "ada";
        }
        return res.render("eventdetail", {
            nama: req.user.nama,
            photo: req.user.photo,
            layout: "layouts/main-layout",
            title: "Detail Event",
            css: "styleDetail",
            data,
            tombol,
            tombol2,
        });
        /*
		return res.status(200).send({
			success : true,
			message : 'Detail event',
			data : {
				event:{
					id_event : event.id_event,
					nama_event : event.nama_event,
					tanggal_event : event.tanggal_event,
					detail_eo : event.detail_eo,
					poster_event : event.poster_event,
					kategori : event.kategori,
					deskripsi_event : event.deskripsi_event,
					benefits : event.benefits,
					registered_people : event.registered_people,
				}
			}
		})*/
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.daftarEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.status(400).send({
                success: false,
                message: "Event tidak ada",
            });
        }
        const user = await Mahasiswa.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User tidak valid",
            });
        }
        const regisEvent = {
            id_event: event.id_event,
        };
        await Mahasiswa.findOneAndUpdate(
            {
                email: user.email,
            },
            {
                $push: { historyEvent: regisEvent },
            },
            { new: true, upsert: true }
        ).exec();

        const registered = {
            email: user.email,
        };
        await Event.findOneAndUpdate(
            {
                id_event: event.id_event,
            },
            {
                $push: { registered_people: registered },
            },
            { new: true, upsert: true }
        ).exec();

        return res.redirect(`/detail/${req.params.id_event}`);
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.wishlistEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.status(400).send({
                success: false,
                message: "Event tidak ada",
            });
        }
        const user = await Mahasiswa.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User tidak valid",
            });
        }
        const saveEvent = {
            id_event: event.id_event,
        };
        await Mahasiswa.findOneAndUpdate(
            {
                email: user.email,
            },
            {
                $push: { savedEvent: saveEvent },
            },
            { new: true, upsert: true }
        ).exec();

        return res.redirect(`/detail/${req.params.id_event}`);
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.wishlistDeleteEvent = async(req,res) =>{
	try{
		const event = await Event.findOne({id_event:req.params.id_event});
		if(!event){
			return res.status(400).send({
				success:false,
				message: 'Event tidak ada' 
			});
		}
		const user = await Mahasiswa.findOne({email: req.user.email});
		if(!user){
			return res.status(400).send({
				success:false,
				message: 'User tidak valid' 
			});
		}
		const saveEvent = {
				id_event: event.id_event,
		}
		await Mahasiswa.findOneAndUpdate({
			email: user.email
		},{
			$pull: {savedEvent:saveEvent}
		},{ new: true, upsert: true }).exec();
        return res.redirect(`/detail/${req.params.id_event}`);
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getEventsSearch = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const event = req.query.event;
        let category = req.query.category;
        const limit = 9;
        let eventsSum, events;
        /*
		if(!event){
			eventsSum = await Event.find({});
			events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(limit*1).skip((page-1)*limit);
		}
		else{
			eventsSum = await Event.find({"nama_event":{$regex: new RegExp('^'+event+'.*','i')}});
    	events = await Event.find({"nama_event":{$regex: new RegExp('^'+event+'.*','i')}}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(limit*1).skip((page-1)*limit);		
		}*/
        if (event || category) {
            if (category === "Kategori") {
                category = ["Webinar", "Workshop", "Lomba", "Lainnya"];
            }
            const _query = {
                isVerified: true,
                kategori: {
                    $in: category,
                },
                $and: [
                    {
                        nama_event: {
                            $regex: new RegExp(".*" + event + ".*"),
                            $options: "i",
                        },
                    },
                    {
                        kategori: category,
                    },
                ],
            };
            eventsSum = await Event.find(_query);
            events = await Event.find(_query)
                .sort([["_id", -1]])
                .limit(limit * 1)
                .skip((page - 1) * limit);
        } else {
            eventsSum = await Event.find({ isVerified: true });
            events = await Event.find({ isVerified: true })
                .sort([["_id", -1]])
                .limit(limit * 1)
                .skip((page - 1) * limit);
        }

        const sumPage = Math.ceil(eventsSum.length / limit);
        return res.render("search", {
            nama: req.user.nama,
            photo: req.user.photo,
            layout: "layouts/main-layout",
            title: "search",
            css: "styleHome",
            events,
            sumPage,
            searchQuery: event,
            categoryQuery: req.query.category,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};


exports.getEventsOrmawa = async (req, res) => {
    try {
        const { id_ormawa } = req.params;
        const events = await Event.find({ detil_eo: id_ormawa })
            .sort([["_id", -1]])
            .limit(9);
        const dataEo = await Ormawa.findOne({ id_ormawa });
        // const homePage = await HomePage.find();{
        /*return res.status(200).send({
        success : true,
        message : 'Berhasil get all events',
        data : {
            events
        }
      })*/
      // return res.json(homePage)
			
			res.render('eventlist', {
				nama: req.user.nama,
				photo: req.user.photo,
				layout: 'layouts/main-layout',
   	 		title: 'Event List',
    		css: 'styleDetail',
				events,
				dataEo
			});
    
  }
  catch (err){
    return res.send({
      success : false,
      message : 'Gagal load all events'
    });
  }
}

exports.getEventsOrmawaDashboard = async (req, res) => {
    try {
        const dataEo = await Ormawa.findOne({ nama_ormawa: req.user.nama });
        if (!dataEo) {
            return res.send({
                message: "tidak ada event",
            });
        }
        const events = await Event.find({ detil_eo: dataEo.id_ormawa })
            .sort([["_id", -1]])
            .limit(4);
        // const homePage = await HomePage.find();{
        /*return res.status(200).send({
        success : true,
        message : 'Berhasil get all events',
        data : {
            events
        }
      })*/
        // return res.json(homePage)
        const data = await Event.aggregate([
            /*
				{ $match: { detil_eo:dataEo.id_ormawa } },
				{
          $unwind: {
            path: '$registered_people',
          }
        },
        {
          $group: {
            _id: '$kategori', // This is the selector for the grouping process (in our case it's the id)
            item: { $first: '$$ROOT.kategori' }, // this is me thinking you'll want access to the item in question for each total.
            totalCount: { $sum: 1 }, // adds to totalCount EACH $products.count that we have // self explanatory
          }
        }
				*/
            {
                $unwind: {
                    path: "$registered_people",
                },
            },
            {
                $facet: {
                    Webinar: [
                        // Filter by id meet and status present
                        { $match: { detil_eo: dataEo.id_ormawa, kategori: "Webinar" } },
                        { $count: "Webinar" },
                    ],
                    Workshop: [
                        // Filter by id meet and status absent
                        { $match: { detil_eo: dataEo.id_ormawa, kategori: "Workshop" } },
                        { $count: "Workshop" },
                    ],
                    Lomba: [
                        // Filter by id meet and status permission
                        { $match: { detil_eo: dataEo.id_ormawa, kategori: "Lomba" } },
                        { $count: "Lomba" },
                    ],
                    Lainnya: [
                        // Filter by id meet and status permission
                        { $match: { detil_eo: dataEo.id_ormawa, kategori: "Lainnya" } },
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

        res.render("dashboard-ormawa", {
            layout: "layouts/dashboardOrmawa-layout",
            css: "dashboard",
            title: "dashboard ormawa",
            nama: req.user.nama,
            events,
            jmlWebinar: data[0].Webinar,
            jmlWorkshop: data[0].Workshop,
            jmlLomba: data[0].Lomba,
            jmlLainnya: data[0].Lainnya,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getEventSayaOrmawa = async (req, res) => {
    try {
        const dataEo = await Ormawa.findOne({ nama_ormawa: req.user.nama });

        if (!dataEo) {
            return res.send({
                message: "tidak ada event",
            });
        }
        const events = await Event.find({ detil_eo: dataEo.id_ormawa })
            .sort([["_id", -1]])
            .limit(9);
        const dateNow = new Date();

        res.render("event-ormawa", {
            layout: "layouts/dashboardOrmawa-layout",
            css: "dashboard",
            title: "event saya",
            nama: req.user.nama,
            events,
            dateNow,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.getEventEdit = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.send({
                message: "event tidak ditemukan",
            });
        }
        res.render("editevent-ormawa", {
            layout: "layouts/eventOrmawa-layout",
            css: "dashboard",
            title: "Edit Event",
            nama: req.user.nama,
            event,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};

exports.editEvent = async (req, res) => {
    try {
        console.log(req.file.path);
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.send({
                message: "id event tidak valid, coba lagi",
            });
        }
        if (event.photo.cloudinary_id !== "ifpbpwuf5yrtlgbexgf1") {
            await cloudinary.uploader.destroy(event.photo.cloudinary_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        await Event.updateOne(
            { id_event: event.id_event },
            {
                $set: {
                    nama_event: req.body.nama_event,
                    deskripsi_event: req.body.deskripsi_event,
                    benefits: req.body.benefits,
                    prodi: req.body.prodi,
                    tanggal_event: req.body.tanggal_event,
                    kategori: req.body.kategori,
                    "photo.avatar": result.secure_url,
                    "photo.cloudinary_id": result.public_id,
                },
            }
        );
        return res.redirect("/event-ormawa");
    } catch (err) {
        return res.send({
            message: `${err}`,
        });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });
        if (!event) {
            return res.send({
                message: "id event tidak valid, coba lagi",
            });
        }
        await Event.deleteOne({ id_event: event.id_event });

        await Mahasiswa.updateMany({}, { $pull: { historyEvent: { id_event: req.params.id_event } } }, { multi: true });
        if (req.user.role === "ormawa") {
            return res.redirect("/event-ormawa");
        }
        return res.redirect("/event-admin");
    } catch (err) {
        return res.send({
            message: "Terjadi error saat delete event, coba lagi",
            err: `${err}`,
        });
    }
};

exports.eventDetailOrmawa = async (req, res) => {
    try {
        const event = await Event.findOne({ id_event: req.params.id_event });

        if (!event) {
            return res.send({
                message: "tidak ada event",
            });
        }
        //const peserta = event.registered_people.map(el => el.email);
        /*
		const peserta2 = event.registered_people.map(el => el.createdAt);
		
		const pendaftar = await Mahasiswa.find({
			email: {$in: peserta}
		});
		
		const pendaftar2 = await Mahasiswa.find({
			//	email: {$in: peserta},
			historyEvent: {$elemMatch: {id_event: 'lswjq3k'}}
				//"historyEvent.id_event": req.params.id_event
			
		
		});*/
        const pendaftar = await Mahasiswa.aggregate([{ $unwind: "$historyEvent" }, { $match: { "historyEvent.id_event": req.params.id_event } }]);
        res.render("detailEvent-ormawa", {
            layout: "layouts/EventOrmawa-layout",
            css: "dashboard",
            title: "Detail Event",
            nama: req.user.nama,
            event,
            pendaftar,
        });
    } catch (err) {
        return res.send({
            success: false,
            message: `${err}`,
        });
    }
};
