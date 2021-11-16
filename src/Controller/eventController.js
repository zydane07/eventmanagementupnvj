const Event = require('../Models/event');
const Mahasiswa = require('../Models/mahasiswa');
const Ormawa = require('../Models/ormawa');
exports.getEvents = async(req,res)=>{
  try {
    const events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(9);
		const newestEvents = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort({'_id':-1}).limit(3);
    // const homePage = await HomePage.find();{
      /*return res.status(200).send({
        success : true,
        message : 'Berhasil get all events',
        data : {
            events
        }
      })*/
      // return res.json(homePage)
			
			res.render('index', {
				nama: req.user.nama,
				layout: 'layouts/main-layout',
				title: 'Home',
				css: 'styleHome',
				events,
				newestEvents
			});
    
  }
  catch (err){
    return res.send({
      success : false,
      message : 'Gagal load all events'
    });
  }
}

exports.getEventsDetails = async(req,res)=>{
  try{
		// const event = await Event.findOne({}).select('id_event nama_event tanggal_event detail_eo poster_event kategori deskripsi_event benefits register_people -_id');{
		const event = await Event.findOne({id_event:req.params.id_event});
		const namaEo = await Ormawa.findOne({id_ormawa:event.detil_eo});
		
		const data = {
			id_event : event.id_event,
			nama_event : event.nama_event,
			tanggal_event : event.tanggal_event,
			id_eo: event.detil_eo,
			detil_eo : namaEo.nama_ormawa,
			poster_event : event.poster_event,
			kategori : event.kategori,
			deskripsi_event : event.deskripsi_event,
			benefits : event.benefits,
			registered_people : event.registered_people,
		}
		const check = await Mahasiswa.findOne({email:req.user.email, "historyEvent.id_event": event.id_event});
		if(!check){
			return res.render('eventdetail',{
				nama: req.user.nama,
				tombol: 'Daftar Event',
				layout: 'layouts/main-layout',
				title: 'Detail Event',
				css: 'styleDetail',
				data
			});
		}
		return res.render('eventdetail',{
			nama: req.user.nama,
			layout: 'layouts/main-layout',
			title: 'Detail Event',
			css: 'styleDetail',
			data
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
	}
	catch(err){
		return res.send({
			success : false,
			message : 'Gagal load Detail event'
		});
	}
}

exports.daftarEvent = async(req,res) =>{
	try{
		const event = await Event.findOne({id_event:req.params.id_event});
		if(!event){
			return res.status(400).send({
				success:false,
				message: 'Event tidak ada' 
			});
		}
		const user = await Mahasiswa.findOne({nama_lengkap: req.user.nama});
		if(!user){
			return res.status(400).send({
				success:false,
				message: 'User tidak valid' 
			});
		}
		const regisEvent = {
				id_event: event.id_event,
		}
		await Mahasiswa.findOneAndUpdate({
			email: user.email
		},{
			$push: {historyEvent:regisEvent}
		},{ new: true, upsert: true }).exec();

		const registered = {
			email: user.email
		};
		await Event.findOneAndUpdate({
			id_event: event.id_event
		},{
			$push: {registered_people:registered}
		},{ new: true, upsert: true }).exec();
		
		return res.redirect(`/detail/${req.params.id_event}`);
	}
	catch(err){
		return res.send({
			success:false,
			message:`${err}`,
		})
	}
}

exports.getEventsSearch = async(req,res)=>{
  try {
		const {page=1} = req.query;
		const event = req.query.event;
		let category = req.query.category;
		const limit=3;
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
		if(event || category){
			if(category==='Kategori'){
				category = ['Webinar','Workshop','Lomba','Lainnya'];
			}
			const _query = {
				kategori: {
						$in: category
				},
				'$and': [{
						"nama_event": {
								"$regex": new RegExp('^'+event+'.*'),
								"$options": "i"
						}
				}, {
						"kategori": category
				}]
		};
			eventsSum = await Event.find(_query);
			events = await Event.find(_query).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(limit*1).skip((page-1)*limit);
		}
		else{
			eventsSum = await Event.find({});
			events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(limit*1).skip((page-1)*limit);
		}

		const sumPage = Math.ceil(eventsSum.length/limit);
		return	res.render('search', {
			nama: req.user.nama,
			layout: 'layouts/main-layout',
			title: 'search',
			css: 'styleHome',
			events,
			sumPage,
			searchQuery: event,
			categoryQuery: req.query.category
		});
    
  }
  catch (err){
    return res.send({
      success : false,
      message : `${err}`
    });
  }
}

exports.getEventsOrmawa = async(req,res)=>{
  try {
		const {id_ormawa} = req.params;
    const events = await Event.find({detil_eo:id_ormawa}).select('id_event nama_event tanggal_event poster_event kategori -_id').sort([['_id',-1]]).limit(9);
		const dataEo = await Ormawa.findOne({id_ormawa});
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