const Event = require('../Models/event');

const getHomePage = async (req,res) => {
  try {
    const events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id');{
      return res.status(200).send({
        success : true,
        message : 'Berhasil load HomePage',
        data : {
            events
        }
      })
    }
  }
  catch (err){
    return res.send({
      success : false,
      message : 'Gagal load HomePage'
    });
  }
}

module.exports = getHomePage;