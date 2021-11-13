const Event = require('../Models/event');

exports.getEvents = async(req,res)=>{
  try {
    const events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id');{
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
			});
    }
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
		})
	}
	catch(err){
		return res.send({
			success : false,
			message : 'Gagal load Detail event'
		});
	}
}