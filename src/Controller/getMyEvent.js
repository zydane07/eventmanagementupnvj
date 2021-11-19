const Event = require('../Models/event');

const getMyEvent = async (req,res) => {
  try {
    const events = await Event.find({}).select('id_event nama_event tanggal_event poster_event -_id');{
    // const homePage = await HomePage.find();{
      return res.status(200).send({
        success : true,
        message : 'Berhasil load MyEvent',
        data : {
            events
        }
      })
    }
  }
  catch (err){
    return res.send({
      success : false,
      message : 'Gagal load My Event'
    });
  }
}

module.exports = getMyEvent;